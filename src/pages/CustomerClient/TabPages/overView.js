import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { Edit } from '@mui/icons-material';


// import './customer.css';

export default function OverView() {
    let history = useHistory()
    const onSubmit = () => {
        history.push("/customer");
    }

    const CustomerDetails = [
        {
            mainHeading: 'GENERAL INFORMATION', fields: [
                { labelname: 'Customer Id', value: '' },
                { labelname: 'First Name', value: '' },
                { labelname: 'Last Name', value: '' },
                { labelname: 'Customer Name', value: '' },
                { labelname: 'Business Nature', value: '' },
                { labelname: 'Customer Email', value: '' },
                { labelname: 'Work Phone', value: '' },
                { labelname: 'Mobile', value: '' },
                { labelname: 'Website', value: '' },
            ]
        },
        {
            mainHeading: 'ADDRESS', fields: [
                { labelname: 'Address Type', value: '' },
                { labelname: 'Country', value: '' },
                { labelname: 'Street1', value: '' },
                { labelname: 'Street2', value: '' },
                { labelname: 'State', value: '' },
                { labelname: 'City', value: '' },
                { labelname: 'Zip Code', value: '' },
                { labelname: 'Phone', value: '' },
                { labelname: 'Fax', value: '' },
            ]
        },
        {
            mainHeading: 'KYC DETAILS', fields: [
                { labelname: 'Pan Number', value: '' },
                { labelname: 'Pan Image', value: '' },
                { labelname: 'CIN Registration', value: '' },
                { labelname: 'CIN Image', value: '' },
                { labelname: 'MSME Registration', value: '' },
                { labelname: 'MSME Image', value: '' },
                { labelname: 'IEC Number', value: '' },
                { labelname: 'IEC Image', value: '' },
                { labelname: 'GST State', value: '' },
                { labelname: 'GST Registration', value: '' },
                { labelname: 'GST Image', value: '' },

            ]
        },
        {
            mainHeading: 'CONTACT DETAILS', fields: [
                { labelname: 'Salutation', value: '' },
                { labelname: 'First Name', value: '' },
                { labelname: 'Last Name', value: '' },
                { labelname: 'Email Address', value: '' },
                { labelname: 'Work Phone', value: '' },
                { labelname: 'Mobile', value: '' },
                { labelname: 'Designation', value: '' },
                { labelname: 'Department', value: '' },
                { labelname: 'Skype Id', value: '' },

            ]
        }


    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                {CustomerDetails.map((data) => {
                    return (
                        <>
                            <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                                <div className='subHeading'>{data.mainHeading}</div>
                                <div className='add_icons'><Edit /></div>
                            </Grid>
                            {data.fields.map((items) => {
                                return (
                                    <Grid item xs={12} md={4} sx={12} sm={12}>
                                        <Labelbox show type="text"
                                            labelname={items.labelname}
                                            value={items.value}
                                        />
                                    </Grid>
                                )
                            })}
                        </>

                    )
                })}
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