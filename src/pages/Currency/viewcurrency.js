import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewCurrencyDetails } from '../../Redux/Action/QuoteGroupAction/CurrencyAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewCurrency = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewCurrency = useSelector((state) => state.CurrencyReducer.ViewCurrencyDetails);

    useEffect(() => {
        dispatch(ViewCurrencyDetails(GetId))
    }, [])
    console.log(ViewCurrency, 'ViewCurrency');
    return (
        <>
              <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency ID</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency Name</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency Symbol</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.symbol}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.country_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Default</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.cur_default}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewCurrency && ViewCurrency[0]?.status === 1 ? "Active" : "In-Active"}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCurrency;