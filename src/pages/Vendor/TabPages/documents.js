import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';


export default function Documents() {
    let history = useHistory();
    const Description= [
        {description: 'This page is used to upload all key documents for this vendor which is required for furture reference.'},
        {description: 'Sample identity document(s) required for business - AEO Certificate, MSDS Document, ISO Cert, DG Cert etc….'},
        {description: 'Upload Clear and not Blurry'},
        {description: 'Maximum 1.2 MB in size'},
        {description: 'Any one of these formats: .png, .jpeg, .Doc, .xls .and .pdf.'},
        {description: 'Do not include special characters in the file name (examples: $, &, or #)'},

    ]

    const uploadFileList = [
        { file: 'Document1.pdf' },
        { file: 'Document2.pdf' },
        { file: 'Document3.pdf' },
        { file: 'Document4.pdf' },
        { file: 'Document5.pdf' },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
               
                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <div className='uploadDescription'>
                        {Description.map((val)=>{
                            return (
                                <div className='uploadContent'>
                                    <div className='startIcon'><StarPurple500Icon /></div>
                                    <div className='uploadData'>{val.description}</div>
                                </div>
                            )
                        })}

                    </div>
                </Grid>
                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Documents' />
                </Grid>
                {uploadFileList.map((val) => {
                    return (
                        <Grid item xs={12} md={12} sx={12} sm={12}>
                            <div className='uploadFiles'>{val.file}</div>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn />
            </Grid>
        </div>
    );
}