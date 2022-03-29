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
import QuickSearchToolbar from '../../components/SearchBar';

// import './customer.css';

export default function CustomerClient() {
    let history = useHistory()
    const [showlist, setShowlist] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'customerId', width: 130, headerName: 'Customer Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
        { field: 'city', width: 140, headerName: 'City' },
        { field: 'tags', width: 120, headerName: 'Tags' },
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
        { id: 1, customerId: '1', customerName: 'Birundha', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 2, customerId: '2', customerName: 'Divya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 3, customerId: '3', customerName: 'Lakshmi', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 4, customerId: '1', customerName: 'Vicky', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 5, customerId: '2', customerName: 'Priya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCustomer")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
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