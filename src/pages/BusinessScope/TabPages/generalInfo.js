import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory,useParams } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch,useSelector } from 'react-redux';
import { EditBusinessScope,AddBusinessScope } from '../../../Redux/Action/EnquiryGroupAction/BusinessScopeActions'


export default function GeneralInfo() {
    let { id } =useParams()
    let history = useHistory()
    let dispatch=useDispatch()
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    const ViewData = useSelector((state) => state.BusinessScopeReducer.GetBusinessScopeList);
    const [FieldModal, setFieldModal] = useState(false);
    const [Details, setDetails] = useState({
        Code: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        Name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        Description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const [showList, setShowList] = useState(
        [
            { type: "text", label: "Business Scope ID", validation: ["required"], arrVal: [] },
            { type: "text", label: "Business Scope Code", validation: ["required"], arrVal: [] },
            { type: "text", label: "Business Scope Name", validation: ["required"], arrVal: [] },
            { type: "text", label: "Description", validation: ["required"], arrVal: [] },
            { type: "text", label: "Active Status", validation: ["required"], arrVal: [] },
        ]
    )
    useEffect(() => {
        if (id) {
            Details.Code.value = ViewData[0]?.code
            Details.Name.value = ViewData[0]?.name
            Details.Description.value = ViewData[0]?.description 
        }
    }, [ViewData])
    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            Details[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: Details[key].validation,
        };

        setDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(Details);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                Details[targetkeys[i]].value,
                Details[targetkeys[i]].validation
            );
            Details[targetkeys[i]].error = !errorcheck.state;
            Details[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = Details[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => Details[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            if (id) {
                dispatch(EditBusinessScope(Details, id))
            } else {
                dispatch(AddBusinessScope(Details))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = Object.keys(Details)
        SalesKey.map((data) => {
            Details[data].value = ""
        })
        setDetails(prevState => ({
            ...prevState,
        }));
        history.push("/business")
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
            <Grid item xs={12} spacing={2} direction="row" container>
            <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Scope Code"
                        changeData={(data) => Validation(data, "Code")}
                        value={Details.Code.value}
                        error={Details.Code.error}
                        errmsg={Details.Code.errmsg}
                    />
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Scope Name"
                        changeData={(data) => Validation(data, "Name")}
                        value={Details.Name.value}
                        error={Details.Name.error}
                        errmsg={Details.Name.errmsg}
                    />
            </Grid>
            <Grid item xs={12} md={8} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Description"
                        changeData={(data) => Validation(data, "Description")}
                        value={Details.Description.value}
                        error={Details.Description.error}
                        errmsg={Details.Description.errmsg}
                    />
            </Grid>

            </Grid>
            <Grid item xs={12} md={10} sx={12} sm={12} direction="row" container>
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
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel}/>
            </Grid>
        </div>
    );
}