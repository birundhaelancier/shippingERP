import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewBusiness from './viewbusiness';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function BusinessDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'businessId', width: 150, headerName: 'Business Scope Id' },
        { field: 'businessCode', width: 160, headerName: 'Business Scope Code' },
        { field: 'businessName', width: 160, headerName: 'Business Scope Name' },
        { field: 'description', width: 150, headerName: 'Description' },
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
        { id: 1, businessName: '1', businessId: "1", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 2, businessName: '2', businessId: "2", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 3, businessName: '3', businessId: "3", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 4, businessName: '1', businessId: "5", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 5, businessName: '2', businessId: "4", businessCode: 'India', description: '56', activeStatus: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addBusiness")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Business"} count='20,000' heading={'Business'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Business"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewBusiness CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}