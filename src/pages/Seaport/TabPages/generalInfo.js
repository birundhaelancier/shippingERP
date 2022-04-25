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
import { EditSeaPort,AddSeaPort,ViewSeaPortDetails,SeaPortStatus } from '../../../Redux/Action/EnquiryGroupAction/Seaports'
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
export default function GeneralInfo({portId}) {
    let history = useHistory()
    let dispatch=useDispatch()
    let { id }=useParams()
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    const [Refresh, setRefresh] = useState(false);
    const ViewSeaList = useSelector((state) => state.SeaPortReducer.ViewSeaDetails);
    const GetCountryList  = useSelector((state) => state.CountryReducer.GetCountryList);
    const [FieldModal, setFieldModal] = useState(false);
    const [CountryList,setCountryList]=useState([])
    const [seaportInfo, setseaportInfo] = useState({

      
        portCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        portName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
   

    })
    useEffect(() => {
        dispatch(ViewSeaPortDetails(id))
        dispatch(getCountryList())
    }, [id])

    useEffect(() => {
    if(ViewSeaList){
        seaportInfo.portCode.value = ViewSeaList[0]?.code || ""
        seaportInfo.portName.value = ViewSeaList[0]?.name || ""
        seaportInfo.countryName.value = ViewSeaList[0]?.country || ""
        }
    }, [ViewSeaList])
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
            seaportInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: seaportInfo[key].validation,
        };

        setseaportInfo(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(seaportInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                seaportInfo[targetkeys[i]].value,
                seaportInfo[targetkeys[i]].validation
            );
            seaportInfo[targetkeys[i]].error = !errorcheck.state;
            seaportInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = seaportInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => seaportInfo[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (id) {
                dispatch(EditSeaPort(seaportInfo,id)).then(()=>{
                    HandleCancel()
                })
            } else {
                dispatch(AddSeaPort(seaportInfo)).then(()=>{
                    HandleCancel()
                })
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey =Object.keys(seaportInfo)
        SalesKey.map((data) => {
            seaportInfo[data].value = ""
        })
        setseaportInfo(prevState => ({
            ...prevState,
        }));
        history.push("/seaport")
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                {/* <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Sea Port Id"
                        changeData={(data) => Validation(data, "portId")}
                        value={seaportInfo.portId.value}
                        error={seaportInfo.portId.error}
                        errmsg={seaportInfo.portId.errmsg}
                    />
                </Grid> */}
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Sea Port Code"
                        changeData={(data) => Validation(data, "portCode")}
                        value={seaportInfo.portCode.value}
                        error={seaportInfo.portCode.error}
                        errmsg={seaportInfo.portCode.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Sea Port Name"
                        changeData={(data) => Validation(data, "portName")}
                        value={seaportInfo.portName.value}
                        error={seaportInfo.portName.error}
                        errmsg={seaportInfo.portName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={seaportInfo.countryName.value}
                        error={seaportInfo.countryName.error}
                        errmsg={seaportInfo.countryName.errmsg}
                        dropdown={CountryList}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" container>
                <AddFieldsBtn fieldName='Add Additional Field' />
                {/* AddFieldBtn={() => setFieldModal(true)} */}
            </Grid>
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)}  ViewSeaList={ViewSeaList}/>
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel}/>
            </Grid>
        </div>
    );
}