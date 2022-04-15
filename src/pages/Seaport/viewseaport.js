import react,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
// import './customer.css';
import { ViewSeaPortDetails } from '../../Redux/Action/EnquiryGroupAction/Seaports' 
import { useDispatch, useSelector } from 'react-redux'
const ViewCountry = ({GetId}) => {
    let dispatch=useDispatch()
const ViewSeaList = useSelector((state) => state.SeaPortReducer.ViewSeaDetails);
useEffect(() => {
    dispatch(ViewSeaPortDetails(GetId))
}, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Port ID</label>
                    <div>{ViewSeaList[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Port Name</label>
                    <div>{ViewSeaList[0]?.name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Port Code</label>
                    <div>{ViewSeaList[0]?.code}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country ID</label>
                    <div>{ViewSeaList[0]?.country}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewSeaList[0]?.country_name}</div>
                </Grid>
                {/* <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Default</label>
                    <div>2</div>
                </Grid> */}
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewSeaList[0]?.status===1?"Active":"In-Active"}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCountry;