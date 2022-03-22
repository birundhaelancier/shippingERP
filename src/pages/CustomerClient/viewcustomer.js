import react from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import './customer.css';

const ViewCustomer = () => {

    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Customer ID</label>
                    <div>1234</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Customer Name</label>
                    <div>Birundha</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Customer Type</label>
                    <div>Daily</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Company Name</label>
                    <div>Elancier</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address1</label>
                    <div>No.10</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address2</label>
                    <div>Periyar pathai</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State</label>
                    <div>Tamil Nadu</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City</label>
                    <div>Madurai</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country</label>
                    <div>1234</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">GST</label>
                    <div>GST787578877</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">CIN</label>
                    <div>1234</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">MSME</label>
                    <div>5655686446868</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Contact Person</label>
                    <div>Divya</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone Number</label>
                    <div>7865688678</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Mobile Number</label>
                    <div>9875243656</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Email Id</label>
                    <div>elancier@gmail.com</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">IEC</label>
                    <div>1234</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>Completed</div>
                </Grid>
            </Grid>
            {/* <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid> */}
        </>
    )
}

export default ViewCustomer;