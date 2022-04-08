import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import FooterBtn from '../../../components/FooterButtons';
import '../../customer.css';


// import './customer.css';

export default function OverView() {
    let history = useHistory()
    const onSubmit = () => {
        history.push("/customer");
    }

    const CustomerDetails = [
        {
            mainHeading: 'GENERAL INFORMATION', fields: [
                { labelname: 'First Name', value: 'fname' },
                { labelname: 'Last Name', value: 'lname' },
                { labelname: 'Customer Name', value: 'customerName' },
                { labelname: 'Business Nature', value: 'businessNature' },
                { labelname: 'Email', value: 'mail' },
                { labelname: 'Phone', value: 'phone' },
                { labelname: 'Mobile', value: 'mobile' },
                { labelname: 'Website', value: 'web' },
            ]
        },
        {
            mainHeading: 'ADDRESS', fields: [
                { labelname: 'Address Type', value: 'address' },
                { labelname: 'Country', value: 'country' },
                { labelname: 'Street1', value: 'street1' },
                { labelname: 'Street2', value: 'street2' },
                { labelname: 'State', value: 'state' },
                { labelname: 'City', value: 'city' },
                { labelname: 'Zip Code', value: 'zip' },
                { labelname: 'Phone', value: 'phone' },
                { labelname: 'Fax', value: 'fax' },
            ]
        },
        {
            mainHeading: 'KYC DETAILS', fields: [
                { labelname: 'Pan Number', value: 'pan' },
                { labelname: 'Pan Image', value: 'image' },
                { labelname: 'CIN Registration', value: 'cin' },
                { labelname: 'CIN Image', value: 'image' },
                { labelname: 'MSME Registration', value: 'msme' },
                { labelname: 'MSME Image', value: 'image' },
                { labelname: 'IEC Number', value: 'iec' },
                { labelname: 'IEC Image', value: 'image' },
                { labelname: 'GST State', value: 'state' },
                { labelname: 'GST Registration', value: 'gst' },
                { labelname: 'GST Image', value: 'image' },

            ]
        },
        {
            mainHeading: 'Documents', fields: [
                { labelname: 'Document1', value: 'document01.pdf' },
                { labelname: 'Document2', value: 'document02.pdf' },
                { labelname: 'Document3', value: 'document03.pdf' },
                { labelname: 'Document4', value: 'document04.pdf' },


            ]
        },
        {
            mainHeading: 'CONTACT DETAILS', fields: [
                { labelname: 'Salutation', value: 'sal' },
                { labelname: 'First Name', value: 'fname' },
                { labelname: 'Last Name', value: 'lname' },
                { labelname: 'Email', value: 'email' },
                { labelname: 'Phone', value: 'phone' },
                { labelname: 'Mobile', value: 'mobile' },
                { labelname: 'Designation', value: 'designation' },
                { labelname: 'Department', value: 'department' },
                { labelname: 'Skype Id', value: 'skypeId' },

            ]
        }


    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                {CustomerDetails.map((data) => {
                    return (
                        // <div className='cardView'>
                        <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                            <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                                <div className='subHeading'>{data.mainHeading}</div>
                                <div className='add_icons'><Edit /></div>
                            </Grid>
                            {
                                data.fields.map((items) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            {/* <Grid item xs={12} md={3} sx={12} sm={12}> */}
                                            
                                            <label className="labeltxtView">{items.labelname}</label>
                                            <div>{items.value}</div>
                                            {/* </Grid> */}
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                        // </div>

                    )
                })}
            </Grid >
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn backBtn saveBtn={'Submit'} />
            </Grid>
        </div >
    );
}