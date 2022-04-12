import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewVehicle from './viewvehicle';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function VehicleDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'vehicleId', width: 150, headerName: 'Vehicle Id' },
        { field: 'vehicleName', width: 200, headerName: 'Vehicle Name' },
        { field: 'bodyType', width: 200, headerName: 'Body Type' },
        { field: 'length', width: 200, headerName: 'Length' },
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
        { id: 1, bodyType: '1', vehicleId: "1", vehicleName: 'India', length: "pending" },
        { id: 2, bodyType: '2', vehicleId: "2", vehicleName: 'India', length: "pending" },
        { id: 3, bodyType: '3', vehicleId: "3", vehicleName: 'India', length: "pending" },
        { id: 4, bodyType: '1', vehicleId: "5", vehicleName: 'India', length: "pending" },
        { id: 5, bodyType: '2', vehicleId: "4", vehicleName: 'India', length: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addVehicle")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Vehicle"} count='20,000' heading={'Vehicle'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Vehicle"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewVehicle CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}