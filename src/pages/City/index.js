import react, { useState, useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCountry from './viewcity';
import CustomTable from '../../components/CustomTable';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import CustomSwitch from '../../components/SwitchBtn';
import { DeleteCityList, getCityList, CityStatus } from '../../Redux/Action/GeneralGroupAction/cityAction';
import { useDispatch, useSelector } from 'react-redux';
// import './customer.css';

export default function CityDetails() {
    let dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const GetCityList  = useSelector((state) => state.CityReducer.GetCityList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'cityId', width: 150, headerName: 'City Id' },
        { field: 'cityName', width: 160, headerName: 'City Name' },
        { field: 'stateName', width: 160, headerName: 'State Name' },
        { field: 'countryName', width: 160, headerName: 'Country Name' },
        { field: 'activeStatus', width: 160, headerName: 'Active Status',
        renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.cityId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
                </div>
            ); },
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
                         <div className="eyeSymbol" onClick={() => viewModal(params.row.cityId)}><RemoveRedEye /></div>
                        <Link to={`/addCity?user_id=${params.row.cityId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteCountry(params.row.cityId)}><Delete /></div>
                     
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getCityList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetCityList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    cityId: items.id,
                    cityName: items.name,
                    stateName: items.state_name,
                    countryName: items.country_name,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    },[GetCityList])

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addCity")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry=(id)=>{
        dispatch(DeleteCityList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CityStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"City"} count='20,000' heading={'City'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"City"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCountry CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}