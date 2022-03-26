import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCustomer from './viewcustomer';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CustomerClient() {
    let history = useHistory()
    const [showlist, setShowlist] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'customerId', width: 150, headerName: 'Customer Id' },
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
                        {/* <div className="deleteSymbol"><Delete /></div> */}

                        {/* <button title="Edit customer" className="btn btn-sm mx-3 btn-icon btn-success" > <span className="svg-icon svg-icon-md"> <EyeOutlined /> </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-sm mx-3 btn-danger" >  <span className="svg-icon svg-icon-md"> r </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"> <span className="svg-icon svg-icon-md svg-icon-primary"> y </span> </button> */}
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, customerId: '1', customerName: 'Birundha', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2, customerId: '2', customerName: 'Divya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 3, customerId: '3', customerName: 'Lakshmi', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 4, customerId: '1', customerName: 'Vicky', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 5, customerId: '2', customerName: 'Priya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCustomer")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Customer /Client" BtnName="Add Client" openFields={() => openFields()} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data)=>setOpenModal(data)}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Customer / Client"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCustomer CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}