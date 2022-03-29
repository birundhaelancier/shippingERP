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

export default function ContactPerson() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [profileDetails, setprofileDetails] = useState({

        salutation: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        firstName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        lastName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobile: {
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
                    <Labelbox show type="select"
                        labelname="Salutation"
                        changeData={(data) => Validation(data, "salutation")}
                        value={profileDetails.salutation.value}
                        error={profileDetails.salutation.error}
                        errmsg={profileDetails.salutation.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="First Name"
                        changeData={(data) => Validation(data, "firstName")}
                        value={profileDetails.firstName.value}
                        error={profileDetails.firstName.error}
                        errmsg={profileDetails.firstName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Last Name"
                        changeData={(data) => Validation(data, "lastName")}
                        value={profileDetails.lastName.value}
                        error={profileDetails.lastName.error}
                        errmsg={profileDetails.lastName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email Address"
                        changeData={(data) => Validation(data, "email")}
                        value={profileDetails.email.value}
                        error={profileDetails.email.error}
                        errmsg={profileDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Work Phone"
                        changeData={(data) => Validation(data, "phone")}
                        value={profileDetails.phone.value}
                        error={profileDetails.phone.error}
                        errmsg={profileDetails.phone.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Mobile"
                        changeData={(data) => Validation(data, "mobile")}
                        value={profileDetails.mobile.value}
                        error={profileDetails.mobile.error}
                        errmsg={profileDetails.mobile.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Contact Person' />
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