import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewHsn from './viewhsn';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function CurrencyDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'sectionName', width: 180, headerName: 'Section Name' },
        { field: 'chapterName', width: 180, headerName: 'Chapter Name' },
        { field: 'hsnCode', width: 180, headerName: 'HSN Code' },
        { field: 'description', width: 180, headerName: 'Description' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 200,
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
        { id: 1, sectionName: 'section', chapterName: 'chapter', hsnCode: '1', description: "testing", activeStatus: "pending" },
        { id: 2, sectionName: 'section', chapterName: 'chapter', hsnCode: '2', description: "testing", activeStatus: "pending" },
        { id: 3, sectionName: 'section', chapterName: 'chapter', hsnCode: '3', description: "testing", activeStatus: "pending" },
        { id: 4, sectionName: 'section', chapterName: 'chapter', hsnCode: '1', description: "testing", activeStatus: "pending" },
        { id: 5, sectionName: 'section', chapterName: 'chapter', hsnCode: '2', description: "testing", activeStatus: "pending" },
    ];
    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addHsn")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <ContentHeader openFields mainTitle={"HSN Code"} count='20,000' heading={'HSN Code'} />
               
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"HSN Code"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewHsn CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}