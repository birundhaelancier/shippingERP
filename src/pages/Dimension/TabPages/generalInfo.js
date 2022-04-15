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
import { useDispatch, useSelector } from 'react-redux';
import { AddDimension, EditDimension } from '../../../Redux/Action/EnquiryGroupAction/DimensionAction';


export default function GeneralInfo({ dimensionId, dimensionName }) {
    let history = useHistory()
    let dispatch = useDispatch();
    const [Refresh, setRefresh] = useState(false);
    const [FieldModal, setFieldModal] = useState(false);

    const [DimensionInfo, setDimensionInfo] = useState({
        dimensionName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        if (dimensionName) {
            DimensionInfo.dimensionName.value = dimensionName
        }        
        setDimensionInfo(prevState => ({
            ...prevState,
        }));
    }, [dimensionName])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            DimensionInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: DimensionInfo[key].validation,
        };

        setDimensionInfo(prevState => ({
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
        var targetkeys = Object.keys(DimensionInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                DimensionInfo[targetkeys[i]].value,
                DimensionInfo[targetkeys[i]].validation
            );
            DimensionInfo[targetkeys[i]].error = !errorcheck.state;
            DimensionInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = DimensionInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => DimensionInfo[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (dimensionId) {
                dispatch(EditDimension(DimensionInfo, dimensionId))
                HandleCancel()
            } else {
                dispatch(AddDimension(DimensionInfo))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["dimensionName"]
        SalesKey.map((data) => {
            DimensionInfo[data].value = ""
        })
        setDimensionInfo(prevState => ({
            ...prevState,
        }));
        history.push('/dimension')
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
                        labelname="Dimension Name"
                        changeData={(data) => Validation(data, "dimensionName")}
                        value={DimensionInfo.dimensionName.value}
                        error={DimensionInfo.dimensionName.error}
                        errmsg={DimensionInfo.dimensionName.errmsg}
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

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" >
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}