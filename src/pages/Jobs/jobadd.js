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
import ShipmentDetails from './TabPages/shipmentDetails';
import CargoDetails from './TabPages/cargoDetails';
import TransportDetails from './TabPages/transportDetails'
import ServiceDetails from './TabPages/serviceDetails';
import InvoiceMainDetails from './TabPages/invoiceMain';

export default function AddJobs() {
    const [MenuList, setMenuList] = useState('shipperInvoice')


    const tabArray = [
        {
            icon: <CheckCircle />, title: 'Job Details', description: <GeneralInfo />, actionVal: []
        },
        {
            icon: <CheckCircle />, title: 'Shipment Details', description: <ShipmentDetails />, actionVal: []
        },
        {
            icon: <CheckCircle />, title: 'Cargo Details', description: <CargoDetails />, actionVal: []
        },
        {
            icon: <CheckCircle />, title: 'Transport Details', description: <TransportDetails />, actionVal: []
        },
        {
            icon: <CheckCircle />, title: 'Service Details', description: <ServiceDetails />, actionVal: []
        },

        {
            icon: <CheckCircle />, title: 'Invoice Main', description: <InvoiceMainDetails MenuList={MenuList} />, actionVal: [
                { id: 'shipperInvoice', value: 'Shipper Invoice' },
                { id: 'ff', value: 'FF' },
                { id: 'cha', value: 'CHA' },
                { id: 'transporter', value: 'Transporter' },
                { id: 'surveyor', value: 'Surveyor' },
                { id: 'fumigation', value: 'Fumigation' },
                { id: 'quarantine', value: 'Quarantine' },
                { id: 'pallatization', value: 'Pallatization' },
            ]
        },
    ]

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader mainTitle={"Shipment"} subTitle='Jobs' heading={'Jobs Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} getMenuValue={(data)=>setMenuList(data)} />
        </div>
    );
}