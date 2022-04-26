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
import { useDispatch, useSelector } from 'react-redux';
import { AddVehicle, ViewVehicleDetails, EditVehicle } from '../../../Redux/Action/TransportGroupAction/VehicleAction';


export default function GeneralInfo({ vehicleId }) {
    let history = useHistory()
    let dispatch = useDispatch();
    const [Refresh, setRefresh] = useState(false);
    const [FieldModal, setFieldModal] = useState(false);
    const ViewVehicle = useSelector((state) => state.VehicleReducer.ViewVehicleDetails);

    const [vehicleDetails, setvehicleDetails] = useState({
        vehicleName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        vehicleId: {
            value: "", validation: [], error: null, errmsg: null,
        },
        bodyType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        length: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        breadth: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        height: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })
    useEffect(() => {
        dispatch(ViewVehicleDetails(vehicleId))
           }, [])

    useEffect(() => {
        if (ViewVehicle) {
            vehicleDetails.vehicleName.value = ViewVehicle[0]?.name || ""
            vehicleDetails.vehicleId.value = ViewVehicle[0]?.id || ""
            vehicleDetails.bodyType.value = ViewVehicle[0]?.body_type || ""
            vehicleDetails.length.value = ViewVehicle[0]?.length || ""
            vehicleDetails.breadth.value = ViewVehicle[0]?.breadth || ""
            vehicleDetails.height.value = ViewVehicle[0]?.height || ""
        }
    }, [ViewVehicle])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            vehicleDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: vehicleDetails[key].validation,
        };

        setvehicleDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(vehicleDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                vehicleDetails[targetkeys[i]].value,
                vehicleDetails[targetkeys[i]].validation
            );
            vehicleDetails[targetkeys[i]].error = !errorcheck.state;
            vehicleDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = vehicleDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => vehicleDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (vehicleId) {
                dispatch(EditVehicle(vehicleDetails, vehicleId))
                HandleCancel()
                history.push('/vehicle');
            } else {
                dispatch(AddVehicle(vehicleDetails))
                HandleCancel()
                history.push('/vehicle');
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["vehicleName", "bodyType", "length", "breadth", "height"]
        SalesKey.map((data) => {
            vehicleDetails[data].value = ""
        })
        setvehicleDetails(prevState => ({
            ...prevState,
        }));
    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Vehicle Name"
                        changeData={(data) => Validation(data, "vehicleName")}
                        value={vehicleDetails.vehicleName.value}
                        error={vehicleDetails.vehicleName.error}
                        errmsg={vehicleDetails.vehicleName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Body Type"
                        changeData={(data) => Validation(data, "bodyType")}
                        value={vehicleDetails.bodyType.value}
                        error={vehicleDetails.bodyType.error}
                        errmsg={vehicleDetails.bodyType.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Length"
                        changeData={(data) => Validation(data, "length")}
                        value={vehicleDetails.length.value}
                        error={vehicleDetails.length.error}
                        errmsg={vehicleDetails.length.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Breadth"
                        changeData={(data) => Validation(data, "breadth")}
                        value={vehicleDetails.breadth.value}
                        error={vehicleDetails.breadth.error}
                        errmsg={vehicleDetails.breadth.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Height"
                        changeData={(data) => Validation(data, "height")}
                        value={vehicleDetails.height.value}
                        error={vehicleDetails.height.error}
                        errmsg={vehicleDetails.height.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}