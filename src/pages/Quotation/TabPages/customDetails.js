import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import FooterBtn from '../../../components/FooterButtons';
import CustomTable from '../../../components/CustomTable';


export default function OverViewDetails() {
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const tabArray = [
        { value: 'Customs Clearance Fee', id: 1 },
        { value: 'Examination Fee', id: 2 },
        { value: 'Agency Fee', id: 3 },
        { value: 'CFS Charges', id: 4 },
        { value: 'Certificate of Origin', id: 5 },
        { value: 'PQ Certificate Charges', id: 6 },
        { value: 'Documentation Charges', id: 7 },
        { value: 'AD Code Registration Fee', id: 8 },
        { value: 'ADC  Clearance Charges ', id: 9 },
        { value: 'Scanning Charges', id: 10 },
        { value: 'DO Endorsement Charges', id: 11 },
        { value: 'Loading/Un-loading Charges', id: 12 },
        { value: 'Others', id: 13 },
    ]

    const [quotationDetails, setquotationDetails] = useState({
        expenseType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        buyRate: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        buyTotal: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        sellRate: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        sellTotal: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        vendorType: {
            value: "", validation: [], error: null, errmsg: null,
        },
        vendorName: {
            value: "", validation: [], error: null, errmsg: null,
        },
    })

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'quoteId', width: 130, headerName: 'Quote Id' },
        { field: 'enquiryNo', width: 150, headerName: 'Enquiry No' },
        { field: 'vendorName', width: 200, headerName: 'Vendor Name' },
        { field: 'frightRate', width: 140, headerName: 'Freight Rate' },
        { field: 'totalCost', width: 140, headerName: 'Total Cost' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 90,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => setFieldModal(true)}><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>

                    </div>
                );
            }
        }
    ];

    const rows = [
        { id: 1, quoteId: '1', vendorName: 'Birundha', enquiryNo: "12", frightRate: 60, quotationId: "Q1", totalCost: '67' },
        { id: 2, quoteId: '2', vendorName: 'Divya', enquiryNo: "12", frightRate: 60, quotationId: "Q1", totalCost: '67' },
        { id: 3, quoteId: '3', vendorName: 'Lakshmi', enquiryNo: "12", frightRate: 60, quotationId: "Q1", totalCost: '67' },
        { id: 4, quoteId: '1', vendorName: 'Vicky', enquiryNo: "12", frightRate: 60, quotationId: "Q1", totalCost: '67' },
        { id: 5, quoteId: '2', vendorName: 'Priya', enquiryNo: "12", frightRate: 60, quotationId: "Q1", totalCost: '67' },
    ];
    useEffect(() => {

    }, [])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            quotationDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: quotationDetails[key].validation,
        };

        setquotationDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select" labelname="Vendor Type"
                        changeData={(data) => Validation(data, "vendorType")}
                        value={quotationDetails.vendorType.value}
                        error={quotationDetails.vendorType.error}
                        errmsg={quotationDetails.vendorType.errmsg}
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text" labelname="Venor Name"
                        changeData={(data) => Validation(data, "vendorName")}
                        value={quotationDetails.vendorName.value}
                        error={quotationDetails.vendorName.error}
                        errmsg={quotationDetails.vendorName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Quote' AddFieldBtn={() => setFieldModal(true)} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={12} sx={12} sm={12}>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setFieldModal(data)}
                    // onAddBtnClick={openFields}
                    hideHeader
                />
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Export Shipment Details"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <Grid item xs={12} md={12} sx={12} sm={12} container direction='row' justifyContent='center'>
                            <label className="labeltxt">Vendor Name</label>
                        </Grid>
                        <Grid item xs={12} md={12} sx={12} sm={12} container direction='row' justifyContent='center' spacing={2}>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <label className="labeltxt">Expense Desc</label>
                            </Grid>
                            <Grid item xs={12} md={8} sx={12} sm={12} >
                                <LabelBoxes show type="select" dropdown={tabArray}
                                    changeData={(data) => Validation(data, "expenseType")}
                                    value={quotationDetails.expenseType.value}
                                    error={quotationDetails.expenseType.error}
                                    errmsg={quotationDetails.expenseType.errmsg}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} sx={12} sm={12} container direction='row' justifyContent='center' spacing={2}>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <label className="labeltxt">Buy Rate</label>
                            </Grid>
                            <Grid item xs={12} md={8} sx={12} sm={12} container direction="row" spacing={2}>
                                <Grid item xs={12} md={6} sx={12} sm={12}>
                                    <LabelBoxes show type="number" labelname="Rate/Unit"
                                        placeholder="Rate"
                                        changeData={(data) => Validation(data, "buyRate")}
                                        value={quotationDetails.buyRate.value}
                                        error={quotationDetails.buyRate.error}
                                        errmsg={quotationDetails.buyRate.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={12} sm={12}>
                                    <LabelBoxes show type="number" labelname="Total Amt"
                                        placeholder="Total"
                                        changeData={(data) => Validation(data, "buyTotal")}
                                        value={quotationDetails.buyTotal.value}
                                        error={quotationDetails.buyTotal.error}
                                        errmsg={quotationDetails.buyTotal.errmsg}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} sx={12} sm={12} container direction='row' justifyContent='center' spacing={2}>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <label className="labeltxt">Sell Rate</label>
                            </Grid>
                            <Grid item xs={12} md={8} sx={12} sm={12} container direction="row" spacing={2}>
                                <Grid item xs={12} md={6} sx={12} sm={12}>
                                    <LabelBoxes show type="number" labelname="Rate/Unit"
                                        placeholder="Rate"
                                        changeData={(data) => Validation(data, "sellRate")}
                                        value={quotationDetails.sellRate.value}
                                        error={quotationDetails.sellRate.error}
                                        errmsg={quotationDetails.sellRate.errmsg}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={12} sm={12}>
                                    <LabelBoxes show type="number" labelname="Total Amt"
                                        placeholder="Total"
                                        changeData={(data) => Validation(data, "sellTotal")}
                                        value={quotationDetails.sellTotal.value}
                                        error={quotationDetails.sellTotal.error}
                                        errmsg={quotationDetails.sellTotal.errmsg}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} sx={12} sm={12} container direction='row' justifyContent='flex-end' spacing={2}>
                            <Grid item xs={6} md={2} sx={12} sm={12} >
                                <CustomButton btnName="Add" custombtnCSS="Primary" />
                            </Grid><Grid item xs={4} md={2} sx={12} sm={12} >
                                <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                            </Grid>
                        </Grid>
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} />
            </Grid>
        </div>
    );
}