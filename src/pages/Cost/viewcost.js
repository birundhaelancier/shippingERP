import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewCostDetails } from '../../Redux/Action/QuoteGroupAction/CostAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewCost = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewCost = useSelector((state) => state.CostReducer.ViewCostDetails);

    useEffect(() => {
        dispatch(ViewCostDetails(GetId))
    }, [])
    console.log(ViewCost, 'ViewCost');
    return (
        <>
              <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Cost ID</label>
                    <div>{ViewCost && ViewCost[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Scheme</label>
                    <div>{ViewCost && ViewCost[0]?.scheme}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Shipment Type</label>
                    <div>{ViewCost && ViewCost[0]?.shipment_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Cargo Type</label>
                    <div>{ViewCost && ViewCost[0]?.cargo_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Expense Type</label>
                    <div>{ViewCost && ViewCost[0]?.expense_type}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Expense</label>
                    <div>{ViewCost && ViewCost[0]?.expense }</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCost;