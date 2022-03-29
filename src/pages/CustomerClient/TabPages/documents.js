import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../../components/ContentHeader';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import AddFieldsBtn from '../../../components/AddFieldsBtn';

export default function Documents() {
    let history = useHistory()
  
    const onSubmit = () => {
        history.push("/customer");
    }

    return (
        <div>
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Documents' />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Submit" custombtnCSS="Primary" onBtnClick={() => onSubmit()} />
                </Grid>
                <Grid item xs={6} md={2} sx={6} sm={6}>
                    <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                </Grid>
            </Grid>
        </div>
    );
}