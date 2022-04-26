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
import { useDispatch, useSelector } from 'react-redux'
import { getStateList } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { AddCurrency, ViewCurrencyDetails, EditCurrency } from '../../../Redux/Action/QuoteGroupAction/CurrencyAction';



export default function GeneralInfo({ currencyId }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const ViewCurrency = useSelector((state) => state.CurrencyReducer.ViewCurrencyDetails);
    const [CountryList, setCountryList] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const [currencyDetails, setcurrencyDetails] = useState({
        currencyId: {
            value: "", validation: [], error: null, errmsg: null,
        },
        currencyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        currencySymbol: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })


    useEffect(() => {
        dispatch(ViewCurrencyDetails(currencyId))
        dispatch(getCountryList(1))
    }, [])

    useEffect(() => {
        let countryLists = []
        GetCountry?.map((data) => {
            countryLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCountryList(countryLists)

    }, [GetCountry])


    useEffect(() => {
        console.log(ViewCurrency, 'ViewCurrency')
        if (ViewCurrency) {
            currencyDetails.currencyName.value = ViewCurrency[0]?.name
            currencyDetails.currencyId.value = ViewCurrency[0]?.id
            currencyDetails.countryId.value = ViewCurrency[0]?.country
            currencyDetails.currencySymbol.value = ViewCurrency[0]?.symbol 
        }
    }, [ViewCurrency])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            currencyDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: currencyDetails[key].validation,
        };

        setcurrencyDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(currencyDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                currencyDetails[targetkeys[i]].value,
                currencyDetails[targetkeys[i]].validation
            );
            currencyDetails[targetkeys[i]].error = !errorcheck.state;
            currencyDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = currencyDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => currencyDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (currencyId) {
                dispatch(EditCurrency(currencyDetails, currencyId))
                HandleCancel()
                history.push('/currency');
            } else {
                dispatch(AddCurrency(currencyDetails))
                HandleCancel()
                history.push('/currency');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["currencyName", "countryId", "currencySymbol"]
        SalesKey.map((data) => {
            currencyDetails[data].value = ""
        })
        setcurrencyDetails(prevState => ({
            ...prevState,
        }));
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'start'} container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Name"
                        changeData={(data) => Validation(data, "currencyName")}
                        value={currencyDetails.currencyName.value}
                        error={currencyDetails.currencyName.error}
                        errmsg={currencyDetails.currencyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Symbol"
                        changeData={(data) => Validation(data, "currencySymbol")}
                        value={currencyDetails.currencySymbol.value}
                        error={currencyDetails.currencySymbol.error}
                        errmsg={currencyDetails.currencySymbol.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country Name"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "countryId")}
                        value={currencyDetails.countryId.value}
                        error={currencyDetails.countryId.error}
                        errmsg={currencyDetails.countryId.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container>
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}