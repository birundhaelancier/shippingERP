import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewBusiness from './viewbusiness';
import CustomTable from '../../components/CustomTable';
import { useHistory,Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch,useSelector } from 'react-redux'
import  CustomSwitch  from '../../components/SwitchBtn'
import { BusinessScopeList,DeleteBusinessScopeList,BusinessScopeStatus } from '../../Redux/Action/EnquiryGroupAction/BusinessScopeActions'
// import './customer.css';

export default function BusinessDetails() {
    const [openModal, setOpenModal] = useState(false);
    let dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const GetDataList  = useSelector((state) => state.BusinessScopeReducer.GetBusinessScopeList);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'businessId', width: 150, headerName: 'Business Scope Id' },
        { field: 'businessCode', width: 160, headerName: 'Business Scope Code' },
        { field: 'businessName', width: 160, headerName: 'Business Scope Name' },
        // { field: 'description', width: 150, headerName: 'Description' },
        { field: 'activeStatus', width: 160, headerName: 'Active Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.businessId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.businessId)}><RemoveRedEye /></div>
                        <Link to={`/addBusiness/${params.row.businessId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteScope(params.row.businessId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];


    const rows = [
        { id: 1, businessName: '1', businessId: "1", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 2, businessName: '2', businessId: "2", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 3, businessName: '3', businessId: "3", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 4, businessName: '1', businessId: "5", businessCode: 'India', description: '56', activeStatus: "pending" },
        { id: 5, businessName: '2', businessId: "4", businessCode: 'India', description: '56', activeStatus: "pending" },
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addBusiness")
    }
    
    useEffect(() => {
        dispatch(BusinessScopeList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetDataList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    businessId: items.id,
                    businessCode: items.code,
                    businessName: items.name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    },[GetDataList])


    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteScope=(id)=>{
        dispatch(DeleteBusinessScopeList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(BusinessScopeStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Business"} count='20,000' heading={'Business'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Business"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewBusiness CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}