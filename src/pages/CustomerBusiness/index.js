import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCountry from './viewcustomerBusiness';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteCustomerBusinessNatureList, getCustomerBusinessNatureList } from '../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';

export default function CustomerBusinessDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetCustomerBusiness = useSelector((state) => state.CustomerBusinessReducer.GetCustomerBusinessList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'customerId', width: 160, headerName: 'Id' },
        { field: 'customerBusiness', width: 260, headerName: 'Customer Business Nature' },
        { field: 'type', width: 200, headerName: 'Type' },
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
                        {/* <div className="eyeSymbol" onClick={() => viewModal(params.row.customerId)}><RemoveRedEye /></div> */}
                        <Link to={`/addCustomerBusiness?user_id=${params.row.customerId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCountry(params.row.customerId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];
    useEffect(() => {
        dispatch(getCustomerBusinessNatureList("All"))
    }, [])

    useEffect(() => {
        let rows = [];
        GetCustomerBusiness?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    customerId: items.id,
                    customerBusiness: items.name,
                    type: items.type,
                }
            )
        })
        setRowData(rows)
    }, [GetCustomerBusiness])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCustomerBusiness")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteCustomerBusinessNatureList(id))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"Customer Business"} count='20,000' heading={'Customer Business'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Customer Business"}
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