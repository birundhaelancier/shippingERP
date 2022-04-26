import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewVehicleDetails } from '../../Redux/Action/TransportGroupAction/VehicleAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewCountry = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewVehicle = useSelector((state) => state.VehicleReducer.ViewVehicleDetails);

    useEffect(() => {
        dispatch(ViewVehicleDetails(GetId))
    }, [])
    return (
        <>
              <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Vehicle ID</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Vehicle Name</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Body Type</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.body_type}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Length</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.length}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Breadth</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.breadth}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Height</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.height}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewVehicle && ViewVehicle[0]?.status === 1 ? "Active" : "In-Active"}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCountry;