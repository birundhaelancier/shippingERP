import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ViewCustomerDetails } from '../../Redux/Action/GeneralGroupAction/customerAction';



// import './customer.css';

export default function ViewCustomer({ GetId }) {
    let history = useHistory();
    let dispatch = useDispatch();

    const ViewCustomer = useSelector((state) => state?.CustomerReducer?.ViewCustomerDetails);

    useEffect(() => {
        dispatch(ViewCustomerDetails(GetId))
    }, [])

    const [generalDetails, setgeneralDetails] = useState({
        company_name: "Company Name",
        primary_salute: "Salutation",
        primary_first_name: "First Name",
        primary_second_name: "Last Name",
        business_nature: "Business Nature",
        mobile: "Mobile",
        phone: "Phone",
        email: "Email",
        designation: "Designation",
        department: "Department",
        website: "Website",
    })
    const [addressDetails, setaddressDetails] = useState({
        address_type: "Address Type",
        address1: "Salutation",
        address2: "First Name",
        country: "Country",
        state: "State",
        city: "City",
        phone: "Phone",
        zip_code: "Zip Code",
        fax: "Fax",
    })

    const [kycDetails, setkycDetails] = useState({
        pan_no: "Pan No",
        pan_image: "Pan Image",
        cin_no: "Cin No",
        cin_image: "Cin Image",
        msme_reg: "MSME No",
        msme_image: "MSME Image",
        iec_reg: "IEC No",
        iec_image: "IEC Image",
    })

    const [gstDetails, setgstDetails] = useState({
        gst_state: "Gst State",
        gst_reg: "Gst No",
        gst_image: "Gst Image",
    })

    const [contactDetails, setcontactDetails] = useState({
        salute: "Salutation",
        first_name: "First Name",
        second_name: "Last Name",
        country_name: "Country",
        state_name: "State",
        city_name: "City",
        mobile: "Mobile",
        phone: "Phone",
        email: "Email",
        designation: "Designation",
        department: "Department",
    })
    let url = 'https://elancier.xyz/shipping_erp/public/upload/customers/';

    const arr = ['pan_image', 'iec_image', 'cin_image', 'msme_image', 'gst_image']

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>GENERAL INFORMATION</div>
                    </Grid>
                    {Object.keys(generalDetails).map((data) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{generalDetails[data]}</label>
                                <div>{ViewCustomer.length > 0 && ViewCustomer[0][data]}</div>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>ADDRESS INFORMATION</div>
                    </Grid>
                    {ViewCustomer.length > 0 && ViewCustomer[0]?.address.map((item) => {
                        return (
                            <>
                                {Object.keys(addressDetails).map((data) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            <label className="labeltxtView">{addressDetails[data]}</label>
                                            <div>{item[data]}</div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )
                    })}
                </Grid>
                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>KYC INFORMATION</div>
                    </Grid>
                    {Object.keys(kycDetails).map((data) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{kycDetails[data]}</label>
                                <div>{ViewCustomer[0] != undefined && arr.includes(data) ? ViewCustomer[0] != undefined && ViewCustomer[0][data]?.replace(url, ' ') : ViewCustomer[0] != undefined && ViewCustomer[0][data] ? ViewCustomer[0][data] : null}</div>
                            </Grid>
                        )
                    })}
                    {ViewCustomer.length > 0 && ViewCustomer.map((item) => {
                        return (
                            <>
                                {Object.keys(item).map((data) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            <label className="labeltxtView">{kycDetails[data]}</label>
                                            <div>{ item[data] && arr.includes(data) ? item[data] && item[data].replace(url, ' ') : item[data] && item[data]}</div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )
                    })}
                    {ViewCustomer.length > 0 && ViewCustomer[0]?.gst.map((item) => {
                        return (
                            <>
                                {Object.keys(gstDetails).map((data) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            <label className="labeltxtView">{gstDetails[data]}</label>
                                            <div>{arr.includes(data) ? item[data].replace(url, ' ') : item[data]}</div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )
                    })}

                </Grid>
                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>CONTACT INFORMATION</div>
                    </Grid>
                    {ViewCustomer.length > 0 && ViewCustomer[0]?.contact.map((item) => {
                        return (
                            <>
                                {Object.keys(contactDetails).map((data) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            <label className="labeltxtView">{contactDetails[data]}</label>
                                            <div>{item[data]}</div>
                                        </Grid>
                                    )
                                })}
                            </>
                        )
                    })}
                </Grid>
                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>DOCUMENTS INFORMATION</div>
                    </Grid>
                    {ViewCustomer.length > 0 && ViewCustomer[0]?.documents.map((item, index) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{`Documnet${index + 0}`}</label>
                                <div>{item.document_name}</div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid >
        </div >
    );
}