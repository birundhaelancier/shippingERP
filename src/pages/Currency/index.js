import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCurrency from './viewcurrency';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CurrencyDetails() {  
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'currencyId', width: 150, headerName: 'Currency Id' },
        { field: 'currencyName', width: 150, headerName: 'Currency Name' },
        { field: 'countryId', width: 150, headerName: 'Country Name' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'activeStatus', width: 200, headerName: 'Active Status' },
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
                        <div className="deleteSymbol"><Delete /></div>

                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, currencyName: 'Birundha', currencyId: '1', countryId: "1", countryName: 'India', activeStatus: "pending" },
        { id: 2, currencyName: 'Divya', currencyId: '2', countryId: "2", countryName: 'India', activeStatus: "pending" },
        { id: 3, currencyName: 'Lakshmi', currencyId: '3', countryId: "3", countryName: 'India', activeStatus: "pending" },
        { id: 4, currencyName: 'Vicky', currencyId: '1', countryId: "5", countryName: 'India', activeStatus: "pending" },
        { id: 5, currencyName: 'Priya', currencyId: '2', countryId: "4", countryName: 'India', activeStatus: "pending" },
    ];
    
    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCurrency")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Currency" BtnName="Add Currency" openFields={() => openFields()}  />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Currency"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCurrency CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}