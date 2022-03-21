import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { DataGrid } from '@mui/x-data-grid';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCustomer from './viewcustomer';

// import './customer.css';

export default function CustomerClient() {
    const [showlist, setShowlist] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        customerId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        companyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address1: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address2: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        city: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        pan: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cin: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        msme: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        contactPerson: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phoneNo: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        mobileNo: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        email: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        iec: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            profileDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: profileDetails[key].validation,
        };

        setprofileDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'customerId', width: 150, headerName: 'Customer Id' },
        { field: 'customerName', width: 150, headerName: 'Customer Name' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 150, headerName: 'Mobile' },
        { field: 'email', width: 200, headerName: 'Email' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => setOpenModal(true)}><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>
                        <div className="deleteSymbol"><Delete /></div>

                        {/* <button title="Edit customer" className="btn btn-sm mx-3 btn-icon btn-success" > <span className="svg-icon svg-icon-md"> <EyeOutlined /> </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-sm mx-3 btn-danger" >  <span className="svg-icon svg-icon-md"> r </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"> <span className="svg-icon svg-icon-md svg-icon-primary"> y </span> </button> */}
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, customerName: 'Hello', customerId: '1', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2, customerName: 'DataGridPro', customerId: '2', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 3, customerName: 'MUI', customerId: '3', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 1, customerName: 'Hello', customerId: '1', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2, customerName: 'DataGridPro', customerId: '2', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
    ];
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Customer /Client" />
            </Grid>
            {showlist ?
                <>
                    <Grid item xs={12} spacing={2} direction="row" container>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Customer Id"
                                changeData={(data) => Validation(data, "customerId")}
                                value={profileDetails.customerId.value}
                                error={profileDetails.customerId.error}
                                errmsg={profileDetails.customerId.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Customer Name"
                                changeData={(data) => Validation(data, "customerName")}
                                value={profileDetails.customerName.value}
                                error={profileDetails.customerName.error}
                                errmsg={profileDetails.customerName.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Customer Type"
                                changeData={(data) => Validation(data, "customerType")}
                                value={profileDetails.customerType.value}
                                error={profileDetails.customerType.error}
                                errmsg={profileDetails.customerType.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Company Name"
                                changeData={(data) => Validation(data, "companyName")}
                                value={profileDetails.companyName.value}
                                error={profileDetails.companyName.error}
                                errmsg={profileDetails.companyName.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Address1"
                                changeData={(data) => Validation(data, "address1")}
                                value={profileDetails.address1.value}
                                error={profileDetails.address1.error}
                                errmsg={profileDetails.address1.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Address2"
                                changeData={(data) => Validation(data, "address2")}
                                value={profileDetails.address2.value}
                                error={profileDetails.address2.error}
                                errmsg={profileDetails.address2.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="select"
                                labelname="State"
                                changeData={(data) => Validation(data, "state")}
                                value={profileDetails.state.value}
                                error={profileDetails.state.error}
                                errmsg={profileDetails.state.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="select"
                                labelname="City"
                                changeData={(data) => Validation(data, "city")}
                                value={profileDetails.city.value}
                                error={profileDetails.city.error}
                                errmsg={profileDetails.city.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="select"
                                labelname="Country"
                                changeData={(data) => Validation(data, "country")}
                                value={profileDetails.country.value}
                                error={profileDetails.country.error}
                                errmsg={profileDetails.country.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="PAN"
                                changeData={(data) => Validation(data, "pan")}
                                value={profileDetails.pan.value}
                                error={profileDetails.pan.error}
                                errmsg={profileDetails.pan.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="GST"
                                changeData={(data) => Validation(data, "gst")}
                                value={profileDetails.gst.value}
                                error={profileDetails.gst.error}
                                errmsg={profileDetails.gst.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="CIN"
                                changeData={(data) => Validation(data, "cin")}
                                value={profileDetails.cin.value}
                                error={profileDetails.cin.error}
                                errmsg={profileDetails.cin.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="MSME"
                                changeData={(data) => Validation(data, "msme")}
                                value={profileDetails.msme.value}
                                error={profileDetails.msme.error}
                                errmsg={profileDetails.msme.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Contact Person"
                                changeData={(data) => Validation(data, "contactPerson")}
                                value={profileDetails.contactPerson.value}
                                error={profileDetails.contactPerson.error}
                                errmsg={profileDetails.contactPerson.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Phone No"
                                changeData={(data) => Validation(data, "phoneNo")}
                                value={profileDetails.phoneNo.value}
                                error={profileDetails.phoneNo.error}
                                errmsg={profileDetails.phoneNo.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="number"
                                labelname="Mobile No"
                                changeData={(data) => Validation(data, "mobileNo")}
                                value={profileDetails.mobileNo.value}
                                error={profileDetails.mobileNo.error}
                                errmsg={profileDetails.mobileNo.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="E-Mail"
                                changeData={(data) => Validation(data, "email")}
                                value={profileDetails.email.value}
                                error={profileDetails.email.error}
                                errmsg={profileDetails.email.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="IEC"
                                changeData={(data) => Validation(data, "iec")}
                                value={profileDetails.iec.value}
                                error={profileDetails.iec.error}
                                errmsg={profileDetails.iec.errmsg}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type="text"
                                labelname="Active Status"
                                changeData={(data) => Validation(data, "activeSts")}
                                value={profileDetails.activeSts.value}
                                error={profileDetails.activeSts.error}
                                errmsg={profileDetails.activeSts.errmsg}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                        <Grid item xs={6} md={2} sx={6} sm={6}>
                            <CustomButton btnName="Submit" custombtnCSS="Primary" onBtnClick={() => setShowlist(false)} />
                        </Grid>
                        <Grid item xs={6} md={2} sx={6} sm={6}>
                            <CustomButton btnName="Cancel" custombtnCSS="Cancel" />
                        </Grid>
                    </Grid>
                </>
                :
                <>
                    <Grid item xs={12} spacing={2} direction="row" justifyContent="end" container>
                        <Grid item xs={6} md={2} sx={6} sm={6}>
                            <CustomButton btnName="Add Client" custombtnCSS="Primary" onBtnClick={() => setShowlist(true)} />
                        </Grid>
                    </Grid>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            // components={{ Toolbar: QuickSearchToolbar }}
                            rows={rows}
                            columns={columnss}
                            // page={page}
                            // pageSize={pageSize}
                            // onPageSizeChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 25, 50, 100]}
                        // componentsProps={{
                        //     toolbar: {
                        //         value: searchText,
                        //         onChange: (event) => requestSearch(event.target.value),
                        //         clearSearch: () => requestSearch(''),
                        //     },
                        // }}
                        />
                    </div>
                    <DynModel handleChangeModel={openModal} modelTitle={"Customer / Client"}
                        modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                            <>
                                <ViewCustomer CloseModal={(bln) => setOpenModal(bln)} />
                            </>
                        }
                    />
                </>
            }



        </div>
    );
}