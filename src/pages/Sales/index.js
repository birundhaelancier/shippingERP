import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewSales from './viewsales';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteSalesList, SalesList } from '../../Redux/Action/SalesGroupAction/SalesAction';

// import './customer.css';

export default function SalesDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetSalesList  = useSelector((state) => state.SalesReducer.GetSalesList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'salesId', width: 150, headerName: 'Sales Person Id' },
        { field: 'salesPersonName', width: 200, headerName: 'Sales Person Name' },
        { field: 'incentivePlan', width: 200, headerName: 'Incentive Plan' },
        { field: 'designation', width: 200, headerName: 'Designation Type' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.salesId)}><RemoveRedEye /></div>
                        <Link to={`/addSales?user_id=${params.row.salesId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteSales(params.row.salesId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(SalesList("All"))
    }, [])

    useEffect(()=>{
        let rows= [];
        GetSalesList?.map((items,index) => {
            rows.push(
                {
                    id: index+1,
                    salesId: items.id,
                    salesPersonName: items.name,
                    incentivePlan: items.incentive_plan,
                    designation: items.designation,
                }
            )
        })
        setRowData(rows)
    },[GetSalesList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addSales")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSales=(id)=>{
        dispatch(DeleteSalesList(id))
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Sales"} count='20,000' heading={'Sales'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Sales"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewSales CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}