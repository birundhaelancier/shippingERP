import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryList } from '../../Redux/Action/GeneralGroupAction/countryAction';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCountry from './viewcountry';
import CustomTable from '../../components/CustomTable';

import CustomSwitch from '../../components/SwitchBtn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteCountryList, CountryStatus } from '../../Redux/Action/GeneralGroupAction/countryAction';


// import './customer.css';

export default function CountryDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetCountryList  = useSelector((state) => state.CountryReducer.GetCountryList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'countryId', width: 150, headerName: 'Country Id' },
        { field: 'countryName', width: 200, headerName: 'Country Name' },
        { field: 'countryCode', width: 150, headerName: 'Country Code' },
        { field: 'activeStatus', width: 200, headerName: 'Active Status',
          renderCell: (params) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomSwitch size='small' onSwitchChange={() => OnChangeStatus(params.row.countryId, params.row.activeStatus === 1 ? 0 : 1)} checked={params.row.activeStatus === 1 ? true : false} />
                </div>
            );
        }
    },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 200,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.countryId)}><RemoveRedEye /></div>
                        <Link to={`/addCountry?user_id=${params.row.countryId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={()=>deleteCountry(params.row.countryId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];
    useEffect(() => {
        dispatch(getCountryList(1))
    }, [])

    useEffect(()=>{
        let rows= [];
        GetCountryList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    countryId: items.id,
                    countryName: items.name,
                    countryCode: items.code,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    },[GetCountryList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCountry")
    }
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry=(id)=>{
        dispatch(DeleteCountryList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CountryStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Country"} count='20,000' heading={'Country'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Country"}
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