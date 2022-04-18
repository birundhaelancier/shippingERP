import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewVehicle from './viewvehicle';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteVehicleList, VehicleList, VehicleStatus } from '../../Redux/Action/TransportGroupAction/VehicleAction';
import { useDispatch, useSelector } from 'react-redux';

// import './customer.css';

export default function VehicleDetails() {
    let dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const GetVehicle = useSelector((state) => state?.VehicleReducer?.GetVehicleList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'vehicleId', width: 150, headerName: 'Vehicle Id' },
        { field: 'vehicleName', width: 200, headerName: 'Vehicle Name' },
        { field: 'bodyType', width: 200, headerName: 'Body Type' },
        {
            field: 'activityStatus', width: 200, headerName: 'Activity Status',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.vehicleId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.vehicleId)}><RemoveRedEye /></div>
                        <Link to={`/addVehicle?user_id=${params.row.vehicleId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCountry(params.row.vehicleId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(VehicleList())
    }, [])

    useEffect(() => {
        let rows = [];
        console.log(GetVehicle, 'GetVehicle')
        GetVehicle?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    vehicleId: items.id,
                    vehicleName: items.name,
                    bodyType: items.body_type,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetVehicle])

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addVehicle")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteVehicleList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(VehicleStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Vehicle"} count='20,000' heading={'Vehicle'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Vehicle"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewVehicle CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}