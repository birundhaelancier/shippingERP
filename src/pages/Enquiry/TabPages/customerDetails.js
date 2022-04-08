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

export default function CustomerDetails() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        customerType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        contactPerson: {
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
    const [showInput, setShowInput] = useState(false);

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
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Customer Type"
                        changeData={(data) => Validation(data, "customerType")}
                        value={profileDetails.customerType.value}
                        error={profileDetails.customerType.error}
                        errmsg={profileDetails.customerType.errmsg}
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
                        labelname="Contact Person"
                        changeData={(data) => Validation(data, "contactPerson")}
                        value={profileDetails.contactPerson.value}
                        error={profileDetails.contactPerson.error}
                        errmsg={profileDetails.contactPerson.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Designation"
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        placeholder="Work Phone"
                        changeData={(data) => Validation(data, "primary")}
                        showFlag
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12} className='mobile_label'>
                    <Labelbox show type="number"
                        labelname='Mobile'
                        placeholder='Mobile'
                        changeData={(data) => Validation(data, "primary")}
                        showFlag
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        changeData={(data) => Validation(data, "customerEmail")}
                        value={profileDetails.customerEmail.value}
                        error={profileDetails.customerEmail.error}
                        errmsg={profileDetails.customerEmail.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Address"
                        changeData={(data) => Validation(data, "activeStatus")}

                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="City"
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="State" showFlag
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country" showFlag
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                  
                </Grid>

                {/* 
                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox type={data.type}
                                labelname={data.labelName}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })} */}

            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} />
            </Grid>
        </div>
    );
}