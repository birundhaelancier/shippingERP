import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../../components/ContentHeader';
import LabelBoxes from '../../../components/labelbox/labelbox';

import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../../components/CustomTab';
import ViewCustomer from '../viewcustomer';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';


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
    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Website", validation: ["required"], arrVal: [] },
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

    return (
        <div>
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname='Salutation'
                        changeData={(data) => Validation(data, "primary")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='First Name'
                        changeData={(data) => Validation(data, "primary")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname='Last Name'
                        changeData={(data) => Validation(data, "primary")}

                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        changeData={(data) => Validation(data, "email")}
                        value={profileDetails.email.value}
                        error={profileDetails.email.error}
                        errmsg={profileDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        changeData={(data) => Validation(data, "primary")}
                        showFlag
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12} className='mobile_label'>
                    <Labelbox show type="number"
                        labelname='Mobile'
                        changeData={(data) => Validation(data, "primary")}
                        showFlag
                    />
                </Grid>

                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox type={data.type}
                                labelname={data.labelName}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })}

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Contact Person' />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} />
            </Grid>
        </div >
    );
}