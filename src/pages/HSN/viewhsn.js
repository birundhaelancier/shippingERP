import React,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { useSelector,useDispatch } from 'react-redux'
import { ViewHsnDetails } from '../../Redux/Action/EnquiryGroupAction/HsnAction'
// import './customer.css';

const ViewHsn = ({GetId}) => {
let dispatch=useDispatch()
const ViewSeaList = useSelector((state) => state.HsnReducer.ViewHsnDetails);
useEffect(() => {
    dispatch(ViewHsnDetails(GetId))
}, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Transaction Type</label>
                    <div>{ViewSeaList[0]?.type==2?"Export":"Import"}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Section Name</label>
                    <div>{ViewSeaList[0]?.section_name}</div>
                </Grid>              
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Chapter Name</label>
                    <div>{ViewSeaList[0]?.chapter_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">HSN Code</label>
                    <div>{ViewSeaList[0]?.hsn_code}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Description</label>
                    <div>{ViewSeaList[0]?.description}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Unit</label>
                    <div>{ViewSeaList[0]?.unit}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Rate of Duty Standard</label>
                    <div>{ViewSeaList[0]?.rate_standard}</div>
                </Grid>
            
                <Grid item xs={12} md={6} sx={12} sm={12}>
                    <label className="labeltxt">Rate of Duty Preferential</label>
                    <div>{ViewSeaList[0]?.rate_preferential}</div>
                </Grid>
           
                <Grid item xs={12} md={6} sx={12} sm={12}>
                <label className="labeltxt">Section Description</label>
                    <div>{ViewSeaList[0]?.section_description}</div>
                </Grid> 
                <Grid item xs={12} md={6} sx={12} sm={12}>
                <label className="labeltxt">Chapter Description</label>
                    <div>{ViewSeaList[0]?.chapter_description}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewHsn;