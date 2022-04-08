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



export default function GeneralInfo() {
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
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
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        default: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeSts: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

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
        history.push("/seaport");
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
                    <Labelbox show type="number"
                        labelname="Country Id"
                        changeData={(data) => Validation(data, "countryId")}
                        value={AirportInfo.countryId.value}
                        error={AirportInfo.countryId.error}
                        errmsg={AirportInfo.countryId.errmsg}
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
                <FooterBtn saveBtn={'Submit'} />
            </Grid>
        </div>
    );
}