import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';



export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        vendorId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        vendorName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessNature: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        companyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        addressType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        primary: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerEmail: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address2: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        city: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        zipCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        fax: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeStatus: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            profileDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: profileDetails[key].validation,
        };

        setprofileDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        history.push("/customer");
    }
    const handleAddClick = (type) => {
        if (type === 'general') {
            setCustomerObj([...CustomerObj, { description: "", state: "", city: "" }])
        } else if (type === 'address') {
            setAddmoreObj([...AddmoreObj, { address: "", gst: "", state: "", city: "", country: "" }]);
        }
    };
    const handleRemoveClick = (type, index) => {
        if (type === 'general') {
            const list = [...CustomerObj];
            list.splice(index, 1);
            setCustomerObj(list);
        } else if (type === 'address') {
            const list = [...AddmoreObj];
            list.splice(index, 1);
            setAddmoreObj(list);
        }

    };

    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            showList.push(obj)
            setShowList((prevState) => ([
                ...prevState,
            ]));
        }
    }
    return (
        <div>
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Vendor Id"
                        changeData={(data) => Validation(data, "vendorId")}
                        value={profileDetails.vendorId.value}
                        error={profileDetails.vendorId.error}
                        errmsg={profileDetails.vendorId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={6} sx={12} sm={12}>
                        <Labelbox show type="select"
                            labelname="Primary Contact"
                            placeholder="Salutation"
                            changeData={(data) => Validation(data, "primary")}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} sx={12} sm={12}>
                        <LabelBoxes show type="text"
                            placeholder='First Name'
                            changeData={(data) => Validation(data, "primary")}

                        />
                    </Grid>
                    <Grid item xs={12} md={3} sx={12} sm={12}>
                        <LabelBoxes show type="text"
                            placeholder='Last Name'
                            changeData={(data) => Validation(data, "primary")}

                        />
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Vendor Name"
                        changeData={(data) => Validation(data, "vendorName")}
                        value={profileDetails.vendorName.value}
                        error={profileDetails.vendorName.error}
                        errmsg={profileDetails.vendorName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Business Nature"
                        changeData={(data) => Validation(data, "businessNature")}
                        value={profileDetails.businessNature.value}
                        error={profileDetails.businessNature.error}
                        errmsg={profileDetails.businessNature.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Customer Email"
                        changeData={(data) => Validation(data, "customerEmail")}
                        value={profileDetails.customerEmail.value}
                        error={profileDetails.customerEmail.error}
                        errmsg={profileDetails.customerEmail.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={8} sx={12} sm={12}>
                        <Labelbox show type="text"
                            labelname="Customer Phone"
                            placeholder="Work Phone"
                            changeData={(data) => Validation(data, "primary")}

                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={12} sm={12}>
                        <LabelBoxes show type="text"
                            placeholder='Mobile'
                            changeData={(data) => Validation(data, "primary")}

                        />
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Website"
                        changeData={(data) => Validation(data, "activeStatus")}
                      
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeStatus")}
                        value={profileDetails.activeStatus.value}
                        error={profileDetails.activeStatus.error}
                        errmsg={profileDetails.activeStatus.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add More Details' />
                </Grid>

                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={10} sx={12} sm={12}>
                            <Labelbox type={data.type}
                                labelname={data.labelName}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })}

            </Grid>
            <Grid item xs={12} md={10} sx={12} sm={12} direction="row" justifyContent={'flex-end'} container style={{ position: 'relative', bottom: '50px' }}>
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn />
            </Grid>
        </div>
    );
}