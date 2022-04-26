import react,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { useDispatch,useSelector } from 'react-redux'
import { ViewLicenseDetails } from '../../Redux/Action/EnquiryGroupAction/LicenceAction'
// import './customer.css';

const ViewCountry = ({GetId}) => {
    let dispatch=useDispatch()
    const ViewList = useSelector((state) => state.LicenseReducer.ViewLicenseDetails);
    useEffect(() => {
        dispatch(ViewLicenseDetails(GetId))
    }, [GetId])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License ID</label>
                    <div>{ViewList[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Registration No</label>
                    <div>{ViewList[0]?.reg_no}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Registration Date</label>
                    <div>{ViewList[0]?.reg_date}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Type</label>
                    <div>{ViewList[0]?.type}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Item No</label>
                    <div>{ViewList[0]?.item_no}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Unit Qty</label>
                    <div>{ViewList[0]?.unit_qty}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Port Of License</label>
                    <div>{ViewList[0]?.part_license}</div>
                </Grid>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Total CIF Value</label>
                    <div>{ViewList[0]?.cif_value}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Total Debit Duty</label>
                    <div>{ViewList[0]?.debit_duty}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Total Debit Qty</label>
                    <div>{ViewList[0]?.debit_qty}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Total FC Value</label>
                    <div>{ViewList[0]?.fc_value}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency Symbol</label>
                    <div>{ViewList[0]?.currency_sym}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Currency </label>
                    <div>{ViewList[0]?.currency}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exchange Rate</label>
                    <div>{ViewList[0]?.exchange_rate}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Party Name</label>
                    <div>{ViewList[0]?.party_name}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Description</label>
                    <div>{ViewList[0]?.description}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License No</label>
                    <div>{ViewList[0]?.license_no}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Date</label>
                    <div>{ViewList[0]?.license_date}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCountry;