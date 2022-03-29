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

export default function KycDeatils() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ gstState: "", gst: "" }]);
    let history = useHistory()
    const [profileDetails, setprofileDetails] = useState({
        pan: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cin: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        msme: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        iec: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        addressType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst: {
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
        setCustomerObj([...CustomerObj, { gstState: "", gst: "" }])
    };
    const handleRemoveClick = (type, index) => {

        const list = [...CustomerObj];
        list.splice(index, 1);
    };

    return (
        <div>
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="PAN Number"
                            changeData={(data) => Validation(data, "pan")}
                            value={profileDetails.pan.value}
                            error={profileDetails.pan.error}
                            errmsg={profileDetails.pan.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={1} sx={12} sm={12}>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <UploadFiles show />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="CIN Registration"
                            changeData={(data) => Validation(data, "cin")}
                            value={profileDetails.cin.value}
                            error={profileDetails.cin.error}
                            errmsg={profileDetails.cin.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={1} sx={12} sm={12}>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <UploadFiles show />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="MSME Registration"
                            changeData={(data) => Validation(data, "msme")}
                            value={profileDetails.msme.value}
                            error={profileDetails.msme.error}
                            errmsg={profileDetails.msme.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={1} sx={12} sm={12}>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <UploadFiles show />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="IEC Number"
                            changeData={(data) => Validation(data, "iec")}
                            value={profileDetails.iec.value}
                            error={profileDetails.iec.error}
                            errmsg={profileDetails.iec.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={1} sx={12} sm={12}>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <UploadFiles show />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="select"
                            labelname="GST State"
                            changeData={(data) => Validation(data, "state")}
                            value={profileDetails.state.value}
                            error={profileDetails.state.error}
                            errmsg={profileDetails.state.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={1} sx={12} sm={12}>

                    </Grid>
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={11} sx={12} sm={12}>
                        <Labelbox show type="text"
                            labelname="GST Registration"
                            changeData={(data) => Validation(data, "state")}
                            value={profileDetails.state.value}
                            error={profileDetails.state.error}
                            errmsg={profileDetails.state.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={0.6} sx={12} sm={12}>
                        <UploadFiles show />
                    </Grid>
                    <Grid item xs={12} md={0.4} sx={12} sm={12}>
                        <AddFieldsBtn fieldName='Add Another GST' marginView AddFieldBtn={handleAddClick} />
                    </Grid>
                </Grid>


                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Additional Field' />
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