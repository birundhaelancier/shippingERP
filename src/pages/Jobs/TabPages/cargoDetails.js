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



export default function CargoDetails() {


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

        { label: 'Cargo Types', type: 'text', value: '' },
        { label: 'Packaging Type', type: 'text', value: '' },
        { label: 'No of Packages', type: 'text', value: '' },
        { label: 'No of Containers', type: 'text', value: '', showFlag: true },
        { label: 'Port of Discharge', type: 'text', value: '', showFlag: true },
        { label: 'Gross (Wt)', type: 'text', value: '' },
        { label: 'Net (Wt)', type: 'text', value: '' },
        { label: 'Dimension (Wt)', type: 'text', value: '' },
        { label: 'Volumetric (Wt)', type: 'text', value: '' },
        { label: 'Chargeable (Wt)', type: 'text', value: '' },
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
            <Grid item xs={12} spacing={2} direction="row" container>
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