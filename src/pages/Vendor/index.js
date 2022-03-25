import react, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewVendor from './viewvendor';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './Vendor.css';

export default function VendorDetails() {
    let history = useHistory()
    const [openModal, setOpenModal] = useState(false);
    
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'vendorId', width: 150, headerName: 'Vendor Id' },
        { field: 'vendorName', width: 150, headerName: 'Vendor Name' },
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

                        {/* <button title="Edit Vendor" className="btn btn-sm mx-3 btn-icon btn-success" > <span className="svg-icon svg-icon-md"> <EyeOutlined /> </span> </button>
                        <button title="Edit Vendor" className="btn btn-icon btn-sm mx-3 btn-danger" >  <span className="svg-icon svg-icon-md"> r </span> </button>
                        <button title="Edit Vendor" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"> <span className="svg-icon svg-icon-md svg-icon-primary"> y </span> </button> */}
                    </div>
                );
            }
        }
    ];

    const rows = [
        { id: 1,vendorId: '1', vendorName: 'Birundha',  companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2,vendorId: '2', vendorName: 'Divya',  companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 3,vendorId: '3', vendorName: 'Lakshmi',  companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 4,vendorId: '1', vendorName: 'Vicky',  companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 5,vendorId: '2', vendorName: 'Priya',  companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addVendor")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Vendor" BtnName="Add Vendor" openFields={() => openFields()} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Vendor"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewVendor CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}