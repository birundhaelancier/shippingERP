/* eslint-disable no-undef */
import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AddCustomer, ViewCustomerDetails, EditCustomer, getCustomerList } from '../../../Redux/Action/GeneralGroupAction/customerAction';
import { getCustomerBusinessNatureList } from '../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';

export default function GeneralInfo(props) {
    const params = new URLSearchParams(props.location?.search);
    const { customerId, handleActivekey } = props;
    let dispatch = useDispatch();
    let history = useHistory()

    const ViewCustomer = useSelector((state) => state.CustomerReducer.ViewCustomerDetails);
    const ViewBusiness = useSelector((state) => state.CustomerBusinessReducer.GetCustomerBusinessList);
    const [FieldModal, setFieldModal] = useState(false);
    const [Refresh, setRefresh] = useState(false);
    const [businessNature, setbusinessNature] = useState([])
    const [generalDetails, setgeneralDetails] = useState({
        company_name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobile: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        primary_salute: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        primary_first_name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        primary_second_name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        designation: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }, { name: "email" }], error: null, errmsg: null,
        },
        website: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        business_nature: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        department: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        stype: {
            value: "General", validation: [], error: null, errmsg: null,
        },
        user_id: {
            value: JSON.parse(localStorage.getItem("user_id")), validation: [], error: null, errmsg: null,
        },
    })
    useEffect(() => {
        dispatch(ViewCustomerDetails(customerId))
        dispatch(getCustomerBusinessNatureList(1))
    }, [])

    const getSalutation = (data) => {
        switch (data) {
            case "Mr": return 1;
            case "Mrs": return 2;
            case "Ms": return 3;
            case "Miss": return 4;
            case "Dr": return 5;
            default: return '';
        }
    }

    useEffect(() => {
        if (ViewCustomer) {
            generalDetails.company_name.value = ViewCustomer[0]?.company_name
            generalDetails.mobile.value = ViewCustomer[0]?.mobile
            generalDetails.primary_salute.value = getSalutation(ViewCustomer[0]?.primary_salute)
            generalDetails.primary_first_name.value = ViewCustomer[0]?.primary_first_name
            generalDetails.primary_second_name.value = ViewCustomer[0]?.primary_second_name
            generalDetails.designation.value = ViewCustomer[0]?.designation
            generalDetails.department.value = ViewCustomer[0]?.department
            generalDetails.phone.value = ViewCustomer[0]?.phone
            generalDetails.email.value = ViewCustomer[0]?.email
            generalDetails.website.value = ViewCustomer[0]?.website
            generalDetails.business_nature.value = ViewCustomer[0]?.business_nature
        }
    }, [ViewCustomer])

    useEffect(() => {
        let customerLists = []
        ViewBusiness?.map((data) => {
            customerLists.push(
                { id: data.id, value: data.name }
            )
        })
        setbusinessNature(customerLists)

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
            if (customerId) {
                EditCustomer(generalDetails, customerId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('1', res?.Response?.id)
                            dispatch(getCustomerList("All"))
                        } else {
                            notification.success({
                                message: "Something Went Wrong"
                            });
                        }
                    })
            } else {
                AddCustomer(generalDetails)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            params.set('user_id', res?.Response?.id);
                            window.history.replaceState({}, "", decodeURIComponent(`${window.location.href}?${params}`));
                            handleActivekey('1', res?.Response?.id)
                            dispatch(getCustomerList("All"))
                        } else {
                            notification.success({
                                message: res?.Message
                            });
                        }
                    })
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["company_name", "mobile", "primary_salute", "primary_first_name", "primary_second_name", "designation", "department", "phone", "email", "website", "leadSource", "businessPresence", "business_nature"]
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
                    <Labelbox show type="select"
                        labelname='Salutation'
                        dropdown={[
                            { id: 1, value: 'Mr' },
                            { id: 2, value: 'Mrs' },
                            { id: 3, value: 'Ms' },
                            { id: 4, value: 'Miss' },
                            { id: 5, value: 'Dr' },
                        ]}
                        changeData={(data) => Validation(data, "primary_salute")}
                        value={generalDetails.primary_salute.value}
                        error={generalDetails.primary_salute.error}
                        errmsg={generalDetails.primary_salute.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='First Name'
                        changeData={(data) => Validation(data, "primary_first_name")}
                        value={generalDetails.primary_first_name.value}
                        error={generalDetails.primary_first_name.error}
                        errmsg={generalDetails.primary_first_name.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='Last Name'
                        changeData={(data) => Validation(data, "primary_second_name")}
                        value={generalDetails.primary_second_name.value}
                        error={generalDetails.primary_second_name.error}
                        errmsg={generalDetails.primary_second_name.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Company Name"
                        changeData={(data) => Validation(data, "company_name")}
                        value={generalDetails.company_name.value}
                        error={generalDetails.company_name.error}
                        errmsg={generalDetails.company_name.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Business Nature"
                        dropdown={businessNature}
                        changeData={(data) => Validation(data, "business_nature")}
                        value={generalDetails.business_nature.value}
                        error={generalDetails.business_nature.error}
                        errmsg={generalDetails.business_nature.errmsg}
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
                    <Labelbox show type="number"
                        labelname="Mobile"
                        showFlag
                        changeData={(data) => Validation(data, "mobile")}
                        value={generalDetails.mobile.value}
                        error={generalDetails.mobile.error}
                        errmsg={generalDetails.mobile.errmsg}
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
                    <Labelbox show type="text"
                        labelname="Website"
                        changeData={(data) => Validation(data, "website")}
                        value={generalDetails.website.value}
                        error={generalDetails.website.error}
                        errmsg={generalDetails.website.errmsg}
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
                <FooterBtn nextBtn saveBtn={"Save Stage"} onSaveBtn={onSubmit} onCancel={HandleCancel} onNext={() => handleActivekey('1')} nextDisable={ViewCustomer && ViewCustomer.length > 0 ? false : true} />
            </Grid>
        </div>
    );
}