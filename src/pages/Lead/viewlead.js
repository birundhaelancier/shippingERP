import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewLeadDetails } from '../../Redux/Action/SalesGroupAction/LeadAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewLead = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewLead = useSelector((state) => state.LeadReducer.ViewLeadDetails);

    useEffect(() => {
        dispatch(ViewLeadDetails(GetId))
    }, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Lead ID</label>
                    <div>{ViewLead && ViewLead[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Company Name</label>
                    <div>{ViewLead && ViewLead[0]?.company_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Company Address</label>
                    <div>{ViewLead && ViewLead[0]?.company_address}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country</label>
                    <div>{ViewLead && ViewLead[0]?.country_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State</label>
                    <div>{ViewLead && ViewLead[0]?.state_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City</label>
                    <div>{ViewLead && ViewLead[0]?.city_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Area</label>
                    <div>{ViewLead && ViewLead[0]?.area}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Contact Person</label>
                    <div>{ViewLead && ViewLead[0]?.contact_person}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Mobile</label>
                    <div>{ViewLead && ViewLead[0]?.mobile}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone</label>
                    <div>{ViewLead && ViewLead[0]?.phone}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Email</label>
                    <div>{ViewLead && ViewLead[0]?.email}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Website</label>
                    <div>{ViewLead && ViewLead[0]?.website}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Lead Source</label>
                    <div>{ViewLead && ViewLead[0]?.lead_source}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Business Presence</label>
                    <div>{ViewLead && ViewLead[0]?.business_presence}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Business Nature</label>
                    <div>{ViewLead && ViewLead[0]?.business_nature}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewLead;