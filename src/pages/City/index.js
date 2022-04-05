import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCountry from './viewcity';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CityDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'cityId', width: 150, headerName: 'City Id' },
        { field: 'cityName', width: 160, headerName: 'City Name' },
        { field: 'stateName', width: 160, headerName: 'State Name' },
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
        { id: 1, cityId: "1", cityName: 'chennai', stateName: 'TamilNadu', countryName: 'India', activeStatus: "pending" },
        { id: 2, cityId: "2", cityName: 'chennai', stateName: 'TamilNadu', countryName: 'India', activeStatus: "pending" },
        { id: 3, cityId: "3", cityName: 'chennai', stateName: 'TamilNadu', countryName: 'India', activeStatus: "pending" },
        { id: 4, cityId: "5", cityName: 'chennai', stateName: 'TamilNadu', countryName: 'India', activeStatus: "pending" },
        { id: 5, cityId: "4", cityName: 'chennai', stateName: 'TamilNadu', countryName: 'India', activeStatus: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCity")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"City"} count='20,000' heading={'City'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"City"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCountry CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}