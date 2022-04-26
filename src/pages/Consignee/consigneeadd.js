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
import ViewConsignee from './viewconsignee';
import GeneralInfo from './TabPages/generalInfo';
import AddressInfo from './TabPages/addressInfo';

export default function AddConsignee(props) {
    const params = new URLSearchParams(props.location.search);
    const [activeId, setActiveId] = useState('0');
    const [userId, setUserId] = useState();

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo consigneeId={params.get("user_id")} handleActivekey={(data, id)=>handleChange(data, id)} /> },
        { icon: <CheckCircle />, title: 'Address Details', description: <AddressInfo consigneeId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
    ]

    const handleChange = (data, id) =>{
        setActiveId(data);
        setUserId(id);
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Master"} subTitle='Consignee' heading={'Consignee Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} handleChange={(data)=>handleChange(data)} activeKey={activeId} />
        </div>
    );
}