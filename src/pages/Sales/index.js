import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewSales from './viewsales';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function SalesDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'salesId', width: 150, headerName: 'Sales Person Id' },
        { field: 'salesPersonName', width: 200, headerName: 'Sales Person Name' },
        { field: 'incentivePlan', width: 200, headerName: 'Incentive Plan' },
        { field: 'designation', width: 200, headerName: 'Designation Type' },
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
        { id: 1, incentivePlan: '1', salesId: "1", salesPersonName: 'India', designation: "pending" },
        { id: 2, incentivePlan: '2', salesId: "2", salesPersonName: 'India', designation: "pending" },
        { id: 3, incentivePlan: '3', salesId: "3", salesPersonName: 'India', designation: "pending" },
        { id: 4, incentivePlan: '1', salesId: "5", salesPersonName: 'India', designation: "pending" },
        { id: 5, incentivePlan: '2', salesId: "4", salesPersonName: 'India', designation: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addSales")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Sales"} count='20,000' heading={'Sales'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Sales"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewSales CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}