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
import { useDispatch } from 'react-redux';
import { AddReason, EditReason } from '../../../Redux/Action/EnquiryGroupAction/ReasonAction';

export default function GeneralInfo({reasonId, reasonName}) {
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    let dispatch = useDispatch();
    const [Refresh, setRefresh] = useState(false);
    const [ReasonInfo, setReasonInfo] = useState({
        ReasonName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })
    
    useEffect(() => {
        if (reasonName) {
            ReasonInfo.ReasonName.value = reasonName
        }        
        setReasonInfo(prevState => ({
            ...prevState,
        }));
    }, [reasonName])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            ReasonInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: ReasonInfo[key].validation,
        };

        setReasonInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(ReasonInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                ReasonInfo[targetkeys[i]].value,
                ReasonInfo[targetkeys[i]].validation
            );
            ReasonInfo[targetkeys[i]].error = !errorcheck.state;
            ReasonInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = ReasonInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => ReasonInfo[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (reasonId) {
                dispatch(EditReason(ReasonInfo, reasonId))
                HandleCancel()
            } else {
                dispatch(AddReason(ReasonInfo))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["ReasonName"]
        SalesKey.map((data) => {
            ReasonInfo[data].value = ""
        })
        setReasonInfo(prevState => ({
            ...prevState,
        }));
        history.push('/reason')
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
                        labelname="Reason Name"
                        changeData={(data) => Validation(data, "ReasonName")}
                        value={ReasonInfo.ReasonName.value}
                        error={ReasonInfo.ReasonName.error}
                        errmsg={ReasonInfo.ReasonName.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container >
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
                <FooterBtn saveBtn={'Submit'}  onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}