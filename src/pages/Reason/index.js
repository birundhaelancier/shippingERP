import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewReason from './viewreason';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux'
import { ReasonList, ReasonStatus, DeleteReasonList } from '../../Redux/Action/EnquiryGroupAction/ReasonAction';
// import './customer.css';

export default function ReasonDetails() {
    let dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const GetReasonList = useSelector((state) => state.ReasonReducer.GetReasonList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'reasonId', width: 230, headerName: 'Reason Id' },
        { field: 'reasonName', width: 230, headerName: 'Reason Type' },
        { field: 'activeStatus', width: 230, headerName: 'Active Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.reasonId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
                </div>
            );
        }
    },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 230,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <div className="eyeSymbol" onClick={() => viewModal(params.row.portId)}><RemoveRedEye /></div> */}
                    <Link to={`/addReason?user_id=${params.row.reasonId}&&reasonName=${params.row.reasonName}`} className="editSymbol" ><Edit /></Link>
                    <div className="deleteSymbol" onClick={() => deleteSeaPort(params.row.reasonId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addReason")
    }
    useEffect(() => {
        dispatch(ReasonList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetReasonList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    reasonId: items.id,
                    reasonName: items.name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)    
    }, [GetReasonList])


    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort = (id) => {
        dispatch(DeleteReasonList(id)) 
    }
    const OnChangeStatus = (id, status) => {
        dispatch(ReasonStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Reason"} count='20,000' heading={'Reason'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Reason"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewReason CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}