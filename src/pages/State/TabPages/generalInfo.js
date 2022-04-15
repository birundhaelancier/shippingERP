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
import { AddState, ViewStateDetails, EditState } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';



export default function GeneralInfo({ stateId }) {
    let history = useHistory();
    let dispatch = useDispatch();
    const ViewState = useSelector((state) => state.StateReducer.ViewStateDetails);
    const [Refresh, setRefresh] = useState(false);
    const [FieldModal, setFieldModal] = useState(false);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const [CountryList, setCountryList] = useState([])

    const [stateDetails, setstateDetails] = useState(
        {
            countryName: {
                value: "", validation: [{ name: "required" }], error: null, errmsg: null,
            },
            stateName: {
                value: "", validation: [{ name: "required" }], error: null, errmsg: null,
            },
            countryId: {
                value: "", validation: [{ name: "required" }], error: null, errmsg: null,
            },
            stateId: {
                value: "", validation: [{ name: "required" }], error: null, errmsg: null,
            },
        }
    )

    useEffect(() => {
        dispatch(ViewStateDetails(stateId))
        dispatch(getCountryList("All"))
    }, [])

    useEffect(() => {
        let countryLists = []
        GetCountry?.map((data)=>{
            countryLists.push(
                {id: data.id, value: data.name}
            )
        })
        setCountryList(countryLists)
    }, [GetCountry])

    useEffect(() => {
        if (ViewState) {
            stateDetails.countryName.value = ViewState[0]?.country
            stateDetails.stateName.value = ViewState[0]?.name
            stateDetails.stateId.value = ViewState[0]?.id
            stateDetails.countryId.value = ViewState[0]?.country
        }
    }, [ViewState])



    const Validation = (data, key, list) => {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            stateDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: stateDetails[key].validation,
        };

        setstateDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(stateDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                stateDetails[targetkeys[i]].value,
                stateDetails[targetkeys[i]].validation
            );
            stateDetails[targetkeys[i]].error = !errorcheck.state;
            stateDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = stateDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => stateDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (stateId) {
                dispatch(EditState(stateDetails))
            } else {
                dispatch(AddState(stateDetails))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["countryName", "stateName"]
        SalesKey.map((data) => {
            stateDetails[data].value = ""
        })
        setstateDetails(prevState => ({
            ...prevState,
        }));
    }

    const addInputBox = (obj) => { }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="State Name"
                        changeData={(data) => Validation(data, "stateName")}
                        value={stateDetails.stateName.value}
                        error={stateDetails.stateName.error}
                        errmsg={stateDetails.stateName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country Name"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "countryName")}
                        value={stateDetails.countryName.value}
                        error={stateDetails.countryName.error}
                        errmsg={stateDetails.countryName.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container>
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