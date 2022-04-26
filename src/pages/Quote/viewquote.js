import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewQuoteDetails } from '../../Redux/Action/QuoteGroupAction/QuoteAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewQuote = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewQuote = useSelector((state) => state.QuoteReducer.ViewQuoteDetails);

    useEffect(() => {
        dispatch(ViewQuoteDetails(GetId))
    }, [])
    return (
        <>
              <Grid item xs={12} spacing={2} direction="row" container>
              <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Quote ID</label>
                    <div>{ViewQuote && ViewQuote[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Scheme</label>
                    <div>{ViewQuote && ViewQuote[0]?.scheme}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Shipment Type</label>
                    <div>{ViewQuote && ViewQuote[0]?.shipment_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Cargo Type</label>
                    <div>{ViewQuote && ViewQuote[0]?.cargo_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Expense Type</label>
                    <div>{ViewQuote && ViewQuote[0]?.expense_type}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Stuffing Type</label>
                    <div>{ViewQuote && ViewQuote[0]?.stuffing_type }</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Amount</label>
                    <div>{ViewQuote && ViewQuote[0]?.amount}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Unit</label>
                    <div>{ViewQuote && ViewQuote[0]?.unit}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Remarks</label>
                    <div>{ViewQuote && ViewQuote[0]?.remarks }</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewQuote;