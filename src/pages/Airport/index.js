import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewAirport from './viewairport';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function AirportDetails(props) {
    let history = useHistory()

    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'portId', width: 150, headerName: 'Air Port Id' },
        { field: 'portName', width: 190, headerName: 'Air Port Name' },
        { field: 'portCode', width: 170, headerName: 'Air Port Code' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'activeStatus', width: 150, headerName: 'Active Status' },
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
        { id: 1, portCode: 'Birundha', countryName: '1', portCode: '8', portId: '1', portName: "testing", companyName: "testing", activeStatus: "pending" },
        { id: 2, portCode: 'Divya', countryName: '2', portCode: '8', portId: '1', portName: "testing", companyName: "testing", activeStatus: "pending" },
        { id: 3, portCode: 'Lakshmi', countryName: '3', portCode: '8', portId: '1', portName: "testing", companyName: "testing", activeStatus: "pending" },
        { id: 4, portCode: 'Vicky', countryName: '1', portCode: '8', portId: '1', portName: "testing", companyName: "testing", activeStatus: "pending" },
        { id: 5, portCode: 'Priya', countryName: '2', portCode: '8', portId: '1', portName: "testing", companyName: "testing", activeStatus: "pending" },
    ];
    const openFields = () => {
        setOpenModal(true)
        history.push("/addAirport")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Airport"} count='20,000' heading={'Airport'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Airport"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewAirport CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}