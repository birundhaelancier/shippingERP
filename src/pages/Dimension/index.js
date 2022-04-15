import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewDimension from './viewdimension';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux'
import { DimensionList, DimensionStatus, DeleteDimensionList } from '../../Redux/Action/EnquiryGroupAction/DimensionAction';


// import './customer.css';

export default function DimensionDetails() {
    let dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false);
    const GetDimensionList = useSelector((state) => state.DimensionReducer.GetDimensionList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 130, headerName: 'S.No' },
        { field: 'dimensionId', width: 230, headerName: 'Dimension Id' },
        { field: 'dimensionName', width: 230, headerName: 'Dimension Type' },
        { field: 'activeStatus', width: 230, headerName: 'Active Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.dimensionId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
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
                        <Link to={`/addDimension?user_id=${params.row.dimensionId}&&dimensionName=${params.row.dimensionName}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteSeaPort(params.row.dimensionId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];


    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addDimension")
    }
    useEffect(() => {
        dispatch(DimensionList())
    }, [])

    useEffect(() => {
        let rows = [];
        GetDimensionList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    dimensionId: items.id,
                    dimensionName: items.name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)    
    }, [GetDimensionList])


    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort = (id) => {
        dispatch(DeleteDimensionList(id)) 
    }
    const OnChangeStatus = (id, status) => {
        dispatch(DimensionStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Dimension"} count='20,000' heading={'Dimension'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Dimension"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewDimension CloseModal={(bln) => setOpenModal(bln)}  GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}