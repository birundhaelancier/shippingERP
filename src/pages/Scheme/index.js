import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewScheme from './viewscheme';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function SchemeDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'schemeId', width: 150, headerName: 'Scheme Id' },
        { field: 'schemeCode', width: 200, headerName: 'Scheme Code' },
        { field: 'schemeDescription', width: 200, headerName: 'Scheme Description' },
        { field: 'licenseRequired', width: 200, headerName: 'License Required' },
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
        { id: 1, schemeDescription: '1', schemeId: "1", schemeCode: 'India', licenseRequired: "pending" },
        { id: 2, schemeDescription: '2', schemeId: "2", schemeCode: 'India', licenseRequired: "pending" },
        { id: 3, schemeDescription: '3', schemeId: "3", schemeCode: 'India', licenseRequired: "pending" },
        { id: 4, schemeDescription: '1', schemeId: "5", schemeCode: 'India', licenseRequired: "pending" },
        { id: 5, schemeDescription: '2', schemeId: "4", schemeCode: 'India', licenseRequired: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addScheme")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Scheme"} count='20,000' heading={'Scheme'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Scheme"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewScheme CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}