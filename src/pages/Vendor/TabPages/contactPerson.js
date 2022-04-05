import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import LabelBoxes from '../../../components/labelbox/labelbox';



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

    return (
        <div>
            <Grid item xs={12} md={8} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={3.3} sx={12} sm={12}>
                        <div className='labeltxtLabel'>Primary Contact</div>
                    </Grid>
                    <Grid item xs={12} md={1.7} sx={12} sm={12}>
                        <LabelBoxes show type="select"
                            placeholder='Salutation'
                            changeData={(data) => Validation(data, "primary")}
                        />
                    </Grid>
                    <Grid item xs={12} md={3.5} sx={12} sm={12}>
                        <LabelBoxes show type="text"
                            placeholder='First Name'
                            changeData={(data) => Validation(data, "primary")}
                        />
                    </Grid>
                    <Grid item xs={12} md={3.5} sx={12} sm={12}>
                        <LabelBoxes show type="text"
                            placeholder='Last Name'
                            changeData={(data) => Validation(data, "primary")}

                        />
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        changeData={(data) => Validation(data, "email")}
                        value={profileDetails.email.value}
                        error={profileDetails.email.error}
                        errmsg={profileDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12} spacing={2} direction="row" justifyContent={'center'} container>
                    <Grid item xs={12} md={8} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="Phone"
                            placeholder="Work Phone"
                            changeData={(data) => Validation(data, "primary")}
                            showFlag
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={12} sm={12} className='mobile_label'>
                        <LabelBoxes show type="number"
                            placeholder='Mobile'
                            changeData={(data) => Validation(data, "primary")}
                            showFlag
                        />
                    </Grid>

                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Website"
                        changeData={(data) => Validation(data, "mobile")}

                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Contact Person' />
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
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} />
            </Grid>
        </div >
    );
}