import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewJobs from './viewjobs';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// import './customer.css';

export default function JobsDetails() {
    const [openModal, setOpenModal] = useState(false);
    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'jobsId', width: 230, headerName: 'Jobs Id' },
        { field: 'jobsName', width: 230, headerName: 'Jobs Type' },
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
                        {/* <div className="deleteSymbol"><Delete /></div> */}
                    </div>
                );
            }
        }
    ];
    const rows = [
        { id: 1, jobsName: 'Birundha', jobsId: '1', activeStatus: "pending" },
        { id: 2, jobsName: 'Divya', jobsId: '2', activeStatus: "pending" },
        { id: 3, jobsName: 'Lakshmi', jobsId: '3', activeStatus: "pending" },
        { id: 4, jobsName: 'Vicky', jobsId: '1', activeStatus: "pending" },
        { id: 5, jobsName: 'Priya', jobsId: '2', activeStatus: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addJobs")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Jobs"} count='20,000' heading={'Jobs'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Jobs"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewJobs CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}