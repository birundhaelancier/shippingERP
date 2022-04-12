import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewConsignee from './viewconsignee';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import QuickSearchToolbar from '../../components/SearchBar';

// import './consignee.css';

export default function ConsigneeDetails() {
    let history = useHistory()
    const [showlist, setShowlist] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'consigneeId', width: 130, headerName: 'Consignee Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
        { field: 'city', width: 140, headerName: 'City' },
        { field: 'tags', width: 120, headerName: 'Tags' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 90,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => setOpenModal(true)}><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>
                       
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, consigneeId: '1', consigneeName: 'Birundha', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 2, consigneeId: '2', consigneeName: 'Divya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 3, consigneeId: '3', consigneeName: 'Lakshmi', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 4, consigneeId: '1', consigneeName: 'Vicky', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
        { id: 5, consigneeId: '2', consigneeName: 'Priya', companyName: "testing", mobile: 12345678908, email: "test@gmail.com", city: 'chennai', tags: 'tags' },
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addConsignee")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Consignee"} count='20,000' heading={'Consignees'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Consignee"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewConsignee CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}