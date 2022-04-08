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



export default function InvoiceMainDetails({ MenuList }) {


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

    const [modalArray, setModalArray] = useState({
        shipperInvoice: [
            { label: 'Shipper Invoice No', type: 'text', value: '' },
            { label: 'Shipper Invoice Date', type: 'text', value: '' },
            { label: 'Shipper Packing List No', type: 'text', value: '' },
            { label: 'Shipper PL Date', type: 'text', value: '' },
            { label: 'Payment Mode', type: 'text', value: '' },
            { label: 'Invoice Value', type: 'text', value: '' },
            { label: 'Invoice Currency', type: 'text', value: '' },
            { label: 'Ex Rate', type: 'text', value: '' },
        ],
        ff: [
            { label: 'FF Name', type: 'text', value: '' },
            { label: 'FF Invoice', type: 'text', value: '' },
            { label: 'FF Invoice Date', type: 'datepicker', value: '' },
        ],
        cha: [
            { label: 'CHA Name', type: 'text', value: '' },
            { label: 'CHA Invoice', type: 'text', value: '' },
            { label: 'CHA Invoice Date', type: 'datepicker', value: '' },
        ],
        transporter: [
            { label: 'Transporter Name', type: 'text', value: '' },
            { label: 'Transporter Invoice', type: 'text', value: '' },
            { label: 'Transporter Invoice Date', type: 'datepicker', value: '' },
        ],
        surveyor: [
            { label: 'Surveyor Name', type: 'text', value: '' },
            { label: 'Surveyor Invoice', type: 'text', value: '' },
            { label: 'Surveyor Invoice Date', type: 'datepicker', value: '' },
        ],
        fumigation: [
            { label: 'Fumigation Name', type: 'text', value: '' },
            { label: 'Fumigation Invoice', type: 'text', value: '' },
            { label: 'Fumigation Invoice Date', type: 'datepicker', value: '' },
        ],
        quarantine: [
            { label: 'Quarantine Name', type: 'text', value: '' },
            { label: 'Quarantine Invoice', type: 'text', value: '' },
            { label: 'Quarantine Invoice Date', type: 'datepicker', value: '' },
        ],
        pallatization: [
            { label: 'Pallatization Name', type: 'text', value: '' },
            { label: 'Pallatization Invoice', type: 'text', value: '' },
            { label: 'Pallatization Invoice Date', type: 'datepicker', value: '' },
        ],
    })
    console.log(MenuList, 'MenuList')

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
            <Grid item xs={12} spacing={2} direction="row" container>
                {modalArray[MenuList]?.map((item, index) => {
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