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
// import ViewEnquiry from './viewEnquiry';
import EnquiryDetails from './TabPages/enquiryDetails';
import FreightDetails from './TabPages/freightDetails';
import TransportDetails from './TabPages/transportDetails';
import OverViewDetails from './TabPages/customDetails';
import RebateDetails from './TabPages/rebateDetails';
import QuotationStatus from './TabPages/quotationStatus';
import { useDispatch, useSelector } from 'react-redux';


export default function AddJobs(props) {
    const params = new URLSearchParams(props.location.search);
    let dispatch = useDispatch();
    const [activeId, setActiveId] = useState('0');
    const [userId, setUserId] = useState();
    const [getType, setGetType] = useState();
    const ViewCustomer = useSelector((state) => state.CustomerReducer.ViewCustomerDetails);
    const tabArray = [
        { icon: <CheckCircle />, title: 'Quote Details', description: <EnquiryDetails getShipmentType={(data) => setGetType(data)} /> },
        { icon: <CheckCircle />, title: 'Freight Forwarding', description: <FreightDetails getType={getType} /> },
        { icon: <CheckCircle />, title: 'Custom Clearance', description: <OverViewDetails /> },
        { icon: <CheckCircle />, title: 'Transportation', description: <TransportDetails /> },
        { icon: <CheckCircle />, title: 'Rebate', description: <RebateDetails /> },
        { icon: <CheckCircle />, title: 'Quotation Status', description: <QuotationStatus /> },
    ]


    const handleChange = (data, id) => {
        setActiveId(data);
        setUserId(id);
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Shipment"} subTitle='Quotation' heading={'Quotation Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} handleChange={(data) => handleChange(data)} activeKey={activeId} />
        </div>
    );
}