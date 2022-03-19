import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button'
// import './customer.css';

export default function SeaportDetails(props) {
    const params = new URLSearchParams(props.location.search);
    const masterType = params.get('type');

    console.log(masterType, "masterType")

    const [seaportInfo, setseaportInfo] = useState({

        portId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        portCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        portName: {
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
            seaportInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: seaportInfo[key].validation,
        };

        setseaportInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle={masterType == 'AP' ? "Air Port" : "Sea Port"} />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Port Id"
                        changeData={(data) => Validation(data, "portId")}
                        value={seaportInfo.portId.value}
                        error={seaportInfo.portId.error}
                        errmsg={seaportInfo.portId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Port Code"
                        changeData={(data) => Validation(data, "portCode")}
                        value={seaportInfo.portCode.value}
                        error={seaportInfo.portCode.error}
                        errmsg={seaportInfo.portCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Port Name"
                        changeData={(data) => Validation(data, "portName")}
                        value={seaportInfo.portName.value}
                        error={seaportInfo.portName.error}
                        errmsg={seaportInfo.portName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Country Id"
                        changeData={(data) => Validation(data, "countryId")}
                        value={seaportInfo.countryId.value}
                        error={seaportInfo.countryId.error}
                        errmsg={seaportInfo.countryId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={seaportInfo.countryName.value}
                        error={seaportInfo.countryName.error}
                        errmsg={seaportInfo.countryName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Default"
                        changeData={(data) => Validation(data, "default")}
                        value={seaportInfo.default.value}
                        error={seaportInfo.default.error}
                        errmsg={seaportInfo.default.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={seaportInfo.activeSts.value}
                        error={seaportInfo.activeSts.error}
                        errmsg={seaportInfo.activeSts.errmsg}
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