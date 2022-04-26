import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { useDispatch, useSelector } from 'react-redux';

import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../components/CustomTab';
import ViewCustomer from './viewcustomer';
import GeneralInfo from './TabPages/generalInfo';
import AddressInfo from './TabPages/addressInfo';
import KycDeatils from './TabPages/kycDetails';
import ContactPerson from './TabPages/contactPerson';
import Documents from './TabPages/documents';
import { ViewCustomerDetails } from '../../Redux/Action/GeneralGroupAction/customerAction';
import OverView from './TabPages/overView';



export default function AddCustomer(props) {
    const params = new URLSearchParams(props.location.search);
    let dispatch = useDispatch();
    const [activeId, setActiveId] = useState('0');
    const [userId, setUserId] = useState();
    const ViewCustomer = useSelector((state) => state.CustomerReducer.ViewCustomerDetails);


    useEffect(() => {
        dispatch(ViewCustomerDetails(params.get("user_id") ? params.get("user_id") : userId))
    }, [userId, params.get("user_id")])

    const tabArray = [
        { icon: <CheckCircle />, title: 'General Info', description: <GeneralInfo customerId={params.get("user_id")} handleActivekey={(data, id) => handleChange(data, id)} /> },

        { icon: <CheckCircle />, title: 'Address Details', description: <AddressInfo customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id) => handleChange(data, id)} disabledTab={true} /> },

        { icon: <CheckCircle />, title: 'KYC Details', description: <KycDeatils customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id) => handleChange(data, id)} disabledTab={ViewCustomer && ViewCustomer[0]?.address.length > 0 ? false : true} /> },

        { icon: <CheckCircle />, title: 'Contact Details', description: <ContactPerson customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id) => handleChange(data, id)} disabledTab={ViewCustomer && ViewCustomer[0]?.address.length > 0 ? false : true} /> },

        { icon: <CheckCircle />, title: 'Documents', description: <Documents customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id) => handleChange(data, id)} disabledTab={ViewCustomer && ViewCustomer[0]?.address.length > 0 ? false : true} /> },

        { icon: <CheckCircle />, title: 'Overview', description: <OverView customerId={params.get("user_id")} userId={userId} handleActivekey={(data, id)=>handleChange(data, id)} /> },
    ]

    const handleChange = (data, id) => {
        setActiveId(data);
        setUserId(id);
    }

    // const showDisable = (type) => {
    //     switch (type) {
    //         case '0':
    //             return ViewCustomer && ViewCustomer[0]?.gst.length > 0 ? false : true;
    //         case '1':
    //             return ViewCustomer && ViewCustomer[0]?.contact.length > 0 ? false : true;
    //         case '2':
    //             return ViewCustomer && ViewCustomer[0]?.documents.length > 0 ? false : true;
    //         // case '3':
    //         //     return ViewCustomer && ViewCustomer[0]?.documents.length > 0 ? false : true;
    //         // case '4':
    //         //     return ViewCustomer && ViewCustomer[0]?.address.length > 0 ? false : true;
    //         default:
    //             return true;
    //     }
    // }

    console.log(userId, 'userId')
    // disabledTab={showDisable(activeId)}

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' mainTitle={"Master"} subTitle='Customer' heading={'Customer Data'} />
            </Grid>
            <CustomTab tabArray={tabArray} handleChange={(data) => handleChange(data)} activeKey={activeId}  />
        </div>
    );
}