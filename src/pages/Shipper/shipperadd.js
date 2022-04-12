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
import ViewShipper from './viewshipper';
import GeneralInfo from './TabPages/generalInfo';
import AddressInfo from './TabPages/addressInfo';

export default function AddShipper() {

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo /> },
        { icon: <CheckCircle />, title: 'Address Details', description: <AddressInfo /> },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Master"} subTitle='Shipper' heading={'Shipper Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}