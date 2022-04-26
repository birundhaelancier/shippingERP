import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ViewVendorDetails } from '../../../Redux/Action/GeneralGroupAction/VendorAction';
import { Edit } from '@mui/icons-material';
import FooterBtn from '../../../components/FooterButtons';



// import './Vendor.css';

export default function OverView({ GetId, handleActivekey }) {
    let history = useHistory();
    let dispatch = useDispatch();

    const ViewVendor = useSelector((state) => state?.VendorReducer?.ViewVendorDetails);

    useEffect(() => {
        dispatch(ViewVendorDetails(GetId))
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
    let url = 'https://elancier.xyz/shipping_erp/public/upload/Vendors/';

    const arr = ['pan_image', 'iec_image', 'cin_image', 'msme_image', 'gst_image']

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>GENERAL INFORMATION</div>
                        <div className='add_icons' onClick={() => handleActivekey('0')}><Edit /></div>

                    </Grid>
                    {Object.keys(generalDetails).map((data) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{generalDetails[data]}</label>
                                <div>{ViewVendor.length > 0 && ViewVendor[0][data]}</div>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid item xs={12} spacing={2} direction="row" container className='cardView'>
                    <Grid item xs={12} md={12} sx={12} sm={12} direction="row" justifyContent='space-between' container>
                        <div className='subHeading'>ADDRESS INFORMATION</div>
                        <div className='add_icons' onClick={() => handleActivekey('1')}><Edit /></div>

                    </Grid>
                    {ViewVendor.length > 0 && ViewVendor[0]?.address.map((item) => {
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
                        <div className='add_icons' onClick={() => handleActivekey('2')} ><Edit /></div>

                    </Grid>
                    {Object.keys(kycDetails).map((data) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{kycDetails[data]}</label>
                                <div>{ViewVendor.length > 0 && arr.includes(data) ? ViewVendor[0][data]?.split("_")[ViewVendor[0][data]?.split("_").length - 1] : ViewVendor[0][data]}</div>
                            </Grid>
                        )
                    })}
                    {ViewVendor.length > 0 && ViewVendor[0]?.gst.map((item) => {
                        return (
                            <>
                                {Object.keys(gstDetails).map((data) => {
                                    return (
                                        <Grid item xs={12} md={3} sx={12} sm={12}>
                                            <label className="labeltxtView">{gstDetails[data]}</label>
                                            <div>{arr.includes(data) ? item[data]?.split("_")[item[data]?.split("_").length - 1] : item[data]}</div>
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
                        <div className='add_icons' onClick={() => handleActivekey('3')}><Edit /></div>

                    </Grid>
                    {ViewVendor.length > 0 && ViewVendor[0]?.contact.map((item) => {
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
                        <div className='add_icons' onClick={() => handleActivekey('4')}><Edit /></div>

                    </Grid>
                    {ViewVendor.length > 0 && ViewVendor[0]?.documents.map((item, index) => {
                        return (
                            <Grid item xs={12} md={3} sx={12} sm={12}>
                                <label className="labeltxtView">{`Documnet${index + 0}`}</label>
                                <div>{item.document_name}</div>
                            </Grid>
                        )
                    })}
                </Grid>

                <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                    <FooterBtn backBtn saveBtn={'Submit'} onSaveBtn={() => history.push('/vendor')} />
                </Grid>
            </Grid >
        </div >
    );
}