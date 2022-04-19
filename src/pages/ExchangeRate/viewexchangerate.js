import react,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { ViewRateDetails } from '../../Redux/Action/GeneralGroupAction/RateAction'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
// import './customer.css';

const ViewExchangeRate = ({GetId}) => {
    let dispatch=useDispatch()
    const ViewRateList = useSelector((state) => state.RateReducer.ViewRateList);
    useEffect(() => {
        dispatch(ViewRateDetails(GetId))
    }, [])
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exchange Id</label>
                    <div>{ViewRateList[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Currency Id</label>
                    <div>{ViewRateList[0]?.currency}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Country Name</label>
                    <div>{ViewRateList[0]?.country_name}</div>
                </Grid>
          
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Exchange Rate</label>
                    <div>{ViewRateList[0]?.exchange_rate}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Date</label>
                    <div>{moment(ViewRateList[0]?.d_date).format("DD-MM-YYYY")}</div>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewExchangeRate;