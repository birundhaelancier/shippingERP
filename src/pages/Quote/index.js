import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewQuote from './viewquote';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteQuoteList, QuoteList, QuoteStatus, QuoteDefault } from '../../Redux/Action/QuoteGroupAction/QuoteAction';
import { useDispatch, useSelector } from 'react-redux';

// import './customer.css';

export default function QuoteDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetQuote = useSelector((state) => state?.QuoteReducer?.GetQuoteList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'cqId', width: 150, headerName: 'CQ Id' },
        { field: 'shipmentType', width: 200, headerName: 'Shipment Type' },
        { field: 'cargoType', width: 200, headerName: 'Cargo Type' },
        { field: 'stuffingType', width: 200, headerName: 'Stuffing Type' },
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
                    <div className="eyeSymbol" onClick={() => viewModal(params.row.cqId)}><RemoveRedEye /></div>
                    <Link to={`/addQuote?user_id=${params.row.cqId}`} className="editSymbol" ><Edit /></Link>
                    <div className="deleteSymbol" onClick={() => deleteCountry(params.row.cqId)}><Delete /></div>
                </div>
                );
            }
        }
    ];


    useEffect(() => {
        dispatch(QuoteList())
    }, [])

    useEffect(() => {
        let rows = [];
        console.log(GetQuote, 'GetQuote')
        GetQuote?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    cqId: items.id,
                    shipmentType: items.shipment_name,
                    cargoType: items.cargo_name,
                    stuffingType: items.stuffing_type,
                }
            )
        })
        setRowData(rows)
    }, [GetQuote])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addQuote")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteQuoteList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(QuoteStatus(id, status))
    }
    const OnChangeDefault = (id, status) => {
        dispatch(QuoteDefault(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Quote"} count='20,000' heading={'Quote'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Quote"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewQuote CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}