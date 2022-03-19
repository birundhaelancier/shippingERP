/* eslint-disable react-hooks/rules-of-hooks */
import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function DimensionDetails() {
    const [dimensionInfo, setdimensionInfo] = useState({
       
        dimensionId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        dimensionName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            dimensionInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: dimensionInfo[key].validation,
        };

        setdimensionInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Dimension" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Dimension Id"
                        changeData={(data) => Validation(data, "dimensionId")}
                        value={dimensionInfo.dimensionId.value}
                        error={dimensionInfo.dimensionId.error}
                        errmsg={dimensionInfo.dimensionId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Dimension Name"
                        changeData={(data) => Validation(data, "dimensionName")}
                        value={dimensionInfo.dimensionName.value}
                        error={dimensionInfo.dimensionName.error}
                        errmsg={dimensionInfo.dimensionName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={dimensionInfo.activeSts.value}
                        error={dimensionInfo.activeSts.error}
                        errmsg={dimensionInfo.activeSts.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid>
        </div>
    );
}