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
import { AddShipment, EditShipment } from '../../../Redux/Action/EnquiryGroupAction/ShipmentAction';

export default function GeneralInfo({ shipmentId, shipmentName}) {
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    let dispatch = useDispatch();
    const [Refresh, setRefresh] = useState(false);
    const [shipmentInfo, setshipmentInfo] = useState({
        shipment: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })
    
    // useEffect(() => {
    //     if (shipmentName) {
    //         shipmentInfo.shipment.value = shipmentName || ""
    //         setshipmentInfo(prevState => ({
    //             ...prevState,
    //         }));
    //     }        
      
    // }, [shipmentName])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            shipmentInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: shipmentInfo[key].validation,
        };

        setshipmentInfo(prevState => ({
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
        var targetkeys = Object.keys(shipmentInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                shipmentInfo[targetkeys[i]].value,
                shipmentInfo[targetkeys[i]].validation
            );
            shipmentInfo[targetkeys[i]].error = !errorcheck.state;
            shipmentInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = shipmentInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => shipmentInfo[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (shipmentId) {
                dispatch(EditShipment(shipmentInfo, shipmentId))
                HandleCancel()
            } else {
                dispatch(AddShipment(shipmentInfo))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["shipment"]
        SalesKey.map((data) => {
            shipmentInfo[data].value = ""
        })
        setshipmentInfo(prevState => ({
            ...prevState,
        }));
        history.push('/shipment')
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
            <Grid item xs={8} spacing={2} direction="row" container>
                <Grid item xs={12} md={10}  sm={12}>
                    <Labelbox show type="text"
                        labelname="Shipment Type"
                        changeData={(data) => Validation(data, "shipment")}
                        value={shipmentInfo.shipment.value}
                        error={shipmentInfo.shipment.error}
                        errmsg={shipmentInfo.shipment.errmsg}
                    />
                </Grid>
               
            <Grid item xs={12} md={10}  sm={12} >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            </Grid>

            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}