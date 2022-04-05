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

export default function ShipmentDetails() {
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
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="ENQ No"
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="ENQ Date" showFlag
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Shipment Type" showFlag
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Scope"
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Shipment Description" showFlag
                        changeData={(data) => Validation(data, "activeStatus")} />
                </Grid>
                <Grid item xs={12} md={6} sx={12} sm={12} >
                    <AddFieldsBtn fieldName='Next' AddFieldBtn={() => setShowInput(!showInput)} />
                </Grid>
                {showInput &&
                    <>

                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Origin"
                                changeData={(data) => Validation(data, "customerType")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Destination"
                                changeData={(data) => Validation(data, "customerName")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Commodity"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Shipment Team"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Nature of Clearance" showFlag
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Cargo Types" showFlag
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Package Type"
                                changeData={(data) => Validation(data, "customerEmail")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="No of Packages"
                                changeData={(data) => Validation(data, "activeStatus")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="No of Containers"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Gross Wt"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Net Wt"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Dimension Wt"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Volumetric Wt"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Chargable Wt"
                                changeData={(data) => Validation(data, "activeStatus")} />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Pickup Location"
                                changeData={(data) => Validation(data, "customerType")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Drop Location"
                                changeData={(data) => Validation(data, "customerName")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Vehicle Type"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Types of VAS"
                                changeData={(data) => Validation(data, "customerType")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Remarks"
                                changeData={(data) => Validation(data, "customerName")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Enquiry Status"
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="datepicker"
                                labelname="Enquiry Cut of Date"
                                changeData={(data) => Validation(data, "customerType")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <Labelbox show type="textarea"
                                labelname="Reason"
                                changeData={(data) => Validation(data, "customerName")}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                            <AddFieldsBtn fieldName='Add More Details' />
                        </Grid>
                    </>
                }

                {/* 
                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={6} sx={12} sm={12}>
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