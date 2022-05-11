import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import QuickSearchToolbar from '../../components/SearchBar';

// import './Quotation.css';

export default function QuotationDetails() {
    let history = useHistory()
    const [openModal, setOpenModal] = useState(false);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'customerType', width: 130, headerName: 'Customer Type' },
        { field: 'customerName', width: 150, headerName: 'Customer Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'quotationId', width: 200, headerName: 'Quotation No' },
        { field: 'quotationDate', width: 140, headerName: 'Quotation Date' },
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
        { id: 1, customerType: '1', customerName: 'Birundha', customerName: "testing", mobile: 12345678908, quotationId: "test@gmail.com", quotationDate: 'chennai'},
        { id: 2, customerType: '2', customerName: 'Divya', customerName: "testing", mobile: 12345678908, quotationId: "test@gmail.com", quotationDate: 'chennai'},
        { id: 3, customerType: '3', customerName: 'Lakshmi', customerName: "testing", mobile: 12345678908, quotationId: "test@gmail.com", quotationDate: 'chennai'},
        { id: 4, customerType: '1', customerName: 'Vicky', customerName: "testing", mobile: 12345678908, quotationId: "test@gmail.com", quotationDate: 'chennai'},
        { id: 5, customerType: '2', customerName: 'Priya', customerName: "testing", mobile: 12345678908, quotationId: "test@gmail.com", quotationDate: 'chennai'},
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addQuotation")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Quotation"} count='20,000' heading={'Quotation'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rows}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Quotation"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            {/* <ViewQuotation CloseModal={(bln) => setOpenModal(bln)} /> */}
                        </>
                    }
                />
            </>
        </div>
    );
}