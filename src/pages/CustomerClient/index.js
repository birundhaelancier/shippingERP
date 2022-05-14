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

    const GetCustomerList = useSelector((state) => state.CustomerReducer.GetCustomerList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'customerId', width: 180, headerName: 'Customer Id' },
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
                        <Link to={`/addCustomer?user_id=${params.row.Id}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCustomer(params.row.Id)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    const test = [{ id: 1, Id: 1, customerId: "101", companyName: "test", mobile: '78765467654', email: 'test@gmail.com' },
    { id: 2, Id: 1, customerId: "102", companyName: "dfgh", mobile: '09876545645', email: 'uyg@gmail.com' },
    { id: 3, Id: 1, customerId: "103", companyName: "oij", mobile: '34356577655', email: 'ghj@gmail.com' },
    { id: 4, Id: 1, customerId: "104", companyName: "cvb", mobile: '98765485588', email: 'i87t@gmail.com' },
    { id: 5, Id: 1, customerId: "105", companyName: "iuy", mobile: '80765432354', email: 'nhg@gmail.com' },
    { id: 6, Id: 1, customerId: "106", companyName: "bnk", mobile: '87654334545', email: 'tuytest@gmail.com' }]
    const [rowData, setRowData] = useState(test)
    useEffect(() => {
        dispatch(getCustomerList("All"))
    }, [])

    // useEffect(() => {
    //     let rows = [];
    //     console.log(GetCustomerList, 'GetCustomerList')
    //     GetCustomerList?.map((items, index) => {
    //         rows.push(
    //             {
    //                 id: index + 1,
    //                 customerId: items.code,
    //                 // customerCode: items.code,
    //                 companyName: items.company_name,
    //                 mobile: items.phone,
    //                 email: items.email,
    //                 // activeStatus: items.status,
    //                 Id: items.id
    //             }
    //         )
    //     })
    //     setRowData(rows)
    // }, [GetCustomerList])

    // const test = 

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

    const onSearch = (item) => {
        const productSearch = test.filter((data) => {
            console.log(item, "Search_data")
            if (item === null)
                return data

            else if (data.customerId !== null && data.customerId.toLowerCase().includes(item.toLowerCase())
                || (data.companyName != null && data.companyName.toLowerCase().includes(item.toLowerCase()))
                || (data.mobile != null && data.mobile.toLowerCase().includes(item.toLowerCase()))
                || (data.email != null && data.email.toLowerCase().includes(item.toLowerCase()))
            ) {
                return data
            }
        })
        console.log(productSearch, 'productSearch')
        setRowData(productSearch)
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Master"} count='20,000' heading={'Customer'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                    onSearch={(data) => onSearch(data)}
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