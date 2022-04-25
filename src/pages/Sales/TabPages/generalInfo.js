import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AddSales, ViewSalesDetails, EditSales } from '../../../Redux/Action/SalesGroupAction/SalesAction';


export default function GeneralInfo({ salesId }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const ViewSales = useSelector((state) => state.SalesReducer.ViewSalesDetails);
    const [Refresh, setRefresh] = useState(false);

    const [salesDetails, setsalesDetails] = useState({
        name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        salesId: {
            value: "", validation: [], error: null, errmsg: null,
        },
        incentivePlan: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        designation: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobile: {
            value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        remarks: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewSalesDetails(salesId))
    }, [])

    useEffect(() => {
        if (ViewSales) {
            salesDetails.name.value = ViewSales[0]?.name
            salesDetails.salesId.value = ViewSales[0]?.id
            salesDetails.incentivePlan.value = ViewSales[0]?.incentive_plan
            salesDetails.designation.value = ViewSales[0]?.designation
            salesDetails.mobile.value = ViewSales[0]?.mobile
            salesDetails.email.value = ViewSales[0]?.email
            salesDetails.remarks.value = ViewSales[0]?.remarks
        }
    }, [ViewSales])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            salesDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: salesDetails[key].validation,
        };

        setsalesDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(salesDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                salesDetails[targetkeys[i]].value,
                salesDetails[targetkeys[i]].validation
            );
            salesDetails[targetkeys[i]].error = !errorcheck.state;
            salesDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = salesDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => salesDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (salesId) {
                dispatch(EditSales(salesDetails, salesId))
                HandleCancel()
                history.push('/Sales');
            } else {
                dispatch(AddSales(salesDetails))
                HandleCancel()
                history.push('/Sales');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["name", "salesID", "incentivePlan", "designation", "mobile", "email", "remarks"]
        SalesKey.map((data) => {
            salesDetails[data].value = ""
        })
        setsalesDetails(prevState => ({
            ...prevState,
        }));
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Sales Person Name"
                        changeData={(data) => Validation(data, "name")}
                        value={salesDetails.name.value}
                        error={salesDetails.name.error}
                        errmsg={salesDetails.name.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Incentive Plan"
                        changeData={(data) => Validation(data, "incentivePlan")}
                        value={salesDetails.incentivePlan.value}
                        error={salesDetails.incentivePlan.error}
                        errmsg={salesDetails.incentivePlan.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Designation"
                        changeData={(data) => Validation(data, "designation")}
                        value={salesDetails.designation.value}
                        error={salesDetails.designation.error}
                        errmsg={salesDetails.designation.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Mobile"
                        showFlag
                        changeData={(data) => Validation(data, "mobile")}
                        value={salesDetails.mobile.value}
                        error={salesDetails.mobile.error}
                        errmsg={salesDetails.mobile.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Email"
                        // dropdown={CargoLists}
                        changeData={(data) => Validation(data, "email")}
                        value={salesDetails.email.value}
                        error={salesDetails.email.error}
                        errmsg={salesDetails.email.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Remarks"
                        changeData={(data) => Validation(data, "remarks")}
                        value={salesDetails.remarks.value}
                        error={salesDetails.remarks.error}
                        errmsg={salesDetails.remarks.errmsg}
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