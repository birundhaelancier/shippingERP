import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import ContentHeader from '../../components/ContentHeader';
import {  CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import ViewCustomerBusiness from './viewcustomerBusiness';
import GeneralInfo from './TabPages/generalInfo';
import { AddContry, ViewCountryDetails } from '../../Redux/Action/GeneralGroupAction/countryAction';

export default function AddCustomerBusiness(props) {
    let dispatch = useDispatch();
    const params = new URLSearchParams(props.location.search);

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo customerBusinessId={params.get("user_id")} /> },
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
                <ContentHeader mainTitle={"Master"} subTitle='Customer Business' heading={'Customer Business Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}