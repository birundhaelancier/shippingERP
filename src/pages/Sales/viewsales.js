import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewSalesDetails } from '../../Redux/Action/SalesGroupAction/SalesAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewSales = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewSales = useSelector((state) => state.SalesReducer.ViewSalesDetails);

    useEffect(() => {
        dispatch(ViewSalesDetails(GetId))
    }, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Sales ID</label>
                    <div>{ViewSales && ViewSales[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Sales Person Name</label>
                    <div>{ViewSales && ViewSales[0]?.scheme}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Incentive Plan</label>
                    <div>{ViewSales && ViewSales[0]?.incentive_plan}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Designation</label>
                    <div>{ViewSales && ViewSales[0]?.designation}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Mobile</label>
                    <div>{ViewSales && ViewSales[0]?.mobile}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Email</label>
                    <div>{ViewSales && ViewSales[0]?.email}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Remarks</label>
                    <div>{ViewSales && ViewSales[0]?.remarks}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewSales;