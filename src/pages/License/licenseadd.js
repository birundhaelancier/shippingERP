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
import ViewLicense from './viewlicense';
import GeneralInfo from './TabPages/generalInfo';



export default function AddLicense() {

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo /> },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: '' },
        { icon: '', title: '', description: ''},
        // { icon: '', title: 'Payments Terms', description: 'de65' },
        { icon: '', title: '', description: '' },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Master"} subTitle='License' heading={'License Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}