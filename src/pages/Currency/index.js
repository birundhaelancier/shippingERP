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
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'currencyId', width: 150, headerName: 'Currency Id' },
        { field: 'currencyName', width: 160, headerName: 'Currency Name' },
        { field: 'currencySymbol', width: 160, headerName: 'Currency Symbol' },
        { field: 'countryId', width: 150, headerName: 'Country Id' },
        { field: 'countryName', width: 160, headerName: 'Country Name' },
        { field: 'activeStatus', width: 160, headerName: 'Active Status' },
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
        { id: 1, currencySymbol: '1', currencyId: "1", currencyName: 'India', countryId: '56', countryName: 'india', activeStatus: "pending" },
        { id: 2, currencySymbol: '2', currencyId: "2", currencyName: 'India', countryId: '56', countryName: 'india', activeStatus: "pending" },
        { id: 3, currencySymbol: '3', currencyId: "3", currencyName: 'India', countryId: '56', countryName: 'india', activeStatus: "pending" },
        { id: 4, currencySymbol: '1', currencyId: "5", currencyName: 'India', countryId: '56', countryName: 'india', activeStatus: "pending" },
        { id: 5, currencySymbol: '2', currencyId: "4", currencyName: 'India', countryId: '56', countryName: 'india', activeStatus: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCurrency")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Currency"} count='20,000' heading={'Currency'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
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