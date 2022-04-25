import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../components/Upload';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import ViewCustomer from './viewcustomer';
import GeneralInfo from './TabPages/generalInfo';
import AddressInfo from './TabPages/addressInfo';
import KycDeatils from './TabPages/kycDetails';
import ContactPerson from './TabPages/contactPerson';
import Documents from './TabPages/documents';
import OverView from './TabPages/overView';


export default function AddCustomer(props) {
    const params = new URLSearchParams(props.location.search);
    const [activeId, setActiveId] = useState('0');
    const [userId, setUserId] = useState();

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo customerId={params.get("user_id")} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        { icon: <CheckCircle />, title: 'Address Details', description: <AddressInfo customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        { icon: <CheckCircle />, title: 'KYC Details', description: <KycDeatils customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        { icon: <CheckCircle />, title: 'Contact Details', description: <ContactPerson customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        { icon: <CheckCircle />, title: 'Documents', description: <Documents customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        // { icon: <CheckCircle />, title: 'Overview', description: <OverView customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
    ]
    
    const handleChange = (data, id) =>{
        setActiveId(data);
        setUserId(id);
    }

    console.log(userId, 'userId')

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Master"} subTitle='Customer' heading={'Customer Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} handleChange={(data)=>handleChange(data)} activeKey={activeId} />
        </div>
    );
}