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
import { useDispatch, useSelector } from 'react-redux'
import { EditAirPort,AddAirPort,ViewAirPortDetails } from '../../../Redux/Action/EnquiryGroupAction/AirPortAction'
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


export default function GeneralInfo() {
    let history = useHistory()
    let dispatch=useDispatch()
    let { id } =useParams()
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    
    const [FieldModal, setFieldModal] = useState(false);
    const ViewAirList = useSelector((state) => state.AirPortReducer.ViewAirPortDetails);
    const GetCountryList  = useSelector((state) => state.CountryReducer.GetCountryList);
    const [CountryList,setCountryList]=useState([])
    const [Refresh,setRefresh]=useState(false)
    const [AirportInfo, setAirportInfo] = useState({
        portId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        portCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        portName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },      
    })

    useEffect(() => {
        dispatch(ViewAirPortDetails(id))
        dispatch(getCountryList())
    }, [id])

    useEffect(() => {
    if(ViewAirList){
        AirportInfo.portId.value = ViewAirList[0]?.id || ""
        AirportInfo.portCode.value = ViewAirList[0]?.code || ""
        AirportInfo.portName.value = ViewAirList[0]?.name || ""
        AirportInfo.countryId.value = ViewAirList[0]?.country || ""
        }
    }, [ViewAirList])
    useEffect(()=>{
        let country=[]
        GetCountryList.map((data)=>{
            country.push({id:data.id,value:data.name})
        }) 
        setCountryList(country)
    },[GetCountryList])

    const Validation = (data, key, list) => {
     
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            AirportInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: AirportInfo[key].validation,
        };

        setAirportInfo(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(AirportInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                AirportInfo[targetkeys[i]].value,
                AirportInfo[targetkeys[i]].validation
            );
            AirportInfo[targetkeys[i]].error = !errorcheck.state;
            AirportInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = AirportInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => AirportInfo[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (id) {
                dispatch(EditAirPort(AirportInfo, id)).then(()=>{
                    history.push("/airport")
                    HandleCancel()
                })
            } else {
                dispatch(AddAirPort(AirportInfo)).then(()=>{
                    history.push("/airport")
                    HandleCancel()
                })
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey =Object.keys(AirportInfo)
        SalesKey.map((data) => {
            AirportInfo[data].value = ""
        })
        setAirportInfo(prevState => ({
            ...prevState,
        }));
    }

    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            // showList.push(obj)
            // setShowList((prevState) => ([
            //     ...prevState,
            // ]));
        }
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Air Port Id"
                        changeData={(data) => Validation(data, "portId")}
                        value={AirportInfo.portId.value}
                        error={AirportInfo.portId.error}
                        errmsg={AirportInfo.portId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Air Port Code"
                        changeData={(data) => Validation(data, "portCode")}
                        value={AirportInfo.portCode.value}
                        error={AirportInfo.portCode.error}
                        errmsg={AirportInfo.portCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Air Port Name"
                        changeData={(data) => Validation(data, "portName")}
                        value={AirportInfo.portName.value}
                        error={AirportInfo.portName.error}
                        errmsg={AirportInfo.portName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryId")}
                        value={AirportInfo.countryId.value}
                        error={AirportInfo.countryId.error}
                        errmsg={AirportInfo.countryId.errmsg}
                        dropdown={CountryList}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container >
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onSubmit={HandleCancel}/>
            </Grid>
        </div>
    );
}