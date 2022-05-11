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
import GeneralInfo from './TabPages/generalInfo';



export default function AddDimension(props) {
    const params = new URLSearchParams(props.location.search);
    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo  dimensionId={params.get("user_id")} dimensionName={params.get("dimensionName")}  /> },
      
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Master"} subTitle='Dimension' heading={'Dimension Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} />
        </div>
    );
}