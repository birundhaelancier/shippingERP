import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AddConsigneeAddress, ViewConsigneeDetails, EditConsigneeAddress } from '../../../Redux/Action/GeneralGroupAction/consigneeAction';
import { getStateList } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { getCityList } from '../../../Redux/Action/GeneralGroupAction/cityAction';


export default function AddressInfo({ consigneeId, userId, handleActivekey }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const ViewConsignee = useSelector((state) => state.ConsigneeReducer.ViewConsigneeDetails);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const GetState = useSelector((state) => state.StateReducer.GetStateList);
    const GetCity = useSelector((state) => state.CityReducer.GetCityList);
    const [Refresh, setRefresh] = useState(false);
    const [CountryList, setCountryList] = useState([])
    const [StateList, setStateList] = useState([])
    const [CityList, setCityList] = useState([])
    const [generalDetails, setgeneralDetails] = useState({
        consigneeId: {
            value: userId, validation: [], error: null, errmsg: null,
        },
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address1: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address2: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        city: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        zipcode: {
            value: "", validation: [{ name: "required" }, { name: "Pincode" }], error: null, errmsg: null,
        },
        fax: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewConsigneeDetails(consigneeId))
        dispatch(getCountryList(1))
        dispatch(getStateList(1))
        dispatch(getCityList(1))
    }, [])


    useEffect(() => {
        let countryLists = []
        GetCountry?.map((data) => {
            countryLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCountryList(countryLists)

        let stateLists = []
        GetState?.map((data) => {
            stateLists.push(
                { id: data.id, value: data.name }
            )
        })
        setStateList(stateLists)

        let cityLists = []
        GetCity?.map((data) => {
            cityLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCityList(cityLists)
    }, [GetCountry, GetState, GetCity])


    useEffect(() => {
        if (ViewConsignee) {
            generalDetails.address1.value = ViewConsignee[0]?.address1
            generalDetails.address2.value = ViewConsignee[0]?.address2
            generalDetails.state.value = ViewConsignee[0]?.state
            generalDetails.city.value = ViewConsignee[0]?.city
            generalDetails.country.value = ViewConsignee[0]?.country
            generalDetails.phone.value = ViewConsignee[0]?.phone2
            generalDetails.zipcode.value = ViewConsignee[0]?.zip_code
            generalDetails.fax.value = ViewConsignee[0]?.fax
            generalDetails.consigneeId.value = ViewConsignee[0]?.id
        }
    }, [ViewConsignee])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            generalDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: generalDetails[key].validation,
        };

        setgeneralDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    console.log(ViewConsignee, 'userId')

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(generalDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                generalDetails[targetkeys[i]].value,
                generalDetails[targetkeys[i]].validation
            );
            generalDetails[targetkeys[i]].error = !errorcheck.state;
            generalDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = generalDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => generalDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (consigneeId) {
                dispatch(EditConsigneeAddress(generalDetails, consigneeId))
                // HandleCancel()
                history.push('/consignee');
            } else {
                dispatch(AddConsigneeAddress(generalDetails, userId))
                // HandleCancel()
                history.push('/consignee');
            }
        }
    }
    const HandleCancel = () => {
        let SalesKey = ["address1", "address2", "state", "city", "country", "phone", "zipcode", "fax"]
        SalesKey.map((data) => {
            generalDetails[data].value = ""
        })
        setgeneralDetails(prevState => ({
            ...prevState,
        }));
        history.push('/consignee');
    }

    return (
        <div>
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Address1"
                        changeData={(data) => Validation(data, "address1")}
                        value={generalDetails.address1.value}
                        error={generalDetails.address1.error}
                        errmsg={generalDetails.address1.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Address2"
                        changeData={(data) => Validation(data, "address2")}
                        value={generalDetails.address2.value}
                        error={generalDetails.address2.error}
                        errmsg={generalDetails.address2.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "country")}
                        value={generalDetails.country.value}
                        error={generalDetails.country.error}
                        errmsg={generalDetails.country.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="State"
                        dropdown={StateList}
                        changeData={(data) => Validation(data, "state")}
                        value={generalDetails.state.value}
                        error={generalDetails.state.error}
                        errmsg={generalDetails.state.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="City"
                        dropdown={CityList}
                        changeData={(data) => Validation(data, "city")}
                        value={generalDetails.city.value}
                        error={generalDetails.city.error}
                        errmsg={generalDetails.city.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Zip Code"
                        changeData={(data) => Validation(data, "zipcode")}
                        value={generalDetails.zipcode.value}
                        error={generalDetails.zipcode.error}
                        errmsg={generalDetails.zipcode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        showFlag
                        changeData={(data) => Validation(data, "phone")}
                        value={generalDetails.phone.value}
                        error={generalDetails.phone.error}
                        errmsg={generalDetails.phone.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Fax"
                        changeData={(data) => Validation(data, "fax")}
                        value={generalDetails.fax.value}
                        error={generalDetails.fax.error}
                        errmsg={generalDetails.fax.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Additional Field' />
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn backBtn saveBtn={'Save Stage'} onSaveBtn={onSubmit} onCancel={HandleCancel} onBack={() => handleActivekey('0')} />
            </Grid>
        </div>
    );
}