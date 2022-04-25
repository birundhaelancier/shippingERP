import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewVendor from './viewvendor';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteVendorList, VendorStatus, getVendorList } from '../../Redux/Action/GeneralGroupAction/VendorAction';

// import './Vendor.css';

export default function VendorClient() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetVendorList = useSelector((state) => state.VendorReducer.GetVendorList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 50, headerName: 'S.No' },
        { field: 'vendorId', width: 130, headerName: 'Vendor Id' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 140, headerName: 'Phone No' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.vendorId)}><RemoveRedEye /></div>
                        <Link to={`/addVendor?user_id=${params.row.vendorId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteVendor(params.row.vendorId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        dispatch(getVendorList("All"))
    }, [])

    useEffect(() => {
        let rows = [];
        console.log(GetVendorList, 'GetVendorList')
        GetVendorList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    vendorId: items.id,
                    companyName: items.company_name,
                    mobile: items.phone,
                    email: items.email,
                    activeStatus: items.status,
                }
            )
        })
        setRowData(rows)
    }, [GetVendorList])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addVendor")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteVendor = (id) => {
        dispatch(DeleteVendorList(id))
    }
    const OnChangeStatus = (id, status) => {
        dispatch(VendorStatus(id, status))
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader userTitle="This is your Dashboard" userName='Hello Thomas' openFields mainTitle={"Vendor"} count='20,000' heading={'Vendors'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"Vendor"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewVendor CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}