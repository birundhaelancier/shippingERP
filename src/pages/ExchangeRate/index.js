import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewExchangeRate from './viewexchangerate';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CurrencyDetails() {  
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'exchangeId', width: 150, headerName: 'Exchange Id' },
        { field: 'currencyId', width: 150, headerName: 'Currency Id' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'exchangeRate', width: 150, headerName: 'Exchange Rate' },
        { field: 'date', width: 200, headerName: 'Date' },
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
        { id: 1, exchangeRate: 'Birundha', currencyId: '1', exchangeId: "1", countryName: 'India', date: "23-09-2021" },
        { id: 2, exchangeRate: 'Divya', currencyId: '2', exchangeId: "2", countryName: 'India', date: "23-09-2021" },
        { id: 3, exchangeRate: 'Lakshmi', currencyId: '3', exchangeId: "3", countryName: 'India', date: "23-09-2021" },
        { id: 4, exchangeRate: 'Vicky', currencyId: '1', exchangeId: "5", countryName: 'India', date: "23-09-2021" },
        { id: 5, exchangeRate: 'Priya', currencyId: '2', exchangeId: "4", countryName: 'India', date: "23-09-2021" },
    ];
    
    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addExchangerate")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader headerTitle="Exchange Rate" BtnName="Add Exchange Rate" openFields={() => openFields()}  />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Exchange Rate"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewExchangeRate CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}