import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function ExchangeRateDetails() {
    const [exchangeRateInfo, setexchangeRateInfo] = useState({
       
        exchangeId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        currencyId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        exchangeRate: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        date: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            exchangeRateInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: exchangeRateInfo[key].validation,
        };

        setexchangeRateInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="exchangeRate" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Exchange Id"
                        changeData={(data) => Validation(data, "exchangeId")}
                        value={exchangeRateInfo.exchangeId.value}
                        error={exchangeRateInfo.exchangeId.error}
                        errmsg={exchangeRateInfo.exchangeId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Currency Id"
                        changeData={(data) => Validation(data, "currencyId")}
                        value={exchangeRateInfo.currencyId.value}
                        error={exchangeRateInfo.currencyId.error}
                        errmsg={exchangeRateInfo.currencyId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={exchangeRateInfo.countryName.value}
                        error={exchangeRateInfo.countryName.error}
                        errmsg={exchangeRateInfo.countryName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Exchange Rate"
                        changeData={(data) => Validation(data, "exchangeRate")}
                        value={exchangeRateInfo.exchangeRate.value}
                        error={exchangeRateInfo.exchangeRate.error}
                        errmsg={exchangeRateInfo.exchangeRate.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="Date"
                        changeData={(data) => Validation(data, "date")}
                        value={exchangeRateInfo.date.value}
                        error={exchangeRateInfo.date.error}
                        errmsg={exchangeRateInfo.date.errmsg}
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