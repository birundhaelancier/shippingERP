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
import ViewVendor from './viewvendor';
import GeneralInfo from './TabPages/generalInfo';
import AddressInfo from './TabPages/addressInfo';
import KycDeatils from './TabPages/kycDetails';
import ContactPerson from './TabPages/contactPerson';
import Documents from './TabPages/documents';
import OverView from './TabPages/overView';


export default function AddVendor() {

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo /> },
        { icon: <CheckCircle />, title: 'Address Details', description: <AddressInfo /> },
        { icon: <CheckCircle />, title: 'KYC Details', description: <KycDeatils /> },
        { icon: <CheckCircle />, title: 'Contact Details', description: <ContactPerson /> },
        { icon: <CheckCircle />, title: 'Documents', description: <Documents /> },
        // { icon: <CheckCircle />, title: 'Payments Terms', description: 'de65' },
        { icon: <CheckCircle />, title: 'Overview', description: <OverView /> },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Master"} subTitle='Vendor' heading={'Vendor Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}