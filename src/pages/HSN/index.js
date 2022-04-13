import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewHsn from './viewhsn';
import CustomTable from '../../components/CustomTable';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch,useSelector } from 'react-redux'
import { DeleteHsnList,HsnList,HsnStatus } from '../../Redux/Action/HsnAction'
import  CustomSwitch  from '../../components/SwitchBtn'
// import './customer.css';

export default function CurrencyDetails() {
    const [openModal, setOpenModal] = useState(false);
    let dispatch=useDispatch()
    const GetHsnList  = useSelector((state) => state.HsnReducer.GetHsnList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        // { field: 'sec_Id', width: 100, headerName: 'Id' },
        { field: 'sectionName', width: 180, headerName: 'Section Name' },
        { field: 'chapterName', width: 180, headerName: 'Chapter Name' },
        { field: 'hsnCode', width: 180, headerName: 'HSN Code' },
        // { field: 'description', width: 180, headerName: 'Description' },
        { field: 'status', width: 180, headerName: 'Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch  size='small'  onSwitchChange={()=>OnChangeStatus(params.row.sec_Id,params.row.status===1?0:1)} checked={params.row.status===1?true:false} /> 
                </div>
            );
        } 
        },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 200,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.sec_Id)}><RemoveRedEye /></div>
                        <Link to={`/addHsn/${params.row.sec_Id}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteSeaPort(params.row.sec_Id)}><Delete /></div>
                    </div>
                  
                );
            }
        }
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addHsn")
    }
    useEffect(() => {
        dispatch(HsnList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetHsnList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    sectionName: items.section_name,
                    chapterName: items.chapter_name,
                    hsnCode:items.hsn_code,
                    // description:items.description,
                    status:items.status,
                    sec_Id:items.id
                }
            )
        })
        setRowData(rows)
    },[GetHsnList])

  
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort=(id)=>{
        dispatch(DeleteHsnList(id))
    }
    const OnChangeStatus=(id,status)=>{
        dispatch(HsnStatus(id,status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <ContentHeader openFields mainTitle={"HSN Code"} count='20,000' heading={'HSN Code'} />
               
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"HSN Code"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewHsn CloseModal={(bln) => setOpenModal(bln)} GetId={GetId}/>
                        </>
                    }
                />
            </>
        </div>
    );
}