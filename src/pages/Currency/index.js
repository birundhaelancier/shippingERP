import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function CurrencyDetails() {
    const [currencyInfo, setcurrencyInfo] = useState({
        currencyId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        currencyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },        
        default: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            currencyInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: currencyInfo[key].validation,
        };

        setcurrencyInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Currency" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Currency Id"
                        changeData={(data) => Validation(data, "currencyId")}
                        value={currencyInfo.currencyId.value}
                        error={currencyInfo.currencyId.error}
                        errmsg={currencyInfo.currencyId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Name"
                        changeData={(data) => Validation(data, "currencyName")}
                        value={currencyInfo.currencyName.value}
                        error={currencyInfo.currencyName.error}
                        errmsg={currencyInfo.currencyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Country Id"
                        changeData={(data) => Validation(data, "countryId")}
                        value={currencyInfo.countryId.value}
                        error={currencyInfo.countryId.error}
                        errmsg={currencyInfo.countryId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={currencyInfo.countryName.value}
                        error={currencyInfo.countryName.error}
                        errmsg={currencyInfo.countryName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Default"
                        changeData={(data) => Validation(data, "default")}
                        value={currencyInfo.default.value}
                        error={currencyInfo.default.error}
                        errmsg={currencyInfo.default.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={currencyInfo.activeSts.value}
                        error={currencyInfo.activeSts.error}
                        errmsg={currencyInfo.activeSts.errmsg}
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