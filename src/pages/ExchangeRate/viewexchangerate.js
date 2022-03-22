import react from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';

const ViewExchangeRate = () => {

    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exchange Id</label>
                    <div>10</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency Id</label>
                    <div>6</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>India</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Id</label>
                    <div>2</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exchange Rate</label>
                    <div>10</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Date</label>
                    <div>23-09-2021</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewExchangeRate;