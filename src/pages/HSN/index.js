import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function HSNDetails() {
    const [hsnInfo, sethsnInfo] = useState({
       
        hsnCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },    
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            hsnInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: hsnInfo[key].validation,
        };

        sethsnInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="HSN Code" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="HSN Code"
                        changeData={(data) => Validation(data, "hsnCode")}
                        value={hsnInfo.hsnCode.value}
                        error={hsnInfo.hsnCode.error}
                        errmsg={hsnInfo.hsnCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Description"
                        changeData={(data) => Validation(data, "description")}
                        value={hsnInfo.description.value}
                        error={hsnInfo.description.error}
                        errmsg={hsnInfo.description.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={hsnInfo.activeSts.value}
                        error={hsnInfo.activeSts.error}
                        errmsg={hsnInfo.activeSts.errmsg}
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