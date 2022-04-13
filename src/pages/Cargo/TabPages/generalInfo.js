import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory,useParams } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch,useSelector } from 'react-redux'
import { AddCargo,EditCargo,ViewCargoDetails } from '../../../Redux/Action/CargoAction'


export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    let dispatch=useDispatch()
    let { id } =useParams()
    const GetCargoList  = useSelector((state) => state.CargoReducer.GetCargoList);
    const [FieldModal, setFieldModal] = useState(false);

    const [CargoInfo, setCargoInfo] = useState({

        CargoId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        CargoType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

 
    useEffect(() => {
        dispatch(ViewCargoDetails(id))
    }, [id])

    useEffect(() => {
    if(GetCargoList){
        CargoInfo.portId.value = GetCargoList[0]?.id || ""
        CargoInfo.portCode.value = GetCargoList[0]?.code || ""
        CargoInfo.portName.value = GetCargoList[0]?.name || ""
        CargoInfo.countryId.value = GetCargoList[0]?.country || ""
        }
    }, [GetCargoList])
   

    const Validation = (data, key, list) => {
     
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            CargoInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: CargoInfo[key].validation,
        };

        setCargoInfo(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(CargoInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                CargoInfo[targetkeys[i]].value,
                CargoInfo[targetkeys[i]].validation
            );
            CargoInfo[targetkeys[i]].error = !errorcheck.state;
            CargoInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = CargoInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => CargoInfo[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            if (id) {
                dispatch(EditCargo(CargoInfo, id)).then(()=>{
                    history.push("/cargo")
                    HandleCancel()
                })
            } else {
                dispatch(AddCargo(CargoInfo)).then(()=>{
                    history.push("/cargo")
                    HandleCancel()
                })
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey =Object.keys(CargoInfo)
        SalesKey.map((data) => {
            CargoInfo[data].value = ""
        })
        setCargoInfo(prevState => ({
            ...prevState,
        }));
    }

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )


    const addInputBox = (obj) => {
        if (Object.values(obj).every(data => data != '')) {
            showList.push(obj)
            setShowList((prevState) => ([
                ...prevState,
            ]));
        }
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Cargo Id"
                        changeData={(data) => Validation(data, "CargoId")}
                        value={CargoInfo.CargoId.value}
                        error={CargoInfo.CargoId.error}
                        errmsg={CargoInfo.CargoId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Cargo Type"
                        changeData={(data) => Validation(data, "CargoType")}
                        value={CargoInfo.CargoType.value}
                        error={CargoInfo.CargoType.error}
                        errmsg={CargoInfo.CargoType.errmsg}
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

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container >
                <FooterBtn saveBtn={'Submit'}  onSaveBtn={onSubmit} onSubmit={HandleCancel}/>
            </Grid>
        </div>
    );
}