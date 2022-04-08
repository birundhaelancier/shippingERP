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



export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        sectionName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        chapterName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        hsnCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        unit: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        rateStandard: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        ratePre: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

        activeStatus: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

        transaction: {
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
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Transaction Type"
                        dropdown={
                            [
                                { id: 1, value: 'Import' },
                                { id: 2, value: 'Export' }
                            ]
                        }
                        changeData={(data) => Validation(data, "transaction")}
                        value={profileDetails.transaction.value}
                        error={profileDetails.transaction.error}
                        errmsg={profileDetails.transaction.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Section Name"
                        changeData={(data) => Validation(data, "sectionName")}
                        value={profileDetails.sectionName.value}
                        error={profileDetails.sectionName.error}
                        errmsg={profileDetails.sectionName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Chapter Name"
                        changeData={(data) => Validation(data, "chapterName")}
                        value={profileDetails.chapterName.value}
                        error={profileDetails.chapterName.error}
                        errmsg={profileDetails.chapterName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="HSN Code"
                        changeData={(data) => Validation(data, "hsnCode")}
                        value={profileDetails.hsnCode.value}
                        error={profileDetails.hsnCode.error}
                        errmsg={profileDetails.hsnCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Description"
                        changeData={(data) => Validation(data, "description")}
                        value={profileDetails.description.value}
                        error={profileDetails.description.error}
                        errmsg={profileDetails.description.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Unit"
                        changeData={(data) => Validation(data, "unit")}
                        value={profileDetails.unit.value}
                        error={profileDetails.unit.error}
                        errmsg={profileDetails.unit.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Rate of Duty Standard"
                        changeData={(data) => Validation(data, "rateStandard")}
                        value={profileDetails.rateStandard.value}
                        error={profileDetails.rateStandard.error}
                        errmsg={profileDetails.rateStandard.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Rate of Duty Preferential"
                        changeData={(data) => Validation(data, "ratePre")}
                        value={profileDetails.ratePre.value}
                        error={profileDetails.ratePre.error}
                        errmsg={profileDetails.ratePre.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeStatus")}
                        value={profileDetails.activeStatus.value}
                        error={profileDetails.activeStatus.error}
                        errmsg={profileDetails.activeStatus.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row"  container >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} />
            </Grid>
        </div>
    );
}