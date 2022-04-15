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
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewHsnDetails,AddHsn,EditHsn } from '../../../Redux/Action/EnquiryGroupAction/HsnAction'


export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    const ViewHsnList = useSelector((state) => state.HsnReducer.ViewHsnDetails);
    let history = useHistory()
    let dispatch=useDispatch()
    let { id } =useParams()
    const [FieldModal, setFieldModal] = useState(false);
    const [HsnDetails, setHsnDetails] = useState({
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
    useEffect(() => {
        dispatch(ViewHsnDetails(id))
    }, [id])

    useEffect(() => {
    if(ViewHsnList){
        HsnDetails.description.value = ViewHsnList[0]?.description || ""
        HsnDetails.hsnCode.value = ViewHsnList[0]?.hsn_code || ""
        HsnDetails.rateStandard.value = ViewHsnList[0]?.rate_standard || ""
        HsnDetails.chapterName.value = ViewHsnList[0]?.chapter_name || ""
        HsnDetails.sectionName.value = ViewHsnList[0]?.section_name || ""
        HsnDetails.unit.value = ViewHsnList[0]?.unit || ""
        HsnDetails.transaction.value = ViewHsnList[0]?.type==="Import"?1:2 ||""
        HsnDetails.ratePre.value = ViewHsnList[0]?.rate_preferential || ""
        }
    }, [ViewHsnList])
  

    const Validation = (data, key, list) => {
     
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            HsnDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: HsnDetails[key].validation,
        };

        setHsnDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(HsnDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                HsnDetails[targetkeys[i]].value,
                HsnDetails[targetkeys[i]].validation
            );
            HsnDetails[targetkeys[i]].error = !errorcheck.state;
            HsnDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = HsnDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => HsnDetails[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            if (id) {
                dispatch(EditHsn(HsnDetails,id)).then(()=>{
                    history.push("/hsn")
                    HandleCancel()
                })
            } else {
                dispatch(AddHsn(HsnDetails)).then(()=>{
                    history.push("/hsn")
                    HandleCancel()
                })
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey =Object.keys(HsnDetails)
        SalesKey.map((data) => {
            HsnDetails[data].value = ""
        })
        setHsnDetails(prevState => ({
            ...prevState,
        }));
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
                        value={HsnDetails.transaction.value}
                        error={HsnDetails.transaction.error}
                        errmsg={HsnDetails.transaction.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Section Name"
                        changeData={(data) => Validation(data, "sectionName")}
                        value={HsnDetails.sectionName.value}
                        error={HsnDetails.sectionName.error}
                        errmsg={HsnDetails.sectionName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Chapter Name"
                        changeData={(data) => Validation(data, "chapterName")}
                        value={HsnDetails.chapterName.value}
                        error={HsnDetails.chapterName.error}
                        errmsg={HsnDetails.chapterName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="HSN Code"
                        changeData={(data) => Validation(data, "hsnCode")}
                        value={HsnDetails.hsnCode.value}
                        error={HsnDetails.hsnCode.error}
                        errmsg={HsnDetails.hsnCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Description"
                        changeData={(data) => Validation(data, "description")}
                        value={HsnDetails.description.value}
                        error={HsnDetails.description.error}
                        errmsg={HsnDetails.description.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Unit"
                        changeData={(data) => Validation(data, "unit")}
                        value={HsnDetails.unit.value}
                        error={HsnDetails.unit.error}
                        errmsg={HsnDetails.unit.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Rate of Duty Standard"
                        changeData={(data) => Validation(data, "rateStandard")}
                        value={HsnDetails.rateStandard.value}
                        error={HsnDetails.rateStandard.error}
                        errmsg={HsnDetails.rateStandard.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Rate of Duty Preferential"
                        changeData={(data) => Validation(data, "ratePre")}
                        value={HsnDetails.ratePre.value}
                        error={HsnDetails.ratePre.error}
                        errmsg={HsnDetails.ratePre.errmsg}
                    />
                </Grid>
{/* 
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeStatus")}
                        value={HsnDetails.activeStatus.value}
                        error={HsnDetails.activeStatus.error}
                        errmsg={HsnDetails.activeStatus.errmsg}
                    />
                </Grid> */}

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
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onSubmit={HandleCancel}/>
            </Grid>
        </div>
    );
}