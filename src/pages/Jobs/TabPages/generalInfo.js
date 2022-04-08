import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import CustomerDetails from './ModalInfo/customerDetails';
import { Add } from '@mui/icons-material';


export default function GeneralInfo() {
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const [AddFieldModal, setAddFieldModal] = useState(false);
    const [shipmentInfo, setshipmentInfo] = useState({

        shipmentId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        shipmentType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })
    const [getModalData, setGetModalData] = useState()
    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            shipmentInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: shipmentInfo[key].validation,
        };

        setshipmentInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const modalArray = [
        {
            title: 'Customer Details', data: [
                { label: 'Customer Name', type: 'text', value: '' },
                { label: 'Contact Person', type: 'text', value: '' },
                { label: 'Designation', type: 'text', value: '' },
                { label: 'Mobile No', type: 'number', value: '', showFlag: true },
                { label: 'Phone No', type: 'number', value: '', showFlag: true },
                { label: 'Email', type: 'text', value: '' },
                { label: 'Address', type: 'textarea', value: '' },
                { label: 'State', type: 'text', value: '' },
                { label: 'Country', type: 'text', value: '' },
                { label: 'IEC Code', type: 'text', value: '' },
                { label: 'PAN No', type: 'text', value: '' },
                { label: 'GST Reg', type: 'text', value: '' },
            ]
        },
        {
            title: 'Export Shipment Details', data: [
                { label: 'Shipper Name', type: 'text', value: '' },
                { label: 'Contact Person', type: 'text', value: '' },
                { label: 'Designation', type: 'text', value: '' },
                { label: 'Mobile No', type: 'number', value: '', showFlag: true },
                { label: 'Phone No', type: 'number', value: '', showFlag: true },
                { label: 'Email', type: 'text', value: '' },
                { label: 'Address', type: 'textarea', value: '' },
                { label: 'State', type: 'text', value: '' },
                { label: 'Country', type: 'text', value: '' },
                { label: 'IEC Code', type: 'text', value: '' },
                { label: 'PAN No', type: 'text', value: '' },
                { label: 'GST Reg', type: 'text', value: '' },
            ]
        },
        {
            title: 'Consignee Details', data: [
                { label: 'Consignee Name', type: 'text', value: '' },
                { label: 'Contact Person', type: 'text', value: '' },
                { label: 'Designation', type: 'text', value: '' },
                { label: 'Mobile No', type: 'number', value: '', showFlag: true },
                { label: 'Phone No', type: 'number', value: '', showFlag: true },
                { label: 'Email', type: 'text', value: '' },
                { label: 'Address', type: 'textarea', value: '' },
                { label: 'State', type: 'text', value: '' },
                { label: 'Country', type: 'text', value: '' },
                { label: 'IEC Code', type: 'text', value: '' },
                { label: 'PAN No', type: 'text', value: '' },
                { label: 'GST Reg', type: 'text', value: '' },
            ]
        },
        {
            title: 'Buyer Details', data: [
                { label: 'Buyer Name', type: 'text', value: '' },
                { label: 'Contact Person', type: 'text', value: '' },
                { label: 'Designation', type: 'text', value: '' },
                { label: 'Mobile No', type: 'number', value: '', showFlag: true },
                { label: 'Phone No', type: 'number', value: '', showFlag: true },
                { label: 'Email', type: 'text', value: '' },
                { label: 'Address', type: 'textarea', value: '' },
                { label: 'State', type: 'text', value: '' },
                { label: 'Country', type: 'text', value: '' },
                { label: 'IEC Code', type: 'text', value: '' },
                { label: 'PAN No', type: 'text', value: '' },
                { label: 'GST Reg', type: 'text', value: '' },
            ]
        }
    ]

    const addEctraFields = (data, index) => {
        let obj = []
        obj.push({ details: data, id: index })
        setAddFieldModal(true)
        setGetModalData(obj[0])
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" alignItems={'center'} container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="ENQ No"
                        changeData={(data) => Validation(data, "shipmentId")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="ENQ Date"
                        changeData={(data) => Validation(data, "shipmentType")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Job No"
                        changeData={(data) => Validation(data, "shipmentId")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="Job Date"
                        changeData={(data) => Validation(data, "shipmentType")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Shipment Type"
                        changeData={(data) => Validation(data, "activeSts")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Business Scope"
                        changeData={(data) => Validation(data, "shipmentId")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="textarea"
                        labelname="Shipment Description"
                        changeData={(data) => Validation(data, "shipmentType")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="CRO/Booking Ref"
                        changeData={(data) => Validation(data, "shipmentId")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="CRO Received Date"
                        changeData={(data) => Validation(data, "shipmentType")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Documents Received"
                        changeData={(data) => Validation(data, "activeSts")}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Docs Recd On"
                        changeData={(data) => Validation(data, "activeSts")}
                    />
                </Grid>
                {modalArray.map((val, index) => {
                    return (
                        <>
                            <Grid item xs={4} md={3.5} sx={12} sm={12}>
                                <Labelbox show type="text"
                                    labelname={modalArray && modalArray[index].data[0].label}
                                    changeData={(data) => Validation(data, "activeSts")}
                                />
                            </Grid>
                            <Grid item xs={4} md={0.5} sx={12} sm={12}>
                                <div className='add_icons' onClick={() => addEctraFields(val, index)}><Add /></div>
                            </Grid>
                        </>
                    )
                })}

            </Grid>

            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} />
                    </>
                }
            />
            <DynModel handleChangeModel={AddFieldModal} modelTitle={getModalData?.details.title}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setAddFieldModal(false)} width={800} content={
                    <>
                        <CustomerDetails CloseModal={(bln) => setAddFieldModal(bln)} showInputList={getModalData} />
                    </>
                } />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} />
            </Grid>
        </div>
    );
}