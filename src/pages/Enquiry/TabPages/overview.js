import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import FooterBtn from '../../../components/FooterButtons';
import '../customer.css';


// import './customer.css';

export default function OverView() {
    let history = useHistory()
    const onSubmit = () => {
        history.push("/customer");
    }

    const CustomerDetails = [
        {
            mainHeading: 'CUSTOMER DETAILS', fields: [
                { labelname: 'Customer Type', value: '676' },
                { labelname: 'Customer Name', value: 'fname' },
                { labelname: 'Contact Person', value: 'lname' },
                { labelname: 'Designation', value: 'customerName' },
                { labelname: 'Phone No', value: 'phone' },
                { labelname: 'Mobile No', value: 'mobile' },
                { labelname: 'Email', value: 'mail' },
                { labelname: 'Address', value: 'street2' },
                { labelname: 'State', value: 'state' },
                { labelname: 'City', value: 'city' },
                { labelname: 'Country', value: 'country' },
            ]
        },
        {
            mainHeading: 'SHIPMENT DETAILS', fields: [
                { labelname: 'Origin', value: 'address' },
                { labelname: 'Designation', value: 'country' },
                { labelname: 'Commodity', value: 'street1' },
                { labelname: 'Shipment Team', value: 'street2' },
                { labelname: 'Nature of Clearance', value: 'state' },
                { labelname: 'Cargo Types', value: 'city' },
                { labelname: 'Package Type', value: 'zip' },
                { labelname: 'No of Packages', value: 'phone' },
                { labelname: 'No of Containers', value: 'fax' },
                { labelname: 'Gross Wt', value: 'mail' },
                { labelname: 'Net Wt', value: 'street2' },
                { labelname: 'Dimension Wt', value: 'state' },
                { labelname: 'Volumetric Wt', value: 'city' },
                { labelname: 'Chargable Wt', value: 'country' },
                { labelname: 'Pickup Location', value: 'mail' },
                { labelname: 'Drop Location', value: 'street2' },
                { labelname: 'Vehicle Type', value: 'state' },
                { labelname: 'Types of VAS', value: 'city' },
                { labelname: 'Remarks', value: 'country' },
                { labelname: 'Enquiry Status', value: 'mail' },
                { labelname: 'Enquiry Cut of Date', value: 'street2' },
                { labelname: 'Reason', value: 'state' },
            ]
        },
        {
            mainHeading: 'RATE REQUEST', fields: [
                { labelname: 'Vendor Type', value: 'pan' },           

            ]
        },
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