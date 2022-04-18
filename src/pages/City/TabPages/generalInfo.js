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
import { AddCity, ViewCityDetails, EditCity } from '../../../Redux/Action/GeneralGroupAction/cityAction';



export default function GeneralInfo({cityId}) {
    let dispatch = useDispatch();
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const GetState = useSelector((state) => state.StateReducer.GetStateList);
    const ViewCity = useSelector((state) => state.CityReducer.ViewCityDetails);
    const [CountryList, setCountryList] = useState([])
    const [StateList, setStateList] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        cityName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        stateName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewCityDetails(cityId))
        dispatch(getCountryList(1))
        dispatch(getStateList())
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
    }, [GetCountry, GetState])

    
    useEffect(() => {
        console.log(ViewCity, 'ViewCity')
        if (ViewCity) {
            profileDetails.cityName.value = ViewCity[0]?.name
            // profileDetails.cityId.value = ViewCity[0]?.id
            profileDetails.countryName.value = ViewCity[0]?.country
            profileDetails.stateName.value = ViewCity[0]?.state 
        }
    }, [ViewCity])

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            profileDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: profileDetails[key].validation,
        };

        setprofileDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(profileDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                profileDetails[targetkeys[i]].value,
                profileDetails[targetkeys[i]].validation
            );
            profileDetails[targetkeys[i]].error = !errorcheck.state;
            profileDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = profileDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => profileDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (cityId) {
                dispatch(EditCity(profileDetails, ViewCity))
            } else {
                dispatch(AddCity(profileDetails))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["countryName", "stateName", "cityName"]
        SalesKey.map((data) => {
            profileDetails[data].value = ""
        })
        setprofileDetails(prevState => ({
            ...prevState,
        }));
    }

    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            showList.push(obj)
            setShowList((prevState) => ([
                ...prevState,
            ]));
        }
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="City Name"
                        changeData={(data) => Validation(data, "cityName")}
                        value={profileDetails.cityName.value}
                        error={profileDetails.cityName.error}
                        errmsg={profileDetails.cityName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="State Name"
                        dropdown={StateList}
                        changeData={(data) => Validation(data, "stateName")}
                        value={profileDetails.stateName.value}
                        error={profileDetails.stateName.error}
                        errmsg={profileDetails.stateName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country Name"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "countryName")}
                        value={profileDetails.countryName.value}
                        error={profileDetails.countryName.error}
                        errmsg={profileDetails.countryName.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} />
            </Grid>
        </div>
    );
}