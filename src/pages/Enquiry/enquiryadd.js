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
// import ViewEnquiry from './viewEnquiry';
import CustomerDetails from './TabPages/customerDetails';
import ShipmentDetails from './TabPages/shipmentDetails';
import RateRequest from './TabPages/rateRequest';
import OverView from './TabPages/overview';


export default function AddJobs() {

    const tabArray = [
        { icon: <CheckCircle />, title: 'Customer Details', description: <CustomerDetails /> },
        { icon: <CheckCircle />, title: 'Shipment Details', description: <ShipmentDetails /> },
        { icon: <CheckCircle />, title: 'Overview', description: <OverView /> },
        { icon: <CheckCircle />, title: 'Rate Request', description: <RateRequest /> },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Shipment"} subTitle='Enquiry' heading={'Enquiry Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}