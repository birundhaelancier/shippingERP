import react, { useEffect, useState } from 'react';
import Labelbox from '../../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../../components/AddFieldsBtn';
import LabelBoxes from '../../../../components/labelbox/labelbox';
import DynModel from '../../../../components/CustomModal';
import AddFields from '../../../AddFields/index';
import FooterBtn from '../../../../components/FooterButtons';
import { Save, ArrowBack, ArrowForward, HighlightOff } from '@mui/icons-material';



export default function CustomerDetails({ showInputList }) {


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

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                {showInputList?.details.data?.map((item, index) => {
                    return (
                        <Grid item xs={12} md={6} sx={12} sm={12} className={item.showFlag ? 'customFlagInput' : ''}>
                            <Labelbox show type={item.type}
                                labelname={item.label}
                                changeData={(data) => Validation(data, "shipmentId")}
                                showFlag={item.showFlag}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} alignItems={'center'} container>
                <Grid item xs={12} md={2} sx={12} sm={12}>
                    <CustomButton btnName={"Submit"} custombtnCSS="Primary" startIcon={<Save />} />
                </Grid>
                <Grid item xs={12} md={2} sx={12} sm={12}>
                    <CustomButton
                        btnName="Cancel" custombtnCSS="Cancel" startIcon={<HighlightOff />} />
                </Grid>
            </Grid>
        </div>
    );
}