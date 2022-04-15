import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import { AddContry, ViewCountryDetails, EditContry } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import FooterBtn from '../../../components/FooterButtons';

export default function GeneralInfo({ countryId }) {
    let history = useHistory()
    let dispatch = useDispatch();
    const ViewCountry = useSelector((state) => state.CountryReducer.ViewCountryDetails);
    const [Refresh, setRefresh] = useState(false);
    const [countryDetails, setcountryDetails] = useState({
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewCountryDetails(countryId))
    }, [])

    useEffect(() => {
    if(ViewCountry){
        countryDetails.countryName.value = ViewCountry[0]?.name
        countryDetails.countryCode.value = ViewCountry[0]?.code
        }
    }, [ViewCountry])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            countryDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: countryDetails[key].validation,
        };

        setcountryDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(countryDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                countryDetails[targetkeys[i]].value,
                countryDetails[targetkeys[i]].validation
            );
            countryDetails[targetkeys[i]].error = !errorcheck.state;
            countryDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = countryDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => countryDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (countryId) {
                dispatch(EditContry(countryDetails, countryId))
            } else {
                dispatch(AddContry(countryDetails))
                HandleCancel()
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey = ["countryName", "countryCode"]
        SalesKey.map((data) => {
            countryDetails[data].value = ""
        })
        setcountryDetails(prevState => ({
            ...prevState,
        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={countryDetails.countryName.value}
                        error={countryDetails.countryName.error}
                        errmsg={countryDetails.countryName.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Code"
                        changeData={(data) => Validation(data, "countryCode")}
                        value={countryDetails.countryCode.value}
                        error={countryDetails.countryCode.error}
                        errmsg={countryDetails.countryCode.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} />
            </Grid>
        </div>
    );
}