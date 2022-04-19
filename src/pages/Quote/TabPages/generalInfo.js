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
import { AddQuote, ViewQuoteDetails, EditQuote } from '../../../Redux/Action/QuoteGroupAction/QuoteAction';
import { CargoList } from '../../../Redux/Action/EnquiryGroupAction/CargoAction'


export default function GeneralInfo({ quoteId }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const GetShipment = useSelector((state) => state.ShipmentReducer.GetShipmentList);
    const GetCargoList = useSelector((state) => state.CargoReducer.GetCargoList);
    const ViewQuote = useSelector((state) => state.QuoteReducer.ViewQuoteDetails);
    const [CountryList, setCountryList] = useState([])
    const [CargoLists, setCargoLists] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const [schemeList, setschemeList] = useState([])
    const [quoteDetails, setquoteDetails] = useState({
        cqId: {
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
        stuffingType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        amount: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        unit: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        remarks: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewQuoteDetails(quoteId))
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
        GetCargoList?.map((data) => {
            cargoLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCargoLists(cargoLists)
        let schemeList = []
        GetCargoList?.map((data) => {
            schemeList.push(
                { id: data.id, value: data.name }
            )
        })
        setschemeList(schemeList)
    }, [GetShipment, GetCargoList])


    useEffect(() => {
        if (ViewQuote) {
            quoteDetails.clearanceScheme.value = ViewQuote[0]?.scheme
            quoteDetails.cqId.value = ViewQuote[0]?.id
            quoteDetails.shipmentType.value = ViewQuote[0]?.shipment
            quoteDetails.cargoType.value = ViewQuote[0]?.cargo 
            quoteDetails.expenseType.value = ViewQuote[0]?.expense_type
            quoteDetails.stuffingType.value = ViewQuote[0]?.stuffing_type 
            quoteDetails.amount.value = ViewQuote[0]?.amount 
            quoteDetails.unit.value = ViewQuote[0]?.unit
            quoteDetails.remarks.value = ViewQuote[0]?.remarks 
        }
    }, [ViewQuote])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            quoteDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: quoteDetails[key].validation,
        };

        setquoteDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(quoteDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                quoteDetails[targetkeys[i]].value,
                quoteDetails[targetkeys[i]].validation
            );
            quoteDetails[targetkeys[i]].error = !errorcheck.state;
            quoteDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = quoteDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => quoteDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (quoteId) {
                dispatch(EditQuote(quoteDetails, quoteId))
                HandleCancel()
                history.push('/Quote');
            } else {
                dispatch(AddQuote(quoteDetails))
                HandleCancel()
                history.push('/Quote');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["clearanceScheme", "shipmentType", "cargoType", "expenseType", "stuffingType", "amount", "remarks", "unit"]
        SalesKey.map((data) => {
            quoteDetails[data].value = ""
        })
        setquoteDetails(prevState => ({
            ...prevState,
        }));
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Clearance Scheme"
                        dropdown={schemeList}
                        changeData={(data) => Validation(data, "clearanceScheme")}
                        value={quoteDetails.clearanceScheme.value}
                        error={quoteDetails.clearanceScheme.error}
                        errmsg={quoteDetails.clearanceScheme.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Shipment Type"
                        dropdown={CountryList}
                        changeData={(data) => Validation(data, "shipmentType")}
                        value={quoteDetails.shipmentType.value}
                        error={quoteDetails.shipmentType.error}
                        errmsg={quoteDetails.shipmentType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Cargo Type"
                        dropdown={CargoLists}
                        changeData={(data) => Validation(data, "cargoType")}
                        value={quoteDetails.cargoType.value}
                        error={quoteDetails.cargoType.error}
                        errmsg={quoteDetails.cargoType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Expense Type"
                        changeData={(data) => Validation(data, "expenseType")}
                        value={quoteDetails.expenseType.value}
                        error={quoteDetails.expenseType.error}
                        errmsg={quoteDetails.expenseType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Stuffing Type"
                        changeData={(data) => Validation(data, "stuffingType")}
                        value={quoteDetails.stuffingType.value}
                        error={quoteDetails.stuffingType.error}
                        errmsg={quoteDetails.stuffingType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Amount"
                        // dropdown={CargoLists}
                        changeData={(data) => Validation(data, "amount")}
                        value={quoteDetails.amount.value}
                        error={quoteDetails.amount.error}
                        errmsg={quoteDetails.amount.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Unit"
                        changeData={(data) => Validation(data, "unit")}
                        value={quoteDetails.unit.value}
                        error={quoteDetails.unit.error}
                        errmsg={quoteDetails.unit.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Remarks"
                        changeData={(data) => Validation(data, "remarks")}
                        value={quoteDetails.remarks.value}
                        error={quoteDetails.remarks.error}
                        errmsg={quoteDetails.remarks.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel}  />
            </Grid>
        </div>
    );
}