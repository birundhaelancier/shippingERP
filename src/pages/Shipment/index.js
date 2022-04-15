import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewShipment from './viewshipment';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux'
import { ShipmentList, ShipmentStatus, DeleteShipmentList } from '../../Redux/Action/EnquiryGroupAction/ShipmentAction';
// import './customer.css';

export default function ShipmentDetails() {
    let dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const GetShipmentList = useSelector((state) => state.ShipmentReducer.GetShipmentList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'shipmentId', width: 230, headerName: 'Shipments Id' },
        { field: 'shipmentName', width: 230, headerName: 'Shipments Type' },
        { field: 'activeStatus', width: 230, headerName: 'Active Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.shipmentId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                    <Link to={`/addShipment?user_id=${params.row.shipmentId}&&shipmentName=${params.row.shipmentName}`} className="editSymbol" ><Edit /></Link>
                    <div className="deleteSymbol" onClick={() => deleteSeaPort(params.row.shipmentId)}><Delete /></div>
                </div>
                );
            }
        }
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addShipment")
    }
    useEffect(() => {
        dispatch(ShipmentList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetShipmentList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    shipmentId: items.id,
                    shipmentName: items.name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)    
    }, [GetShipmentList])


    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort = (id) => {
        dispatch(DeleteShipmentList(id)) 
    }
    const OnChangeStatus = (id, status) => {
        dispatch(ShipmentStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Shipment"} count='20,000' heading={'Shipment'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Shipment"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewShipment CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}