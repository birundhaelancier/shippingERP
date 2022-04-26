import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment'
import { ViewLicenseDetails,AddLicense,EditLicense } from '../../../Redux/Action/EnquiryGroupAction/LicenceAction'

export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const ViewLicenseList = useSelector((state) => state.LicenseReducer.ViewLicenseDetails);
    let dispatch=useDispatch()
    let { id } =useParams()
    const [FieldModal, setFieldModal] = useState(false);
    const [LicenseDetails, setLicenseDetails] = useState({
  
        reg_no: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        reg_date: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_type: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        unit_qty: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        port_of_license: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        total_cif: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        total_debit_qty: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        total_debit_duty:{
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        total_fc: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        currency_symbol: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_currency: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        exchange_rate: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        party_name: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_no: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_date: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
        license_item: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,type:"text"
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: 'text', label: 'License Id',value:"", validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Registration No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Registration Date', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Type', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Item No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Unit Qty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Port of License', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total CIF Value', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total Debit Duty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total Debit Qty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total FC Value', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Currency Symbol', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Currency', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Exchange Rate', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Party Name', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Description', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Date', validation: ["required"], arrVal: [] },

        ]
    )
    const [List,setList]=useState()
    useEffect(() => {
        dispatch(ViewLicenseDetails(id))
    }, [id])

    useEffect(() => {
    if(id){
        LicenseDetails.total_fc.value = ViewLicenseList[0]?.fc_value || ""
        LicenseDetails.reg_no.value = ViewLicenseList[0]?.reg_no || ""
        LicenseDetails.reg_date.value = ViewLicenseList[0]?.d_date ? moment(ViewLicenseList[0]?.d_date).format("MM-DD-YYYY"):""
        LicenseDetails.license_item.value = ViewLicenseList[0]?.item_no || ""
        LicenseDetails.unit_qty.value = ViewLicenseList[0]?.unit_qty || ""
        LicenseDetails.port_of_license.value = ViewLicenseList[0]?.part_license ||""
        LicenseDetails.total_cif.value = ViewLicenseList[0]?.cif_value || ""
        LicenseDetails.total_debit_duty.value = ViewLicenseList[0]?.debit_duty || ""
        LicenseDetails.total_debit_qty.value = ViewLicenseList[0]?.debit_qty || ""
        LicenseDetails.currency_symbol.value = ViewLicenseList[0]?.currency_sym || ""
        LicenseDetails.license_currency.value = ViewLicenseList[0]?.currency || ""
        LicenseDetails.party_name.value = ViewLicenseList[0]?.party_name || ""
        LicenseDetails.license_description.value = ViewLicenseList[0]?.description || ""
        LicenseDetails.license_no.value = ViewLicenseList[0]?.license_no || ""
        LicenseDetails.license_date.value =ViewLicenseList[0]?.license_date? moment(ViewLicenseList[0]?.license_date).format("MM-DD-YYYY"):"" 
        LicenseDetails.exchange_rate.value = ViewLicenseList[0]?.exchange_rate || ""
        LicenseDetails.license_type.value = ViewLicenseList[0]?.type || ""
        
        }
    }, [ViewLicenseList])
  

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(LicenseDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                LicenseDetails[targetkeys[i]].value,
                LicenseDetails[targetkeys[i]].validation
            );
            LicenseDetails[targetkeys[i]].error = !errorcheck.state;
            LicenseDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = LicenseDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => LicenseDetails[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            if (id) {
                dispatch(EditLicense(LicenseDetails,id)).then(()=>{
                    HandleCancel()
                })
            } else {
                dispatch(AddLicense(LicenseDetails)).then(()=>{
                    HandleCancel()
                })
            }

        }
        setLicenseDetails(prevState => ({
            ...prevState,
        }));
    }
    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            LicenseDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: LicenseDetails[key].validation,
        };

        setLicenseDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const HandleCancel = () => {
        let SalesKey =Object.keys(LicenseDetails)
        SalesKey.map((data) => {
            LicenseDetails[data].value = ""
        })
        setLicenseDetails(prevState => ({
            ...prevState,
        }));
        history.push("/license")

    }
   

    const handleAddClick = (type) => {
        if (type === 'general') {
            setCustomerObj([...CustomerObj, { description: "", state: "", city: "" }])
        } else if (type === 'address') {
            setAddmoreObj([...AddmoreObj, { address: "", gst: "", state: "", city: "", country: "" }]);
        }
    };
    const handleRemoveClick = (type, index) => {
        if (type === 'general') {
            const list = [...CustomerObj];
            list.splice(index, 1);
            setCustomerObj(list);
        } else if (type === 'address') {
            const list = [...AddmoreObj];
            list.splice(index, 1);
            setAddmoreObj(list);
        }

    };

    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            showList.push(obj)
            setShowList((prevState) => ([
                ...prevState,
            ]));
        }
    }
    console.log(LicenseDetails,"LicenseDetails")
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Registration No"
                        changeData={(data) => Validation(data, "reg_no")}
                        value={LicenseDetails.reg_no.value}
                        error={LicenseDetails.reg_no.error}
                        errmsg={LicenseDetails.reg_no.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="Registration Date"
                        changeData={(data) => Validation(data, "reg_date")}
                        value={LicenseDetails.reg_date.value}
                        error={LicenseDetails.reg_date.error}
                        errmsg={LicenseDetails.reg_date.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="License Type"
                        changeData={(data) => Validation(data, "license_type")}
                        value={LicenseDetails.license_type.value}
                        error={LicenseDetails.license_type.error}
                        errmsg={LicenseDetails.license_type.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="License Item No"
                        changeData={(data) => Validation(data, "license_item")}
                        value={LicenseDetails.license_item.value}
                        error={LicenseDetails.license_item.error}
                        errmsg={LicenseDetails.license_item.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Unit Qty"
                        changeData={(data) => Validation(data, "unit_qty")}
                        value={LicenseDetails.unit_qty.value}
                        error={LicenseDetails.unit_qty.error}
                        errmsg={LicenseDetails.unit_qty.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Port of License"
                        changeData={(data) => Validation(data, "port_of_license")}
                        value={LicenseDetails.port_of_license.value}
                        error={LicenseDetails.port_of_license.error}
                        errmsg={LicenseDetails.port_of_license.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Total CIF Value"
                        changeData={(data) => Validation(data, "total_cif")}
                        value={LicenseDetails.total_cif.value}
                        error={LicenseDetails.total_cif.error}
                        errmsg={LicenseDetails.total_cif.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Total Debit Duty"
                        changeData={(data) => Validation(data, "total_debit_duty")}
                        value={LicenseDetails.total_debit_duty.value}
                        error={LicenseDetails.total_debit_duty.error}
                        errmsg={LicenseDetails.total_debit_duty.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Total Debit Qty"
                        changeData={(data) => Validation(data, "total_debit_qty")}
                        value={LicenseDetails.total_debit_qty.value}
                        error={LicenseDetails.total_debit_qty.error}
                        errmsg={LicenseDetails.total_debit_qty.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Total FC Value"
                        changeData={(data) => Validation(data, "total_fc")}
                        value={LicenseDetails.total_fc.value}
                        error={LicenseDetails.total_fc.error}
                        errmsg={LicenseDetails.total_fc.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Symbol"
                        changeData={(data) => Validation(data, "currency_symbol")}
                        value={LicenseDetails.currency_symbol.value}
                        error={LicenseDetails.currency_symbol.error}
                        errmsg={LicenseDetails.currency_symbol.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="License Currency"
                        changeData={(data) => Validation(data, "license_currency")}
                        value={LicenseDetails.license_currency.value}
                        error={LicenseDetails.license_currency.error}
                        errmsg={LicenseDetails.license_currency.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Exchange Rate"
                        changeData={(data) => Validation(data, "exchange_rate")}
                        value={LicenseDetails.exchange_rate.value}
                        error={LicenseDetails.exchange_rate.error}
                        errmsg={LicenseDetails.exchange_rate.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Party Name"
                        changeData={(data) => Validation(data, "party_name")}
                        value={LicenseDetails.party_name.value}
                        error={LicenseDetails.party_name.error}
                        errmsg={LicenseDetails.party_name.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="License Description"
                        changeData={(data) => Validation(data, "license_description")}
                        value={LicenseDetails.license_description.value}
                        error={LicenseDetails.license_description.error}
                        errmsg={LicenseDetails.license_description.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="License No"
                        changeData={(data) => Validation(data, "license_no")}
                        value={LicenseDetails.license_no.value}
                        error={LicenseDetails.license_no.error}
                        errmsg={LicenseDetails.license_no.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="License Date"
                        changeData={(data) => Validation(data, "license_date")}
                        value={LicenseDetails.license_date.value}
                        error={LicenseDetails.license_date.error}
                        errmsg={LicenseDetails.license_date.errmsg}
                    />
                </Grid>
                

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'}  onSaveBtn={onSubmit} onCancel={HandleCancel}/>
            </Grid>
        </div>
    );
}