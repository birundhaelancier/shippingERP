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
import { Save, ArrowBack, ArrowForward, HighlightOff } from '@mui/icons-material';



export default function ShipmentDetails() {


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
    const modalArray = [
        { label: 'Origin Country', type: 'text', value: '' },
        { label: 'Place of Receipt', type: 'text', value: '' },
        { label: 'Port of Lading', type: 'text', value: '' },
        { label: 'Destination Country', type: 'text', value: '', showFlag: true },
        { label: 'Port of Discharge', type: 'text', value: '', showFlag: true },
        { label: 'Final Port of Discharge', type: 'text', value: '' },
        { label: 'Commodity', type: 'text', value: '' },
        { label: 'Shipment Term', type: 'text', value: '' },
        { label: 'Nature of Clearance', type: 'text', value: '' },
        { label: ' Carrier / Liner Name', type: 'text', value: '' },
        { label: ' Carrier / Liner Invoice ', type: 'text', value: '' },
        { label: ' Carrier / Liner Inv Date ', type: 'text', value: '' },
        { label: ' Vessel / Flight Name ', type: 'text', value: '' },
        { label: ' BL / AWB No & Date ', type: 'text', value: '' },
        { label: ' ETD / POL ', type: 'text', value: '' },
        { label: ' ETA / POD ', type: 'text', value: '' },
        { label: 'Shipper Invoice No & Dt ', type: 'text', value: '' },
        { label: 'Shipper Invoice Date ', type: 'text', value: '' },
        { label: 'HAWB NO ', type: 'text', value: '' },
        { label: 'HAWB NO Date ', type: 'text', value: '' },
        { label: ' EGM / IGM No ', type: 'text', value: '' },
        { label: 'CTNR NO ', type: 'text', value: '' },
        { label: ' SB / BE No ', type: 'text', value: '' },
        { label: ' SB / BE Date ', type: 'text', value: '' },
        { label: ' Cargo / Cnt Recd On ', type: 'text', value: '' },
        { label: 'Nature of Stuffing ', type: 'text', value: '' },
        { label: 'Date of Stuffing ', type: 'text', value: '' },
        { label: 'Gate In ', type: 'text', value: '' },
        { label: 'Examination Date ', type: 'text', value: '' },
        { label: 'Transhipment Vessel ', type: 'text', value: '' },
        { label: ' ETA ', type: 'text', value: '' },
        { label: ' ETD ', type: 'text', value: '' },
        { label: 'SB No ', type: 'text', value: '' },
        { label: 'SB Date ', type: 'text', value: '' },
        { label: 'SB Type ', type: 'text', value: '' },
        { label: 'Customs House ', type: 'text', value: '' },


    ]

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

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                {modalArray?.map((item, index) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type={item.type}
                                labelname={item.label}
                                changeData={(data) => Validation(data, "activeSts")}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} />
            </Grid>
        </div>
    );
}