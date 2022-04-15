import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCargo from './viewcargo';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { CargoList, CargoStatus, DeleteCargoList } from '../../Redux/Action/EnquiryGroupAction/CargoAction'
import { useDispatch, useSelector } from 'react-redux'
import CustomSwitch from '../../components/SwitchBtn';
// import './customer.css';

export default function CargoDetails() {
    const [openModal, setOpenModal] = useState(false);
    let dispatch = useDispatch()
    const GetCargoList = useSelector((state) => state.CargoReducer.GetCargoList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'cargoId', width: 230, headerName: 'Cargo Id' },
        { field: 'cargoName', width: 230, headerName: 'Cargo Type' },
        {
            field: 'activeStatus', width: 230, headerName: 'Active Status',
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.cargoId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                        <Link to={`/addcargo/${params.row.cargoId}/${params.row.cargoName}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteSeaPort(params.row.cargoId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];


    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCargo")
    }

    useEffect(() => {
        dispatch(CargoList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetCargoList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    cargoId: items.id,
                    cargoName: items.name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetCargoList])


    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort = (id) => {
        dispatch(DeleteCargoList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CargoStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Cargo"} count='20,000' heading={'Cargo'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Cargo"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCargo CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}