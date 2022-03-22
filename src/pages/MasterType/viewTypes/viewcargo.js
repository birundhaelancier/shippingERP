import react from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
// import './customer.css';

const ViewCargo = () => {

    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Cargo ID</label>
                    <div>1234</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Cargo Name</label>
                    <div>Birundha</div>
                </Grid>              
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>Completed</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCargo;