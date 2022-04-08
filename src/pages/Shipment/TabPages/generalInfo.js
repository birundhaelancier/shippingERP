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

    const [shipmentInfo, setshipmentInfo] = useState({

        shipmentId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        shipmentType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

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
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Shipment Id"
                        changeData={(data) => Validation(data, "shipmentId")}
                        value={shipmentInfo.shipmentId.value}
                        error={shipmentInfo.shipmentId.error}
                        errmsg={shipmentInfo.shipmentId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Shipment Type"
                        changeData={(data) => Validation(data, "shipmentType")}
                        value={shipmentInfo.shipmentType.value}
                        error={shipmentInfo.shipmentType.error}
                        errmsg={shipmentInfo.shipmentType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={shipmentInfo.activeSts.value}
                        error={shipmentInfo.activeSts.error}
                        errmsg={shipmentInfo.activeSts.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={10} sx={12} sm={12} direction="row" justifyContent={'flex-end'} container style={{ position: 'relative', bottom: '50px' }}>
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