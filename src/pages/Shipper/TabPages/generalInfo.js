import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AddShipper, ViewShipperDetails, EditShipper, getShipperList } from '../../../Redux/Action/GeneralGroupAction/shipperAction';
import { getCustomerBusinessNatureList } from '../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';


export default function GeneralInfo({ shipperId, handleActivekey }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const ViewShipper = useSelector((state) => state.ShipperReducer.ViewShipperDetails);
    const ViewBusiness = useSelector((state) => state.CustomerBusinessReducer.GetCustomerBusinessList);
    const [FieldModal, setFieldModal] = useState(false);
    const [Refresh, setRefresh] = useState(false);
    const [businessNature, setbusinessNature] = useState([])

    const [generalDetails, setgeneralDetails] = useState({
        companyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        exporter: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        salutation: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        fname: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        lname: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        designation: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        website: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessNature: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        department: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        shipperId: {
            value: "", validation: [], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewShipperDetails(shipperId))
        dispatch(getCustomerBusinessNatureList(1))
    }, [])


    useEffect(() => {
        console.log(ViewShipper, 'ViewShipper');
        if (ViewShipper) {
            generalDetails.companyName.value = ViewShipper[0]?.company_name
            generalDetails.exporter.value = ViewShipper[0]?.exporter
            generalDetails.salutation.value = ViewShipper[0]?.primary_salute === "Male" ? 1 : 2
            generalDetails.fname.value = ViewShipper[0]?.primary_first_name
            generalDetails.lname.value = ViewShipper[0]?.primary_second_name
            generalDetails.designation.value = ViewShipper[0]?.designation
            generalDetails.department.value = ViewShipper[0]?.department
            generalDetails.phone.value = ViewShipper[0]?.phone
            generalDetails.email.value = ViewShipper[0]?.email
            generalDetails.website.value = ViewShipper[0]?.website
            generalDetails.businessNature.value = ViewShipper[0]?.business_nature
        }
    }, [ViewShipper])

    useEffect(() => {
        let countryLists = []
        ViewBusiness?.map((data) => {
            countryLists.push(
                { id: data.id, value: data.name }
            )
        })
        setbusinessNature(countryLists)

    }, [ViewBusiness])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            generalDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: generalDetails[key].validation,
        };

        setgeneralDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    const onSubmit = () => {
        console.log(generalDetails, 'generalDetails')
        var mainvalue = {};
        var targetkeys = Object.keys(generalDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                generalDetails[targetkeys[i]].value,
                generalDetails[targetkeys[i]].validation
            );
            generalDetails[targetkeys[i]].error = !errorcheck.state;
            generalDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = generalDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => generalDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (shipperId) {
                dispatch(EditShipper(generalDetails, shipperId))
                handleActivekey('1')
            } else {
                AddShipper(generalDetails)
                    .then((res) => {
                        notification.success({
                            message: "Added Successfully"
                        });
                        console.log(res, 'res.id')
                        handleActivekey('1', res.id)
                        dispatch(getShipperList("All"))
                        // HandleCancel()
                        // }
                    })
                // history.push('/Shipper');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["companyName", "exporter", "salutation", "fname", "lname", "designation", "department", "phone", "email", "website", "businessNature"]
        SalesKey.map((data) => {
            generalDetails[data].value = ""
        })
        setgeneralDetails(prevState => ({
            ...prevState,
        }));
    }

    return (
        <div>
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Company Name"
                        changeData={(data) => Validation(data, "companyName")}
                        value={generalDetails.companyName.value}
                        error={generalDetails.companyName.error}
                        errmsg={generalDetails.companyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Exporter"
                        changeData={(data) => Validation(data, "exporter")}
                        value={generalDetails.exporter.value}
                        error={generalDetails.exporter.error}
                        errmsg={generalDetails.exporter.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname='Salutation'
                        dropdown={[
                            { id: 1, value: 'Male' },
                            { id: 2, value: 'Female' }
                        ]}
                        changeData={(data) => Validation(data, "salutation")}
                        value={generalDetails.salutation.value}
                        error={generalDetails.salutation.error}
                        errmsg={generalDetails.salutation.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='First Name'
                        changeData={(data) => Validation(data, "fname")}
                        value={generalDetails.fname.value}
                        error={generalDetails.fname.error}
                        errmsg={generalDetails.fname.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='Last Name'
                        changeData={(data) => Validation(data, "lname")}
                        value={generalDetails.lname.value}
                        error={generalDetails.lname.error}
                        errmsg={generalDetails.lname.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Designation"
                        changeData={(data) => Validation(data, "designation")}
                        value={generalDetails.designation.value}
                        error={generalDetails.designation.error}
                        errmsg={generalDetails.designation.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Department"
                        changeData={(data) => Validation(data, "department")}
                        value={generalDetails.department.value}
                        error={generalDetails.department.error}
                        errmsg={generalDetails.department.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        showFlag
                        changeData={(data) => Validation(data, "phone")}
                        value={generalDetails.phone.value}
                        error={generalDetails.phone.error}
                        errmsg={generalDetails.phone.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        changeData={(data) => Validation(data, "email")}
                        value={generalDetails.email.value}
                        error={generalDetails.email.error}
                        errmsg={generalDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Website"
                        changeData={(data) => Validation(data, "website")}
                        value={generalDetails.website.value}
                        error={generalDetails.website.error}
                        errmsg={generalDetails.website.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Business Nature"
                        dropdown={businessNature}
                        changeData={(data) => Validation(data, "businessNature")}
                        value={generalDetails.businessNature.value}
                        error={generalDetails.businessNature.error}
                        errmsg={generalDetails.businessNature.errmsg}
                    />
                </Grid>
            </Grid>

            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} onSaveBtn={onSubmit} onCancel={HandleCancel} onNext={() => handleActivekey('1')} />
            </Grid>
        </div>
    );
}