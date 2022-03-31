import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import ViewSeaport from './viewseaport';
import GeneralInfo from './TabPages/generalInfo';



export default function AddCity() {

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo /> },
        { icon: <CheckCircle />, title: '', description: '' },
        { icon: <CheckCircle />, title: '', description: '' },
        { icon: <CheckCircle />, title: '', description: '' },
        { icon: <CheckCircle />, title: '', description: ''},
        // { icon: <CheckCircle />, title: 'Payments Terms', description: 'de65' },
        { icon: <CheckCircle />, title: '', description: '' },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Master"} subTitle='Seaport' heading={'Seaport Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}