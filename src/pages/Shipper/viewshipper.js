import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewShipperDetails } from '../../Redux/Action/GeneralGroupAction/shipperAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewShipper = ({ GetId }) => {   
    let dispatch = useDispatch();
    const ViewShipper = useSelector((state) => state.ShipperReducer.ViewShipperDetails);

    useEffect(() => {
        dispatch(ViewShipperDetails(GetId))
    }, [])

    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Shipper ID</label>
                    <div>{ViewShipper && ViewShipper[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Company Name</label>
                    <div>{ViewShipper && ViewShipper[0]?.company_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exporter</label>
                    <div>{ViewShipper && ViewShipper[0]?.exporter}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Salutation</label>
                    <div>{ViewShipper && ViewShipper[0]?.primary_salute}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">First Name</label>
                    <div>{ViewShipper && ViewShipper[0]?.primary_first_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Last Name</label>
                    <div>{ViewShipper && ViewShipper[0]?.primary_second_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Designation</label>
                    <div>{ViewShipper && ViewShipper[0]?.designation}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Department</label>
                    <div>{ViewShipper && ViewShipper[0]?.department}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone</label>
                    <div>{ViewShipper && ViewShipper[0]?.phone}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Email</label>
                    <div>{ViewShipper && ViewShipper[0]?.email}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Website</label>
                    <div>{ViewShipper && ViewShipper[0]?.website}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Business Nature</label>
                    <div>{ViewShipper && ViewShipper[0]?.business_nature_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address1</label>
                    <div>{ViewShipper && ViewShipper[0]?.address1}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address2</label>
                    <div>{ViewShipper && ViewShipper[0]?.address2}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country</label>
                    <div>{ViewShipper && ViewShipper[0]?.country_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State</label>
                    <div>{ViewShipper && ViewShipper[0]?.state_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City</label>
                    <div>{ViewShipper && ViewShipper[0]?.city_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Zip Code</label>
                    <div>{ViewShipper && ViewShipper[0]?.zip_code}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone2</label>
                    <div>{ViewShipper && ViewShipper[0]?.phone2}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Fax</label>
                    <div>{ViewShipper && ViewShipper[0]?.fax}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewShipper;