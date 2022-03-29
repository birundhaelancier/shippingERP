import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../../components/ContentHeader';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../../components/CustomTab';
import ViewCustomer from '../viewcustomer';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';

export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [profileDetails, setprofileDetails] = useState({
        customerId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerName: {
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
    })


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

    return (
        <div>
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Customer Id"
                        changeData={(data) => Validation(data, "customerId")}
                        value={profileDetails.customerId.value}
                        error={profileDetails.customerId.error}
                        errmsg={profileDetails.customerId.errmsg}
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
                        labelname="Customer Name"
                        changeData={(data) => Validation(data, "customerName")}
                        value={profileDetails.customerName.value}
                        error={profileDetails.customerName.error}
                        errmsg={profileDetails.customerName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
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
                        changeData={(data) => Validation(data, "zipCode")}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add More Details' />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Designation"
                        changeData={(data) => Validation(data, "zipCode")}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Department"
                        changeData={(data) => Validation(data, "zipCode")}
                    />
                </Grid>

                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11.6} sx={12} sm={12}>
                        <Labelbox show type="text"
                            labelname="Skype Id"
                            changeData={(data) => Validation(data, "zipCode")}
                        />
                    </Grid>
                    <Grid item xs={12} md={0.4} sx={12} sm={12}>
                        <AddFieldsBtn fieldName='Add Additional Field' marginView />
                    </Grid>
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" onBtnClick={() => onSubmit()} />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid>
        </div>
    );
}