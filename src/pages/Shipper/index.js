import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewShipper from './viewshipper';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import QuickSearchToolbar from '../../components/SearchBar';

// import './Shipper.css';

export default function ShipperDetails() {
    let history = useHistory()
    const [showlist, setShowlist] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'shipperId', width: 130, headerName: 'Shipper Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
        { field: 'department', width: 140, headerName: 'Department' },
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
        { id: 1, shipperId: '1', customerName: 'Birundha', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", department: 'chennai'},
        { id: 2, shipperId: '2', customerName: 'Divya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", department: 'chennai'},
        { id: 3, shipperId: '3', customerName: 'Lakshmi', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", department: 'chennai'},
        { id: 4, shipperId: '1', customerName: 'Vicky', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", department: 'chennai'},
        { id: 5, shipperId: '2', customerName: 'Priya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", department: 'chennai'},
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addShipper")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Shipper"} count='20,000' heading={'Shippers'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Shipper"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewShipper CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}