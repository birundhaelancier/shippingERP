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
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'vendorId', width: 130, headerName: 'Vendor Id' },
        { field: 'vendorName', width: 130, headerName: 'Vendor Name' },
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
                       
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, vendorId: '1', vendorName: 'Birundha', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 2, vendorId: '2', vendorName: 'Divya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 3, vendorId: '3', vendorName: 'Lakshmi', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 4, vendorId: '1', vendorName: 'Vicky', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 5, vendorId: '2', vendorName: 'Priya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addVendor")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Vendor"} count='20,000' heading={'Vendors'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
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