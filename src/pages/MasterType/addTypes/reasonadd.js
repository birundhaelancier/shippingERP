import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../../components/ContentHeader';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function AddReason() {
    let history = useHistory()

    const [reasonInfo, setreasonInfo] = useState({
       
        reasonId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        reasonName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            reasonInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: reasonInfo[key].validation,
        };

        setreasonInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    const onSubmit = () => {
        history.push("/reason");
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Reason" />
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Reason Id"
                        changeData={(data) => Validation(data, "reasonId")}
                        value={reasonInfo.reasonId.value}
                        error={reasonInfo.reasonId.error}
                        errmsg={reasonInfo.reasonId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Reason Name"
                        changeData={(data) => Validation(data, "reasonName")}
                        value={reasonInfo.reasonName.value}
                        error={reasonInfo.reasonName.error}
                        errmsg={reasonInfo.reasonName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeSts")}
                        value={reasonInfo.activeSts.value}
                        error={reasonInfo.activeSts.error}
                        errmsg={reasonInfo.activeSts.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" onBtnClick={() => onSubmit()} />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid>
        </div>
    );
}