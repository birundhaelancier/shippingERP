import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewConsignee from './viewconsignee';
import CustomTable from '../../components/CustomTable';
import QuickSearchToolbar from '../../components/SearchBar';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteConsigneeList, ConsigneeStatus, getConsigneeList } from '../../Redux/Action/GeneralGroupAction/consigneeAction';

// import './consignee.css';

export default function ConsigneeDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetConsigneeList = useSelector((state) => state.ConsigneeReducer.GetConsigneeList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'consigneeId', width: 130, headerName: 'Consignee Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
        {
            field: 'activeStatus', width: 120, headerName: 'Status',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.consigneeId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
                    </div>
                );
            }
        },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 90,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.consigneeId)}><RemoveRedEye /></div>
                        <Link to={`/addConsignee?user_id=${params.row.consigneeId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteConsignee(params.row.consigneeId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getConsigneeList("All"))
    }, [])

    useEffect(() => {
        let rows = [];
        GetConsigneeList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    consigneeId: items.id,
                    companyName: items.company_name,
                    mobile: items.phone,
                    email: items.email,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetConsigneeList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addConsignee")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteConsignee = (id) => {
        dispatch(DeleteConsigneeList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(ConsigneeStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Consignee"} count='20,000' heading={'Consignees'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Consignee"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewConsignee CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}