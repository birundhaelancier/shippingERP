import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function VendorDetails() {
    const [vendorInfo, setvendorInfo] = useState({
        vendorId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        vendorName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        vendorType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        companyName: {
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
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        pan: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cin: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        msme: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        contactPerson: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phoneNo: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobileNo: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        iec: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            vendorInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: vendorInfo[key].validation,
        };

        setvendorInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Vendor" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Vendor Id"
                        changeData={(data) => Validation(data, "vendorId")}
                        value={vendorInfo.vendorId.value}
                        error={vendorInfo.vendorId.error}
                        errmsg={vendorInfo.vendorId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Vendor Name"
                        changeData={(data) => Validation(data, "vendorName")}
                        value={vendorInfo.vendorName.value}
                        error={vendorInfo.vendorName.error}
                        errmsg={vendorInfo.vendorName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Vendor Type"
                        changeData={(data) => Validation(data, "vendorType")}
                        value={vendorInfo.vendorType.value}
                        error={vendorInfo.vendorType.error}
                        errmsg={vendorInfo.vendorType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Company Name"
                        changeData={(data) => Validation(data, "companyName")}
                        value={vendorInfo.companyName.value}
                        error={vendorInfo.companyName.error}
                        errmsg={vendorInfo.companyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Address1"
                        changeData={(data) => Validation(data, "address1")}
                        value={vendorInfo.address1.value}
                        error={vendorInfo.address1.error}
                        errmsg={vendorInfo.address1.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Address2"
                        changeData={(data) => Validation(data, "address2")}
                        value={vendorInfo.address2.value}
                        error={vendorInfo.address2.error}
                        errmsg={vendorInfo.address2.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="State"
                        changeData={(data) => Validation(data, "state")}
                        value={vendorInfo.state.value}
                        error={vendorInfo.state.error}
                        errmsg={vendorInfo.state.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="City"
                        changeData={(data) => Validation(data, "city")}
                        value={vendorInfo.city.value}
                        error={vendorInfo.city.error}
                        errmsg={vendorInfo.city.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country"
                        changeData={(data) => Validation(data, "country")}
                        value={vendorInfo.country.value}
                        error={vendorInfo.country.error}
                        errmsg={vendorInfo.country.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="PAN"
                        changeData={(data) => Validation(data, "pan")}
                        value={vendorInfo.pan.value}
                        error={vendorInfo.pan.error}
                        errmsg={vendorInfo.pan.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="GST"
                        changeData={(data) => Validation(data, "gst")}
                        value={vendorInfo.gst.value}
                        error={vendorInfo.gst.error}
                        errmsg={vendorInfo.gst.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="CIN"
                        changeData={(data) => Validation(data, "cin")}
                        value={vendorInfo.cin.value}
                        error={vendorInfo.cin.error}
                        errmsg={vendorInfo.cin.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="MSME"
                        changeData={(data) => Validation(data, "msme")}
                        value={vendorInfo.msme.value}
                        error={vendorInfo.msme.error}
                        errmsg={vendorInfo.msme.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Contact Person"
                        changeData={(data) => Validation(data, "contactPerson")}
                        value={vendorInfo.contactPerson.value}
                        error={vendorInfo.contactPerson.error}
                        errmsg={vendorInfo.contactPerson.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone No"
                        changeData={(data) => Validation(data, "phoneNo")}
                        value={vendorInfo.phoneNo.value}
                        error={vendorInfo.phoneNo.error}
                        errmsg={vendorInfo.phoneNo.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Mobile No"
                        changeData={(data) => Validation(data, "mobileNo")}
                        value={vendorInfo.mobileNo.value}
                        error={vendorInfo.mobileNo.error}
                        errmsg={vendorInfo.mobileNo.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="E-Mail"
                        changeData={(data) => Validation(data, "email")}
                        value={vendorInfo.email.value}
                        error={vendorInfo.email.error}
                        errmsg={vendorInfo.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="IEC"
                        changeData={(data) => Validation(data, "iec")}
                        value={vendorInfo.iec.value}
                        error={vendorInfo.iec.error}
                        errmsg={vendorInfo.iec.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={vendorInfo.activeSts.value}
                        error={vendorInfo.activeSts.error}
                        errmsg={vendorInfo.activeSts.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>               
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid>
        </div>
    );
}