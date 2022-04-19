import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewExchangeRate from './viewexchangerate';
import CustomTable from '../../components/CustomTable';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch,useSelector } from 'react-redux'
import CustomSwitch from '../../components/SwitchBtn'
import { RateList,DeleteRate } from '../../Redux/Action/GeneralGroupAction/RateAction'
import moment from 'moment'
// import './customer.css';

export default function CurrencyDetails() {  
    const [openModal, setOpenModal] = useState(false);
    let dispatch=useDispatch()
    const GetRateList  = useSelector((state) => state.RateReducer.GetRateList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'currencyId', width: 150, headerName: 'Currency Id' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'exchangeRate', width: 150, headerName: 'Exchange Rate' },
        { field: 'date', width: 200, headerName: 'Date' },
       
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.Id)}><RemoveRedEye /></div>
                        <Link to={`/addExchangerate/${params.row.Id}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleterate(params.row.Id)}><Delete /></div>
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, exchangeRate: 'Birundha', currencyId: '1', exchangeId: "1", countryName: 'India', date: "23-09-2021" },
        { id: 2, exchangeRate: 'Divya', currencyId: '2', exchangeId: "2", countryName: 'India', date: "23-09-2021" },
        { id: 3, exchangeRate: 'Lakshmi', currencyId: '3', exchangeId: "3", countryName: 'India', date: "23-09-2021" },
        { id: 4, exchangeRate: 'Vicky', currencyId: '1', exchangeId: "5", countryName: 'India', date: "23-09-2021" },
        { id: 5, exchangeRate: 'Priya', currencyId: '2', exchangeId: "4", countryName: 'India', date: "23-09-2021" },
    ];
    
    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addExchangerate")
    }
    useEffect(() => {
        dispatch(RateList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetRateList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    currencyId: items.currency,
                    countryName: items.country_name,
                    exchangeRate:items.exchange_rate,
                    date:moment(items.d_date).format("DD-MM-YYYY"),
                    Id:items.id
                }
            )
        })
        setRowData(rows)
    },[GetRateList])

  
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleterate=(id)=>{
        dispatch(DeleteRate(id))
    }
    // const OnChangeStatus=(id,status)=>{
    //     dispatch(RateStatus(id,status))
    // }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <ContentHeader openFields mainTitle={"Exchange Rate"} count='20,000' heading={'Exchange Rate'} />

            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Exchange Rate"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewExchangeRate CloseModal={(bln) => setOpenModal(bln)}  GetId={GetId}/>
                        </>
                    }
                />
            </>
        </div>
    );
}