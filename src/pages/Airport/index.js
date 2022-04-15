import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewAirport from './viewairport';
import CustomTable from '../../components/CustomTable';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux'
// import './customer.css';
import { AirPortStatus,AirPortList,DeleteAirPortList } from '../../Redux/Action/EnquiryGroupAction/AirPortAction'
import CustomSwitch from '../../components/SwitchBtn'
export default function AirportDetails(props) {
    let history = useHistory()
    let dispatch=useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const GetSeaList  = useSelector((state) => state.AirPortReducer.GetAirPortList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'portId', width: 150, headerName: 'Air Port Id' },
        { field: 'portName', width: 190, headerName: 'Air Port Name' },
        { field: 'portCode', width: 170, headerName: 'Air Port Code' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'activeStatus', width: 150, headerName: 'Active Status', 
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch  size='small'  onSwitchChange={()=>OnChangeStatus(params.row.portId,params.row.activeStatus===1?0:1)} checked={params.row.activeStatus===1?true:false} /> 
                </div>
            );
        }
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
                    {/* <div className="eyeSymbol" onClick={() => viewModal(params.row.portId)}><RemoveRedEye /></div> */}
                    <Link to={`/addAirport/${params.row.portId}`} className="editSymbol" ><Edit /></Link>
                    <div className="deleteSymbol" onClick={()=>deleteSeaPort(params.row.portId)}><Delete /></div>
                </div>
                );
            }
        }
    ];

    const openFields = () => {
        setOpenModal(true)
        history.push("/addAirport")
    }
    useEffect(() => {
        dispatch(AirPortList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetSeaList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    portId: items.id,
                    portName: items.name,
                    portCode: items.code,
                    countryName:items.code,
                    activeStatus:items.status,
                }
            )
        })
        setRowData(rows)
    },[GetSeaList])

  
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort=(id)=>{
        dispatch(DeleteAirPortList(id))
    }
    const OnChangeStatus=(id,status)=>{
        dispatch(AirPortStatus(id,status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Airport"} count='20,000' heading={'Airport'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Airport"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewAirport CloseModal={(bln) => setOpenModal(bln)}  GetId={GetId}/>
                        </>
                    }
                />
            </>
        </div>
    );
}