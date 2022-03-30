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
import FooterBtn from '../../../components/FooterButtons';


export default function AddressInfo() {
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
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address1: {
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
                    <Labelbox show type="select"
                        labelname="Address Type"
                        changeData={(data) => Validation(data, "addressType")}
                        value={profileDetails.addressType.value}
                        error={profileDetails.addressType.error}
                        errmsg={profileDetails.addressType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country /Region"
                        changeData={(data) => Validation(data, "country")}
                        value={profileDetails.country.value}
                        error={profileDetails.country.error}
                        errmsg={profileDetails.country.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Address"
                        placeholder="Street1"
                        changeData={(data) => Validation(data, "address1")}
                        value={profileDetails.address1.value}
                        error={profileDetails.address1.error}
                        errmsg={profileDetails.address1.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        placeholder="Street2"
                        changeData={(data) => Validation(data, "address2")}
                        value={profileDetails.address2.value}
                        error={profileDetails.address2.error}
                        errmsg={profileDetails.address2.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="State"
                        placeholder="Select or Type to add"
                        changeData={(data) => Validation(data, "state")}
                        value={profileDetails.state.value}
                        error={profileDetails.state.error}
                        errmsg={profileDetails.state.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="City"
                        changeData={(data) => Validation(data, "city")}
                        value={profileDetails.city.value}
                        error={profileDetails.city.error}
                        errmsg={profileDetails.city.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Zip Code"
                        changeData={(data) => Validation(data, "zipCode")}
                        value={profileDetails.zipCode.value}
                        error={profileDetails.zipCode.error}
                        errmsg={profileDetails.zipCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        changeData={(data) => Validation(data, "phone")}
                        value={profileDetails.phone.value}
                        error={profileDetails.phone.error}
                        errmsg={profileDetails.phone.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Fax"
                        changeData={(data) => Validation(data, "fax")}
                        value={profileDetails.fax.value}
                        error={profileDetails.fax.error}
                        errmsg={profileDetails.fax.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Address' />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Additional Field' />
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn />
            </Grid>
        </div>
    );
}