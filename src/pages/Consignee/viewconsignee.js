import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewConsigneeDetails } from '../../Redux/Action/GeneralGroupAction/consigneeAction';
import { useDispatch, useSelector } from 'react-redux'


const ViewConsignee = ({ GetId }) => {   
    let dispatch = useDispatch();
    const ViewConsignee = useSelector((state) => state.ConsigneeReducer.ViewConsigneeDetails);

    useEffect(() => {
        dispatch(ViewConsigneeDetails(GetId))
    }, [])

    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Consignee ID</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Company Name</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.company_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Buyer</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.buyer}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Salutation</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.primary_salute}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">First Name</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.primary_first_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Last Name</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.primary_second_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Designation</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.designation}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Department</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.department}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.phone}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Email</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.email}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Website</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.website}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Business Nature</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.business_nature_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address1</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.address1}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Address2</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.address2}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.country_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.state_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.city_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Zip Code</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.zip_code}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Phone2</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.phone2}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Fax</label>
                    <div>{ViewConsignee && ViewConsignee[0]?.fax}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewConsignee;