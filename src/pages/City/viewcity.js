import react, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';

import { ViewCityDetails } from '../../Redux/Action/GeneralGroupAction/cityAction';
import { useDispatch, useSelector } from 'react-redux'

const ViewCountry = ({GetId}) => {
    let dispatch = useDispatch();
    const ViewCity = useSelector((state) => state.CityReducer.ViewCityDetails);

    useEffect(() => {
        dispatch(ViewCityDetails(GetId))
    }, [])
    console.log(ViewCity, 'ViewCity')
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City ID</label>
                    <div>{ViewCity && ViewCity[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">City Name</label>
                    <div>{ViewCity && ViewCity[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">State Name</label>
                    <div>{ViewCity && ViewCity[0]?.state_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewCity && ViewCity[0]?.country_name}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewCity && ViewCity[0]?.status === 1 ? "Active" : "In-Active"}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCountry;