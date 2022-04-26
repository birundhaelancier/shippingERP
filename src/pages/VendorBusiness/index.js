import react, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewCountry from './viewvendorBusiness';
import CustomTable from '../../components/CustomTable';
import CustomSwitch from '../../components/SwitchBtn';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { DeleteVendorBusinessNatureList, getVendorBusinessNatureList } from '../../Redux/Action/GeneralGroupAction/vendorBusinessAction';

export default function VendorBusinessDetails() {
    let dispatch = useDispatch();
    let history = useHistory()
    const [rowData, setRowData] = useState([])
    const GetVendorBusiness = useSelector((state) => state.VendorBusinessReducer.GetVendorBusinessList);
    const [openModal, setOpenModal] = useState(false);
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'vendorId', width: 200, headerName: 'Id' },
        { field: 'vendorBusiness', width: 200, headerName: 'Vendor Business Nature' },
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
                        <div className="eyeSymbol" onClick={() => viewModal(params.row.vendorId)}><RemoveRedEye /></div>
                        <Link to={`/addVendorBusiness?user_id=${params.row.vendorId}`} className="editSymbol" ><Edit /></Link>
                        <div className="deleteSymbol" onClick={() => deleteCountry(params.row.vendorId)}><Delete /></div>
                    </div>
                );
            }
        }
    ];
    useEffect(() => {
        dispatch(getVendorBusinessNatureList("All"))
    }, [])

    useEffect(() => {
        let rows = [];
        GetVendorBusiness?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    vendorId: items.id,
                    vendorBusiness: items.name,
                }
            )
        })
        setRowData(rows)
    }, [GetVendorBusiness])

    const openFields = () => {
        setOpenModal(true)
        history.push("/addVendorBusiness")
    }
    const viewModal = (id) => {
        setOpenModal(true)
        setGetId(id)
    }
    const deleteCountry = (id) => {
        dispatch(DeleteVendorBusinessNatureList(id))
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