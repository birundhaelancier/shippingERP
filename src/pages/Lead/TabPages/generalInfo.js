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
import { useDispatch, useSelector } from 'react-redux';
import { getStateList } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { getCityList } from '../../../Redux/Action/GeneralGroupAction/cityAction';
import { AddLead, ViewLeadDetails, EditLead } from '../../../Redux/Action/SalesGroupAction/LeadAction';
import { getCustomerBusinessNatureList } from '../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';
import { SalesList } from '../../../Redux/Action/SalesGroupAction/SalesAction';

export default function GeneralInfo({ leadId }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const ViewLead = useSelector((state) => state.LeadReducer.ViewLeadDetails);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const GetState = useSelector((state) => state.StateReducer.GetStateList);
    const GetCity = useSelector((state) => state.CityReducer.GetCityList);
    const ViewBusiness = useSelector((state) => state.CustomerBusinessReducer.GetCustomerBusinessList);
    const GetSalesList  = useSelector((state) => state.SalesReducer.GetSalesList);
    const [CountryList, setCountryList] = useState([])
    const [StateList, setStateList] = useState([])
    const [CityList, setCityList] = useState([])
    const [LeadList, setLeadList] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const [leadDetails, setleadDetails] = useState({
        companyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        companyAddress: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        city: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        area: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        contactPerson: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobile: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        website: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        leadSource: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessPresence: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessNature: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })
    const [businessNature, setbusinessNature] = useState([])


    useEffect(() => {
        dispatch(ViewLeadDetails(leadId))
        dispatch(getCountryList(1))
        dispatch(getStateList(1))
        dispatch(getCityList(1))
        dispatch(getCustomerBusinessNatureList(1))
        dispatch(SalesList(1))
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

        let businessLists = []
        ViewBusiness?.map((data) => {
            businessLists.push(
                { id: data.id, value: data.name }
            )
        })
        setbusinessNature(businessLists)

        let leadLists = []
        GetSalesList?.map((data) => {
            leadLists.push(
                { id: data.id, value: data.name }
            )
        })
        setLeadList(leadLists)
    }, [GetCountry, GetState, GetCity, ViewBusiness, GetSalesList])

    useEffect(() => {
        if (ViewLead) {
            leadDetails.companyName.value = ViewLead[0]?.company_name
            leadDetails.companyAddress.value = ViewLead[0]?.company_address
            leadDetails.country.value = ViewLead[0]?.country
            leadDetails.state.value = ViewLead[0]?.state
            leadDetails.city.value = ViewLead[0]?.city
            leadDetails.area.value = ViewLead[0]?.area
            leadDetails.contactPerson.value = ViewLead[0]?.contact_person
            leadDetails.mobile.value = ViewLead[0]?.mobile
            leadDetails.phone.value = ViewLead[0]?.phone
            leadDetails.email.value = ViewLead[0]?.email
            leadDetails.website.value = ViewLead[0]?.website
            leadDetails.leadSource.value = ViewLead[0]?.lead_source
            leadDetails.businessPresence.value = ViewLead[0]?.business_presence
            leadDetails.businessNature.value = ViewLead[0]?.business_nature
        }
    }, [ViewLead])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            leadDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: leadDetails[key].validation,
        };

        setleadDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(leadDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                leadDetails[targetkeys[i]].value,
                leadDetails[targetkeys[i]].validation
            );
            leadDetails[targetkeys[i]].error = !errorcheck.state;
            leadDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = leadDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => leadDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (leadId) {
                dispatch(EditLead(leadDetails, leadId))
                HandleCancel()
                history.push('/lead');
            } else {
                dispatch(AddLead(leadDetails))
                HandleCancel()
                history.push('/lead');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["companyName", "companyAddress", "country", "state", "city", "area", "contactPerson", "mobile", "phone", "email", "website", "leadSource", "businessPresence", "businessNature"]
        SalesKey.map((data) => {
            leadDetails[data].value = ""
        })
        setleadDetails(prevState => ({
            ...prevState,
        }));
    }


    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Company Name"
                        changeData={(data) => Validation(data, "companyName")}
                        value={leadDetails.companyName.value}
                        error={leadDetails.companyName.error}
                        errmsg={leadDetails.companyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Company Address"
                        changeData={(data) => Validation(data, "companyAddress")}
                        value={leadDetails.companyAddress.value}
                        error={leadDetails.companyAddress.error}
                        errmsg={leadDetails.companyAddress.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "country")}
                        value={leadDetails.country.value}
                        error={leadDetails.country.error}
                        errmsg={leadDetails.country.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="State"
                        dropdown={StateList}
                        changeData={(data) => Validation(data, "state")}
                        value={leadDetails.state.value}
                        error={leadDetails.state.error}
                        errmsg={leadDetails.state.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="City"
                        dropdown={CityList}
                        changeData={(data) => Validation(data, "city")}
                        value={leadDetails.city.value}
                        error={leadDetails.city.error}
                        errmsg={leadDetails.city.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Area"
                        changeData={(data) => Validation(data, "area")}
                        value={leadDetails.area.value}
                        error={leadDetails.area.error}
                        errmsg={leadDetails.area.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Contact Person"
                        changeData={(data) => Validation(data, "contactPerson")}
                        value={leadDetails.contactPerson.value}
                        error={leadDetails.contactPerson.error}
                        errmsg={leadDetails.contactPerson.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Mobile"
                        changeData={(data) => Validation(data, "mobile")}
                        value={leadDetails.mobile.value}
                        error={leadDetails.mobile.error}
                        errmsg={leadDetails.mobile.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Phone"
                        changeData={(data) => Validation(data, "phone")}
                        value={leadDetails.phone.value}
                        error={leadDetails.phone.error}
                        errmsg={leadDetails.phone.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        changeData={(data) => Validation(data, "email")}
                        value={leadDetails.email.value}
                        error={leadDetails.email.error}
                        errmsg={leadDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Website"
                        changeData={(data) => Validation(data, "website")}
                        value={leadDetails.website.value}
                        error={leadDetails.website.error}
                        errmsg={leadDetails.website.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Lead Source"
                        dropdown={LeadList}
                        changeData={(data) => Validation(data, "leadSource")}
                        value={leadDetails.leadSource.value}
                        error={leadDetails.leadSource.error}
                        errmsg={leadDetails.leadSource.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Presence"
                        changeData={(data) => Validation(data, "businessPresence")}
                        value={leadDetails.businessPresence.value}
                        error={leadDetails.businessPresence.error}
                        errmsg={leadDetails.businessPresence.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Business Nature"
                        dropdown={businessNature}
                        changeData={(data) => Validation(data, "businessNature")}
                        value={leadDetails.businessNature.value}
                        error={leadDetails.businessNature.error}
                        errmsg={leadDetails.businessNature.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}