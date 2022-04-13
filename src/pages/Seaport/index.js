import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewSeaport from './viewseaport';
import CustomTable from '../../components/CustomTable';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { DeleteSeaPortList,SeaPortList,SeaPortStatus } from '../../Redux/Action/Seaports'
// import './customer.css';
import CustomSwitch from '../../components/SwitchBtn'
export default function SeaportDetails(props) {
    let history = useHistory()
    let dispatch=useDispatch()
    const GetSeaList  = useSelector((state) => state.SeaPortReducer.GetSeaList);
    const [rowData, setRowData] = useState([])
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'portId', width: 150, headerName: 'Sea Port Id' },
        { field: 'portName', width: 190, headerName: 'Sea Port Name' },
        { field: 'portCode', width: 170, headerName: 'Sea Port Code' },
        { field: 'countryName', width: 150, headerName: 'Country Name' },
        { field: 'activeStatus', width: 150, headerName: 'Active Status',
        align: 'center',
        headerAlign: 'center',
        disableClickEventBubbling: true,
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.portId)}><RemoveRedEye /></div>
                        <Link to={`/addSeaport/${params.row.portId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteSeaPort(params.row.portId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];
   
    const openFields = () => {
        setOpenModal(true)
        history.push("/addSeaport")
    }
    useEffect(() => {
        dispatch(SeaPortList())
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
        dispatch(DeleteSeaPortList(id))
    }
    const OnChangeStatus=(id,status)=>{
        dispatch(SeaPortStatus(id,status))
    }
    return (
        <div>

            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Seaport"} count='20,000' heading={'Seaport'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Seaport"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewSeaport CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}