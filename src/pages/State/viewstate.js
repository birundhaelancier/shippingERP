import react, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { ViewStateDetails } from '../../Redux/Action/stateAction';
import { useDispatch, useSelector } from 'react-redux'

// import './customer.css';

const ViewStates = ({ GetId }) => {
    let dispatch = useDispatch();
    const ViewState = useSelector((state) => state.StateReducer.ViewStateDetails);

    useEffect(() => {
        dispatch(ViewStateDetails(GetId))
    }, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State ID</label>
                    <div>{ViewState && ViewState[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State Name</label>
                    <div>{ViewState && ViewState[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewState && ViewState[0]?.country_name}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewState && ViewState[0]?.status === 1 ? "Active" : "In-Active"}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewStates;