import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCurrency from './viewcurrency';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteCurrencyList, CurrencyList, CurrencyStatus, CurrencyDefault } from '../../Redux/Action/QuoteGroupAction/CurrencyAction';
import { useDispatch, useSelector } from 'react-redux';

// import './customer.css';

export default function CurrencyDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetCurrency = useSelector((state) => state?.CurrencyReducer?.GetCurrencyList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'currencyId', width: 100, headerName: 'Currency Id' },
        { field: 'currencyName', width: 160, headerName: 'Currency Name' },
        { field: 'currencySymbol', width: 160, headerName: 'Currency Symbol' },
        { field: 'countryName', width: 160, headerName: 'Country Name' },
        {
            field: 'default', width: 100, headerName: 'Default',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomSwitch size='small' onSwitchChange={() => OnChangeDefault(params.row.currencyId, params.row.default === 1 ? 0 : 1)} checked={params.row.default === 1 ? true : false} />
                    </div>
                );
            },
        },
        {
            field: 'activeStatus', width: 120, headerName: 'Active Status',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.currencyId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
                    </div>
                );
            },
        },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.currencyId)}><RemoveRedEye /></div>
                        <Link to={`/addCurrency?user_id=${params.row.currencyId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCountry(params.row.currencyId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];
    useEffect(() => {
        dispatch(CurrencyList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetCurrency?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    currencyId: items.id,
                    currencyName: items.name,
                    currencySymbol: items.symbol,
                    countryName: items.country_name,
                    default: items.cur_default,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetCurrency])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCurrency")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteCurrencyList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CurrencyStatus(id, status))
    }
    const OnChangeDefault = (id, status) => {
        dispatch(CurrencyDefault(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Currency"} count='20,000' heading={'Currency'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Currency"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCurrency CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}