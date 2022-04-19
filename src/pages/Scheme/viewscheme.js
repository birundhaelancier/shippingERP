import react,{useEffect} from 'react'
import Grid from '@mui/material/Grid';
import CustomButton from '../../components/Button';
import { ViewSchemaDetails } from '../../Redux/Action/EnquiryGroupAction/SchemaActions'
import { useSelector,useDispatch } from 'react-redux'
// import './customer.css';

const ViewCountry = ({GetId}) => {
    let dispatch=useDispatch()
    const ViewSchemaList = useSelector((state) => state.SchemaReducer.ViewSchemaList);
    useEffect(() => {
        dispatch(ViewSchemaDetails(GetId))
    }, [])
    console.log("check,",ViewSchemaList)
    return (
        <>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Schema ID</label>
                    <div>{ViewSchemaList[0]?.id}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Schema Code</label>
                    <div>{ViewSchemaList[0]?.code}</div>
                </Grid>
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">License Required</label>
                    <div>{ViewSchemaList[0]?.license}</div>
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <label className="labeltxt">Deescription</label>
                    <div>{ViewSchemaList[0]?.description}</div>
                </Grid>
{/* 
                <Grid item xs={12} md={3} sx={12} sm={12}>
                    <label className="labeltxt">Active Status</label>
                    <div>{ViewSchemaList[0]?.description}</div>
                </Grid> */}
            </Grid>
        </>
    )
}

export default ViewCountry;