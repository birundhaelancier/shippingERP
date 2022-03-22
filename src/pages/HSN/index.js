import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewHsn from './viewhsn';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CurrencyDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 180, headerName: 'S.No' },
        { field: 'hsnCode', width: 280, headerName: 'HSN Code' },
        { field: 'description', width: 280, headerName: 'Description' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 280,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => setOpenModal(true)}><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>
                        <div className="deleteSymbol"><Delete /></div>

                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, hsnCode: '1', description: "testing", activeStatus: "pending" },
        { id: 2, hsnCode: '2', description: "testing", activeStatus: "pending" },
        { id: 3, hsnCode: '3', description: "testing", activeStatus: "pending" },
        { id: 4, hsnCode: '1', description: "testing", activeStatus: "pending" },
        { id: 5, hsnCode: '2', description: "testing", activeStatus: "pending" },
    ];
    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addHsn")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="HSN Code" BtnName="Add HSN Code" openFields={() => openFields()} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"HSN Code"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewHsn CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}