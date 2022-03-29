import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../components/Upload';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import ViewCustomer from './viewcustomer';
import GeneralInfo from './TabPages/generalInfo';


// import './customer.css';

export default function AddCustomer() {
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
        description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    // arrayval
    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo /> },
        { icon: <CheckCircle />, title: 'Address Details', description: 'de65' },
        { icon: <CheckCircle />, title: 'KYC Details', description: 'de65' },
        { icon: <CheckCircle />, title: 'Contact Details', description: 'de65' },
        { icon: <CheckCircle />, title: 'Documents', description: 'de65' },
        { icon: <CheckCircle />, title: 'Payments Terms', description: 'de65' },
        { icon: <CheckCircle />, title: 'Overview', description: 'de65' },
    ]

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

            <CustomTab tabArray={tabArray} />
           

            {/* <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Customer" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <div className='subHeading'>GENERAL INFORMATION</div>
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Customer Id"
                        changeData={(data) => Validation(data, "customerId")}
                        value={profileDetails.customerId.value}
                        error={profileDetails.customerId.error}
                        errmsg={profileDetails.customerId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Customer Name"
                        changeData={(data) => Validation(data, "customerName")}
                        value={profileDetails.customerName.value}
                        error={profileDetails.customerName.error}
                        errmsg={profileDetails.customerName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Nature"
                        changeData={(data) => Validation(data, "businessNature")}
                        value={profileDetails.businessNature.value}
                        error={profileDetails.businessNature.error}
                        errmsg={profileDetails.businessNature.errmsg}
                    />
                </Grid>

                {CustomerObj.map((item, index) => {
                    return (
                        <>

                            <Grid item xs={12} md={5} sx={12} sm={12}>
                                <Labelbox show type="textarea"
                                    labelname="Description"
                                    changeData={(data) => Validation(data, "description")}
                                    value={profileDetails.description.value}
                                    error={profileDetails.description.error}
                                    errmsg={profileDetails.description.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <Labelbox show type="select"
                                    labelname="State"
                                    changeData={(data) => Validation(data, "state")}
                                    value={profileDetails.state.value}
                                    error={profileDetails.state.error}
                                    errmsg={profileDetails.state.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <Labelbox show type="select"
                                    labelname="City"
                                    changeData={(data) => Validation(data, "city")}
                                    value={profileDetails.city.value}
                                    error={profileDetails.city.error}
                                    errmsg={profileDetails.city.errmsg}
                                />
                            </Grid>

                            {index != 0 ? <Grid item xs={12} md={1} sx={12} sm={12} direction="row" justifyContent='flex-end' container>
                                <div className='remove_icons' onClick={() => handleRemoveClick('general', index)}><Delete /></div>
                            </Grid>
                                :
                                <Grid item xs={12} md={1} sx={12} sm={12} direction="row" justifyContent='flex-end' container>
                                    <div className='add_icons' onClick={() => handleAddClick('general')}><Add /></div>
                                </Grid>
                            }

                        </>
                    )
                })}
                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <div className='subHeading'>KYC DETAILS</div>
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="PAN"
                        changeData={(data) => Validation(data, "pan")}
                        value={profileDetails.pan.value}
                        error={profileDetails.pan.error}
                        errmsg={profileDetails.pan.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <UploadFiles uploadLabel="PAN Image" />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="CIN"
                        changeData={(data) => Validation(data, "cin")}
                        value={profileDetails.cin.value}
                        error={profileDetails.cin.error}
                        errmsg={profileDetails.cin.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <UploadFiles uploadLabel="CIN Image" />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="MSME"
                        changeData={(data) => Validation(data, "msme")}
                        value={profileDetails.msme.value}
                        error={profileDetails.msme.error}
                        errmsg={profileDetails.msme.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <UploadFiles uploadLabel="MEME Image" />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="IEC"
                        changeData={(data) => Validation(data, "iec")}
                        value={profileDetails.iec.value}
                        error={profileDetails.iec.error}
                        errmsg={profileDetails.iec.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <UploadFiles uploadLabel="IEC Image" />
                </Grid>
                <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                    <div className='subHeading'>ADDRESS</div>
                    <div className='add_icons' onClick={() => handleAddClick('address')}><Add /></div>
                </Grid>
                {AddmoreObj.map((data, index) => {
                    return (
                        <>
                            {index != 0 && <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='flex-end' container>
                                <div className='remove_icons' onClick={() => handleRemoveClick('address', index)}><Delete /></div>
                            </Grid>}
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <Labelbox show type="select"
                                    labelname="State"
                                    changeData={(data) => Validation(data, "state")}
                                    value={profileDetails.state.value}
                                    error={profileDetails.state.error}
                                    errmsg={profileDetails.state.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <Labelbox show type="select"
                                    labelname="City"
                                    changeData={(data) => Validation(data, "city")}
                                    value={profileDetails.city.value}
                                    error={profileDetails.city.error}
                                    errmsg={profileDetails.city.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <Labelbox show type="select"
                                    labelname="Country"
                                    changeData={(data) => Validation(data, "country")}
                                    value={profileDetails.country.value}
                                    error={profileDetails.country.error}
                                    errmsg={profileDetails.country.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <Labelbox show type="number"
                                    labelname="GST"
                                    changeData={(data) => Validation(data, "gst")}
                                    value={profileDetails.gst.value}
                                    error={profileDetails.gst.error}
                                    errmsg={profileDetails.gst.errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <UploadFiles uploadLabel="GST Image" />
                            </Grid>
                        </>
                    )
                })}

                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <div className='subHeading'>CONTACT US</div>
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Contact Person"
                        changeData={(data) => Validation(data, "contactPerson")}
                        value={profileDetails.contactPerson.value}
                        error={profileDetails.contactPerson.error}
                        errmsg={profileDetails.contactPerson.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone No"
                        changeData={(data) => Validation(data, "phoneNo")}
                        value={profileDetails.phoneNo.value}
                        error={profileDetails.phoneNo.error}
                        errmsg={profileDetails.phoneNo.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Mobile No"
                        changeData={(data) => Validation(data, "mobileNo")}
                        value={profileDetails.mobileNo.value}
                        error={profileDetails.mobileNo.error}
                        errmsg={profileDetails.mobileNo.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="E-Mail"
                        changeData={(data) => Validation(data, "email")}
                        value={profileDetails.email.value}
                        error={profileDetails.email.error}
                        errmsg={profileDetails.email.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={profileDetails.activeSts.value}
                        error={profileDetails.activeSts.error}
                        errmsg={profileDetails.activeSts.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" onBtnClick={() => onSubmit()} />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid> */}

        </div>
    );
}