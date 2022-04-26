import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCustomer from './viewcustomer';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteCustomerList, CustomerStatus, getCustomerList } from '../../Redux/Action/GeneralGroupAction/customerAction';

// import './customer.css';

export default function CustomerClient() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetCustomerList = useSelector((state) => state.CustomerReducer.GetCustomerList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'customerId', width: 180, headerName: 'Customer Id'},
        { field: 'customerCode', width: 150, headerName: 'Customer Code' },
        { field: 'companyName', width: 200, headerName: 'Company Name' },
        { field: 'mobile', width: 200, headerName: 'Phone No' },
        { field: 'email', width: 200, headerName: 'Email ID' },
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
                        {/* <div className="eyeSymbol" onClick={() => viewModal(params.row.customerId)}><RemoveRedEye /></div> */}
                        <Link to={`/addCustomer?user_id=${params.row.customerId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCustomer(params.row.customerId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getCustomerList("All"))
    }, [])

    useEffect(() => {
        let rows = [];
        console.log(GetCustomerList, 'GetCustomerList')
        GetCustomerList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    customerId: items.id,
                    customerCode: items.code,
                    companyName: items.company_name,
                    mobile: items.phone,
                    email: items.email,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetCustomerList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addCustomer")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCustomer = (id) => {
        dispatch(DeleteCustomerList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(CustomerStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Customer"} count='20,000' heading={'Customers'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Customer"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewCustomer CloseModal={(bln) => setOpenModal(bln)} GetId={GetId} />
                        </>
                    }
                />
            </>
        </div>
    );
}