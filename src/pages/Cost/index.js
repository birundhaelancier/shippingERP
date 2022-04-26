import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCost from './viewcost';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteCostList, CostList, CostStatus, CostDefault } from '../../Redux/Action/QuoteGroupAction/CostAction';
import { useDispatch, useSelector } from 'react-redux';

// import './customer.css';

export default function CostDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetCost = useSelector((state) => state?.CostReducer?.GetCostList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'costId', width: 150, headerName: 'Cost Id' },
        { field: 'shipmentType', width: 200, headerName: 'Shipment Type' },
        { field: 'cargoType', width: 200, headerName: 'Cargo Type' },
        { field: 'expenseType', width: 200, headerName: 'Expense Type' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.costId)}><RemoveRedEye /></div>
                        <Link to={`/addCost?user_id=${params.row.costId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCountry(params.row.costId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(CostList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetCost?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    costId: items.id,
                    shipmentType: items.shipment_name,
                    cargoType: items.cargo_name,
                    expenseType: items.expense_type,
                }
            )
        })
        setRowData(rows)
    }, [GetCost])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCost")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteCostList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CostStatus(id, status))
    }
    const OnChangeDefault = (id, status) => {
        dispatch(CostDefault(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Cost"} count='20,000' heading={'Cost'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Cost"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCost CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}