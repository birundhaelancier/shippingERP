import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import { useDispatch, useSelector } from 'react-redux';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import CustomTable from '../../../components/CustomTable'
import { Get_Vendor_List,SendRateRequest } from '../../../Redux/Action/ShipmentAction/EnquiryAction'
import { getCustomerBusinessNatureList } from '../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default function RateRequest(props) {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory();
    let dispatch = useDispatch();
    let location=useLocation()
    // const params = new URLSearchParams(location?.search);
    // const user_id = location?.get('user_id');
    // const params = new URLSearchParams(location);
    console.log("checkkkkk",queryString.parse(location.search))
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'vendor_name', width: 100, headerName: 'Vendor Name' },
        { field: 'vendor_email', width: 160, headerName: 'Vendor Email' },
        { field: 'mobile_number', width: 160, headerName: 'Mobile Number' },
    ]
    const [rowData, setRowData] = useState([])
    const ViewBusiness = useSelector((state) => state.CustomerBusinessReducer.GetCustomerBusinessList);
    const ViewVendorList = useSelector((state) => state.EnquiryReducer.Vendor_list);
    const [FieldModal, setFieldModal] = useState(false);
    const [vendorId,setvendorId]=useState()
    const [profileDetails, setprofileDetails] = useState({
        vendorType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
     
    })

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )
    const [value, setValue] = useState();
    const [businessNature, setbusinessNature] = useState([])


    useEffect(() => {
        dispatch(getCustomerBusinessNatureList(1))  
    }, [])
    useEffect(() => {
        let rows = [];
        ViewVendorList?.map((items, index) => {
            rows.push(
                {
                    id: index + 1,
                    vendor_name: items.company_name,
                    vendor_email: items.email,
                    mobile_number: items.mobile
                }
            )
        })
        setRowData(rows)
      console.log(ViewVendorList,"ViewVendorList")

    }, [ViewVendorList])

    useEffect(() => {
        let customerLists = []
        ViewBusiness?.map((data) => {
            if (data.type === 'Vendor') {
                customerLists.push({ id: data.id, value: data.name })
            }
        })
        setbusinessNature(customerLists)
    }, [ViewBusiness])


    const Validation = (data, key, list) => {
        if(key&&data){
        dispatch(Get_Vendor_List(data))
        }
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            profileDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: profileDetails[key].validation,
        };

        setprofileDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            showList.push(obj)
            setShowList((prevState) => ([
                ...prevState,
            ]));
        }
    }
    const SendMailRequest=()=>{
        SendRateRequest(13,vendorId).then((res) => {
            
        })
    }
    console.log("vendorId")
    return (
        <div>
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Vendor Type"
                        dropdown={businessNature}
                        changeData={(data) => Validation(data, "vendorType")}
                        value={profileDetails.vendorType.value}
                        error={profileDetails.vendorType.error}
                        errmsg={profileDetails.vendorType.errmsg}
                    />
                </Grid>

                {/* <Grid item xs={12} md={10} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add More Details' />
                </Grid> */}
                {profileDetails.vendorType.value && 
                <>
                <div style={{width:"100%"}}>
                <CustomTable
                    rowData={rowData}
                    columnData={columnss}
                    hideHeader={true}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                    Checkboxselection={(id)=>setvendorId(id)}
                />
                </div>
                {vendorId &&<div><CustomButton btnName={"Send Mail"} custombtnCSS={"Primary"} onBtnClick={SendMailRequest} /></div>}
                </>
                }
                {/* 
                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={10} sx={12} sm={12}>
                            <Labelbox type={data.type}
                                labelname={data.labelName}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })} */}

            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} />
            </Grid>
        </div>
    );
}