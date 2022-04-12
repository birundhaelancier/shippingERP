import react, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { ViewCountryDetails } from '../../Redux/Action/countryAction';
import { useDispatch, useSelector } from 'react-redux'

// import './customer.css';

const ViewCountry = ({ GetId }) => {
    let dispatch = useDispatch();
    const [countryDetails, setCountryDetails] = useState([])
    const ViewCountry = useSelector((state) => state.CountryReducer.ViewCountryDetails);

    useEffect(() => {
        dispatch(ViewCountryDetails(GetId))
    }, [])

    useEffect(() => {
        if (ViewCountry) {
            setCountryDetails(ViewCountry)
        }
    }, [ViewCountry])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country ID</label>
                    <div>{ViewCountry[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewCountry[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Code</label>
                    <div>{ViewCountry[0]?.code}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewCountry[0]?.status}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCountry;