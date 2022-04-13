import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewState from './viewstate';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteStateList, getStateList } from '../../Redux/Action/stateAction';
import { useDispatch, useSelector } from 'react-redux';

// import './customer.css';

export default function StateDetails() {
    let dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const GetStateList  = useSelector((state) => state.StateReducer.GetStateList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'stateId', width: 170, headerName: 'State Id' },
        { field: 'stateName', width: 170, headerName: 'State Name' },
        { field: 'countryName', width: 170, headerName: 'Country Name' },
        { field: 'activeStatus', width: 200, headerName: 'Active Status' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.stateId)}><RemoveRedEye /></div>
                        <Link to={`/addState?user_id=${params.row.stateId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteCountry(params.row.stateId)}><Delete /></div>
                        <div><CustomSwitch size='small' /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getStateList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetStateList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    stateId: items.id,
                    stateName: items.name,
                    countryName: items.country_name,
                    activeStatus: items.status  === 1 ? "Active" : "In-Active",
                }
            )
        })
        setRowData(rows)
    },[GetStateList])
    console.log(GetStateList, 'GetStateList');

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addState")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry=(id)=>{
        dispatch(DeleteStateList(id))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"State"} count='20,000' heading={'States'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"State"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewState CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}