import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewShipment from './viewTypes/viewshipment';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function ShipmentDetails() {  
    const [openModal, setOpenModal] = useState(false);
    let history = useHistory()

    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'shipmentId', width: 230, headerName: 'Shipments Id' },
        { field: 'shipmentName', width: 230, headerName: 'Shipments Name' },
        { field: 'activeStatus', width: 230, headerName: 'Active Status' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 230,
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
        { id: 1, shipmentName: 'Birundha', shipmentId: '1',activeStatus: "pending" },
        { id: 2, shipmentName: 'Divya', shipmentId: '2',activeStatus: "pending" },
        { id: 3, shipmentName: 'Lakshmi', shipmentId: '3',activeStatus: "pending" },
        { id: 4, shipmentName: 'Vicky', shipmentId: '1',activeStatus: "pending" },
        { id: 5, shipmentName: 'Priya', shipmentId: '2',activeStatus: "pending" },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addShipment")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Shipment" BtnName="Add Shipment" openFields={() => openFields()}  />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Shipment"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewShipment CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}