import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewLead from './viewlead';
import CustomTable from '../../components/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteLeadList, LeadList } from '../../Redux/Action/SalesGroupAction/LeadAction';
// import './customer.css';

export default function LeadDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetLeadList = useSelector((state) => state?.LeadReducer?.GetLeadList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'leadId', width: 150, headerName: 'Lead Id' },
        { field: 'companyName', width: 200, headerName: 'Company Name' },
        { field: 'companyAddress', width: 200, headerName: 'Company Address' },
        { field: 'email', width: 200, headerName: 'Email' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.leadId)}><RemoveRedEye /></div>
                        <Link to={`/addLead?user_id=${params.row.leadId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteLead(params.row.leadId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];


    useEffect(() => {
        dispatch(LeadList("All"))
    }, [])

    useEffect(()=>{
        let rows= [];
        GetLeadList?.map((items,index) => {
            rows.push(
                {
                    id: index+1,
                    leadId: items.id,
                    companyName: items.company_name,
                    companyAddress: items.company_address,
                    email: items.email,
                }
            )
        })
        setRowData(rows)
    },[GetLeadList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addLead")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteLead=(id)=>{
        dispatch(DeleteLeadList(id))
    }

    console.log(rowData, 'rowData');
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Lead"} count='20,000' heading={'Lead'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Lead"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewLead CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}