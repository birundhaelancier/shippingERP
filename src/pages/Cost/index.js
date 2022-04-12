import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCost from './viewcost';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CostDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'costId', width: 150, headerName: 'Cost Id' },
        { field: 'shipmentType', width: 200, headerName: 'Shipment Type' },
        { field: 'cargoType', width: 200, headerName: 'Cargo Type' },
        { field: 'expenseType', width: 200, headerName: 'Expense Type' },
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
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, cargoType: '1', costId: "1", shipmentType: 'India', expenseType: "pending" },
        { id: 2, cargoType: '2', costId: "2", shipmentType: 'India', expenseType: "pending" },
        { id: 3, cargoType: '3', costId: "3", shipmentType: 'India', expenseType: "pending" },
        { id: 4, cargoType: '1', costId: "5", shipmentType: 'India', expenseType: "pending" },
        { id: 5, cargoType: '2', costId: "4", shipmentType: 'India', expenseType: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCost")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Cost"} count='20,000' heading={'Cost'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Cost"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCost CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}