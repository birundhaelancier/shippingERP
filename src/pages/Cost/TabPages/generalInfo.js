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
import { ShipmentList } from '../../../Redux/Action/EnquiryGroupAction/ShipmentAction';
import { AddCost, ViewCostDetails, EditCost } from '../../../Redux/Action/QuoteGroupAction/CostAction';
import { CargoList } from '../../../Redux/Action/EnquiryGroupAction/CargoAction'


export default function GeneralInfo({ costId }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const GetShipment = useSelector((state) => state.ShipmentReducer.GetShipmentList);
    const GetCargoList = useSelector((state) => state.CargoReducer.GetCargoList);
    const ViewCost = useSelector((state) => state.CostReducer.ViewCostDetails);
    const [CountryList, setCountryList] = useState([])
    const [CargoLists, setCargoLists] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const [costDetails, setcostDetails] = useState({
        costId: {
            value: "", validation: [], error: null, errmsg: null,
        },
        clearanceScheme: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        shipmentType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cargoType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        expenseType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        expense: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    
    useEffect(() => {
        dispatch(ViewCostDetails(costId))
        dispatch(ShipmentList(1))
        dispatch(CargoList(1))
    }, [])

    useEffect(() => {
        let countryLists = []
        GetShipment?.map((data) => {
            countryLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCountryList(countryLists)
        let cargoLists = []
        console.log(GetCargoList, 'GetCargoList')
        GetCargoList?.map((data) => {
            cargoLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCargoLists(cargoLists)

    }, [GetShipment, GetCargoList])


    useEffect(() => {
        console.log(ViewCost, 'ViewCost')
        if (ViewCost) {
            costDetails.clearanceScheme.value = ViewCost[0]?.scheme
            costDetails.costId.value = ViewCost[0]?.id
            costDetails.shipmentType.value = ViewCost[0]?.shipment
            costDetails.cargoType.value = ViewCost[0]?.cargo 
            costDetails.expenseType.value = ViewCost[0]?.expense_type
            costDetails.expense.value = ViewCost[0]?.expense 
        }
    }, [ViewCost])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            costDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: costDetails[key].validation,
        };

        setcostDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(costDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                costDetails[targetkeys[i]].value,
                costDetails[targetkeys[i]].validation
            );
            costDetails[targetkeys[i]].error = !errorcheck.state;
            costDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = costDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => costDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (costId) {
                dispatch(EditCost(costDetails, costId))
                HandleCancel()
                history.push('/cost');
            } else {
                dispatch(AddCost(costDetails))
                HandleCancel()
                history.push('/cost');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["clearanceScheme", "shipmentType", "cargoType", "expenseType"]
        SalesKey.map((data) => {
            costDetails[data].value = ""
        })
        setcostDetails(prevState => ({
            ...prevState,
        }));
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Clearance Scheme"
                        changeData={(data) => Validation(data, "clearanceScheme")}
                        value={costDetails.clearanceScheme.value}
                        error={costDetails.clearanceScheme.error}
                        errmsg={costDetails.clearanceScheme.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Shipment Type"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "shipmentType")}
                        value={costDetails.shipmentType.value}
                        error={costDetails.shipmentType.error}
                        errmsg={costDetails.shipmentType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Cargo Type"
                        dropdown={CargoLists}
                        changeData={(data) => Validation(data, "cargoType")}
                        value={costDetails.cargoType.value}
                        error={costDetails.cargoType.error}
                        errmsg={costDetails.cargoType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Expense Type"
                        changeData={(data) => Validation(data, "expenseType")}
                        value={costDetails.expenseType.value}
                        error={costDetails.expenseType.error}
                        errmsg={costDetails.expenseType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Expense"
                        changeData={(data) => Validation(data, "expense")}
                        value={costDetails.expense.value}
                        error={costDetails.expense.error}
                        errmsg={costDetails.expense.errmsg}
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