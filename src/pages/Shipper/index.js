import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewShipper from './viewshipper';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteShipperList, ShipperStatus, getShipperList } from '../../Redux/Action/GeneralGroupAction/shipperAction';

// import './Shipper.css';

export default function ShipperDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetShipperList  = useSelector((state) => state.ShipperReducer.GetShipperList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);

    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'shipperId', width: 130, headerName: 'Shipper Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
        { field: 'status', width: 120, headerName: 'Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.shipperId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                    <div className="eyeSymbol" onClick={() => viewModal(params.row.shipperId)}><RemoveRedEye /></div>
                    <Link to={`/addShipper?user_id=${params.row.shipperId}`} className="editSymbol" ><Edit /></Link>
                    <div className="deleteSymbol" onClick={()=>deleteShipper(params.row.shipperId)}><Delete /></div>
                </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getShipperList("All"))
    }, [])

    useEffect(()=>{
        let rows= [];
        GetShipperList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    shipperId: items.id,
                    companyName: items.company_name,
                    mobile: items.phone,
                    email: items.email,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    },[GetShipperList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addShipper")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteShipper=(id)=>{
        dispatch(DeleteShipperList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(ShipperStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Shipper"} count='20,000' heading={'Shippers'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Shipper"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewShipper CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}