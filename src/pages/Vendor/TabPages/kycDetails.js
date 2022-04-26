import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AddVendorKyc, ViewVendorDetails, EditVendorKyc, getVendorList } from '../../../Redux/Action/GeneralGroupAction/VendorAction';


export default function KycDeatils({ handleActivekey, vendorId, userId }) {

    let dispatch = useDispatch();
    let history = useHistory()
    const [count, setcount] = useState(0)
    const [Nommiee, setNommiee] = useState([])
    const [Itemkeys, setItemKeys] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const ViewVendor = useSelector((state) => state.VendorReducer.ViewVendorDetails);
    const [stateList, setstateList] = useState([])

    const [BasicInformation, setBasicInformation] = useState({
        gst_state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst_reg: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [kycInfo, setkycInfo] = useState({
        pan_no: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        pan_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cin_reg: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        cin_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        msme_reg: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        msme_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        iec_no: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        iec_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const dynObjs = {
        gst_state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst_reg: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        gst_image: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    }

    const Validations = (data, list, key) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            kycInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: kycInfo[key].validation,
        };

        setkycInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    useEffect(() => {
        dispatch(ViewVendorDetails(vendorId ? vendorId : userId))
    }, [])


    useEffect(() => {
        let getState = []
        const arrayUniqueByKey = [...new Map(ViewVendor[0]?.address?.map(item =>
            [item.state, item])).values()]?.forEach((data) => {
                getState.push({ id: data.state, value: data.state_name })
            })
        setstateList(getState)
    }, [ViewVendor])

    useEffect(() => {
        if (ViewVendor) {
            Object.keys(kycInfo).forEach((key) => {
                kycInfo[key].value = ViewVendor[0] && ViewVendor[0][key]
            })

            let objeList = [];
            if (Nommiee.length <= ViewVendor[0]?.gst.length) {
                ViewVendor[0]?.gst?.forEach((data, index) => {
                    objeList.push(`obj${index}`)
                    setcount(count + 1)
                    setNommiee(
                        prevState => ({
                            ...prevState,
                            ["obj" + index]: dynObjs,
                        })
                    )
                })
            }
            ViewVendor[0]?.gst?.forEach((data, index) => {
                Object.keys(data)?.forEach((items) => {
                    if (Object.keys(dynObjs)?.includes(items) && count > 0 && Nommiee[`obj${index}`] != undefined) {
                        Nommiee[`obj${index}`][items].value = data[items];
                    }
                })
            })
            setNommiee(
                prevState => ({
                    ...prevState,
                })
            )
            setItemKeys(objeList)
        }
    }, [ViewVendor])

    useEffect(() => {
        let obj = Object.keys(Nommiee);
        setItemKeys(obj)
    }, [Nommiee])
    console.log(Nommiee, 'Nommiee')

    useEffect(() => {
        setNommiee(
            prevState => ({
                ...prevState,
                ["obj" + count]: dynObjs,
            })
        )
    }, [])

    const CheckValidation = (data, key) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            BasicInformation[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: BasicInformation[key].validation,
        };
        setBasicInformation((prevState) => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    function AddNommiee() {
        let o = Object.keys(Nommiee)[Object.keys(Nommiee).length - 1]
        var m = Object.keys(Nommiee[o])
        m.forEach(element => {
            var errorcheck = ValidationLibrary.checkValidation(
                Nommiee[o][element].value,
                Nommiee[o][element].validation
            )
            Nommiee[o][element].error = !errorcheck.state
            Nommiee[o][element].errmsg = errorcheck.msg
        });
        var filtererr = m.filter((ele) => Nommiee[o][ele].error === true)
        setNommiee(prevState => ({
            ...prevState,
        }))
        if (filtererr.length > 0) { }
        else {
            let code = count + 1;
            setcount(count + 1)
            setNommiee(
                prevState => ({
                    ...prevState,
                    ["obj" + code]: dynObjs,
                })
            )
            CancelDynObjs2()
        }

    }

    const CancelDynObjs2 = () => {
        let key_Data = ["state", "gst_reg", "gst_image"]
        key_Data.map((data) => {
            try {
                dynObjs[data].value = "";
                dynObjs[data].validation = [];
                dynObjs[data].error = null;
                dynObjs[data].errmsg = null
                BasicInformation[data].value = "";
                BasicInformation[data].validation = [{ name: "required" }]
            }
            catch (err) {
                throw err;
            }
        })
        setBasicInformation((prevState) => ({
            ...prevState,
        }));
    }

    function OnChangeNommiee(item, key, data, index, name) {
        CheckValidation(item, key);
        Nommiee[data][key].value = item
        var errorcheck = ValidationLibrary.checkValidation(
            item,
            Nommiee[data][key].validation
        );
        Nommiee[data][key].error = !errorcheck.state
        Nommiee[data][key].errmsg = errorcheck.msg
        Nommiee[data][key].validation = Nommiee[data][key].validation

    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(kycInfo);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                kycInfo[targetkeys[i]].value,
                kycInfo[targetkeys[i]].validation
            );
            kycInfo[targetkeys[i]].error = !errorcheck.state;
            kycInfo[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = kycInfo[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => kycInfo[obj].error == true);

        const header = { gst_state: [], gst_reg: [], gst_image: [] };

        Object.keys(Nommiee).forEach((data) => {
            header.gst_state.push(Nommiee[data].gst_state.value);
            header.gst_reg.push(Nommiee[data].gst_reg.value);
            header.gst_image.push(Nommiee[data].gst_image.value);
            // view[items] = Nommiee[data][items].value;
        })
        if (filtererr.length > 0) {
            setRefresh(!Refresh)

        } else {
            if (vendorId) {
                EditVendorKyc(kycInfo, header, userId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('3', res?.Response?.id)
                            dispatch(getVendorList("All"))
                        } else {
                            notification.error({
                                message: "Something Went Wrong"
                            });
                        }

                    })
            } else {
                AddVendorKyc(kycInfo, header, userId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('3', res?.Response?.id)
                            dispatch(getVendorList("All"))
                        } else {
                            notification.error({
                                message: "Something Went Wrong"
                            });
                        }

                    })
            }
        }
        setBasicInformation((prevState) => ({
            ...prevState,
        }));

    }

    return (
        <div>
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>
                <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>
                    <Grid item xs={12} md={7} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="PAN Number"
                            changeData={(data) => Validations(data, '', "pan_no")}
                            value={kycInfo.pan_no.value}
                            error={kycInfo.pan_no.error}
                            errmsg={kycInfo.pan_no.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} sx={12} sm={12}>
                        <Grid item xs={12} md={12} sx={12} sm={12}>
                            <UploadFiles show getOnChangeFile={(event, name) => Validations(event, name, 'pan_image')} showLabel={kycInfo.pan_image.value} fileId={1} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>
                    <Grid item xs={12} md={7} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="CIN Registration"
                            changeData={(data) => Validations(data, '', "cin_reg")}
                            value={kycInfo.cin_reg.value}
                            error={kycInfo.cin_reg.error}
                            errmsg={kycInfo.cin_reg.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} sx={12} sm={12}>
                        <Grid item xs={12} md={12} sx={12} sm={12}>
                            <UploadFiles show getOnChangeFile={(event, name) => Validations(event, name, 'cin_image')} showLabel={kycInfo.cin_image.value} fileId={2} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>
                    <Grid item xs={12} md={7} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="MSME Registration"
                            changeData={(data) => Validations(data, '', "msme_reg")}
                            value={kycInfo.msme_reg.value}
                            error={kycInfo.msme_reg.error}
                            errmsg={kycInfo.msme_reg.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} sx={12} sm={12}>
                        <Grid item xs={12} md={12} sx={12} sm={12}>
                            <UploadFiles show getOnChangeFile={(event, name) => Validations(event, name, 'msme_image')} showLabel={kycInfo.msme_image.value} fileId={3} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>
                    <Grid item xs={12} md={7} sx={12} sm={12}>
                        <Labelbox show type="number"
                            labelname="IEC Number"
                            changeData={(data) => Validations(data, '', "iec_no")}
                            value={kycInfo.iec_no.value}
                            error={kycInfo.iec_no.error}
                            errmsg={kycInfo.iec_no.errmsg}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} sx={12} sm={12}>
                        <Grid item xs={12} md={12} sx={12} sm={12}>
                            <UploadFiles show getOnChangeFile={(event, name) => Validations(event, name, 'iec_image')} showName showLabel={kycInfo.iec_image.value} fileId={4} />
                        </Grid>
                    </Grid>
                </Grid>

                {Itemkeys.length > 0 && Itemkeys.map((item, index) => {
                    return (
                        <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>

                            <Grid item md={7} xs={12} lg={7}>
                                <Labelbox type="select" labelname="GST State"
                                    dropdown={stateList}
                                    changeData={(data) => OnChangeNommiee(data, "gst_state", item, index)}
                                    value={Nommiee[item]["gst_state"].value == "" ? BasicInformation.gst_state.value : Nommiee[item]["gst_state"].value}
                                    error={Nommiee[item]["gst_state"].error == null ? BasicInformation.gst_state.error : Nommiee[item]["gst_state"].error}
                                    errmsg={Nommiee[item]["gst_state"].errmsg == null ? BasicInformation.gst_state.errmsg : Nommiee[item]["gst_state"].errmsg}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <UploadFiles show getOnChangeFile={(event, name) => OnChangeNommiee(event, 'gst_image', item, index)} showLabel={Nommiee[item]["gst_image"].value == "" ? BasicInformation.gst_image.value : Nommiee[item]["gst_image"].value} fileId={5 + index}
                                    showName
                                    error={Nommiee[item]["gst_image"].error == null ? BasicInformation.gst_image.error : Nommiee[item]["gst_image"].error}
                                    errmsg={Nommiee[item]["gst_image"].errmsg == null ? BasicInformation.gst_image.errmsg : Nommiee[item]["gst_image"].errmsg}
                                />
                            </Grid>

                            <Grid item md={7} xs={12} lg={7}>
                                <Labelbox type="number" labelname="Gst Registration"
                                    changeData={(data) => OnChangeNommiee(data, "gst_reg", item, index)}
                                    value={Nommiee[item]["gst_reg"].value == "" ? BasicInformation.gst_reg.value : Nommiee[item]["gst_reg"].value}
                                    error={Nommiee[item]["gst_reg"].error == null ? BasicInformation.gst_reg.error : Nommiee[item]["gst_reg"].error}
                                    errmsg={Nommiee[item]["gst_reg"].errmsg == null ? BasicInformation.gst_reg.errmsg : Nommiee[item]["gst_reg"].errmsg}
                                />
                            </Grid>
                        </Grid>
                    )
                }
                )}

                <Grid item xs={12} md={0.4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Another GST' marginView AddFieldBtn={AddNommiee} />
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="flex-start" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} onSaveBtn={onSubmit} onBack={() => handleActivekey('1')} nextDisable={ViewVendor[0] && ViewVendor[0]?.gst.length > 0 ? false : true} />
            </Grid>
        </div>
    );
}