import react, { useState,useEffect } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../components/ContentHeader';
import CustomButton from '../../components/Button';
import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
import DynModel from '../../components/CustomModal';
import ViewLicense from './viewlicense';
import CustomTable from '../../components/CustomTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector,useDispatch } from 'react-redux'
import { LicenseList,DeleteLicenseList } from '../../Redux/Action/LicenceAction'
// import './customer.css';

export default function LicenseDetails() {
    const [openModal, setOpenModal] = useState(false);
    let dispatch=useDispatch()
    const GetLicenseList  = useSelector((state) => state.LicenseReducer.GetLicenseList);
    const [rowData, setRowData] = useState([])
    const [GetId, setGetId] = useState(null);
    const columnss = [
        { field: 'id', width: 100, headerName: 'S.No' },
        { field: 'licenseId', width: 150, headerName: 'License Id' },
        { field: 'registrationNo', width: 200, headerName: 'Registration No' },
        { field: 'registrationDate', width: 200, headerName: 'Registration Date' },
        { field: 'licenseType', width: 200, headerName: 'License Type' },
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
                        <div className="eyeSymbol" onClick={() => setOpenModal(true)}><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>
                        {/* <div className="deleteSymbol"><Delete /></div> */}
                    </div>
                );
            }
        }
    ];

    let history = useHistory()
    const openFields = () => {
        setOpenModal(true)
        history.push("/addLicense")
    }
    useEffect(() => {
        dispatch(LicenseList())
    }, [])

    useEffect(()=>{
        let rows= [];
        GetLicenseList?.map((items,index)=>{
            rows.push(
                {
                    id: index+1,
                    sectionName: items.section_name,
                    chapterName: items.chapter_name,
                    hsnCode:items.hsn_code,
                    // description:items.description,
                    status:items.status,
                    sec_Id:items.id
                }
            )
        })
        setRowData(rows)
    },[GetLicenseList])

  
    const viewModal = (id) =>{
        setOpenModal(true)
        setGetId(id)
    }
    const deleteSeaPort=(id)=>{
        dispatch(DeleteLicenseList(id))
    }
    // const OnChangeStatus=(id,status)=>{
    //     dispatch(LicenseStatus(id,status))
    // }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <ContentHeader openFields mainTitle={"License"} count='20,000' heading={'License'} />
            </Grid>
            <>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    onclickEye={(data) => setOpenModal(data)}
                    onAddBtnClick={openFields}
                />
                <DynModel handleChangeModel={openModal} modelTitle={"License"}
                    modalchanges="recruit_modal_css" handleChangeCloseModel={() => setOpenModal(false)} width={800} content={
                        <>
                            <ViewLicense CloseModal={(bln) => setOpenModal(bln)} />
                        </>
                    }
                />
            </>
        </div>
    );
}