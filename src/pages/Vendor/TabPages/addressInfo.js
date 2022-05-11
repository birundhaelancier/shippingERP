import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import { notification } from 'antd';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import { AddVendorAddress, ViewVendorDetails, EditVendorAddress, getVendorList } from '../../../Redux/Action/GeneralGroupAction/VendorAction';
import { getStateList } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { getCityList } from '../../../Redux/Action/GeneralGroupAction/cityAction';

export default function AddressInfo({ vendorId, userId, handleActivekey }) {
    let dispatch = useDispatch();
    let history = useHistory()
    const ViewVendor = useSelector((state) => state.VendorReducer.ViewVendorDetails);
    const GetCountry = useSelector((state) => state.CountryReducer.GetCountryList);
    const GetState = useSelector((state) => state.StateReducer.GetStateList);
    const GetCity = useSelector((state) => state.CityReducer.GetCityList);
    const [Refresh, setRefresh] = useState(false);
    const [CountryList, setCountryList] = useState([])
    const [StateList, setStateList] = useState([])
    const [CityList, setCityList] = useState([])
    const [Itemkeys, setItemKeys] = useState([])

    const addressType = [
        { id: 1, value: "Registered" },
        { id: 2, value: "Corporate" },
        { id: 3, value: "Head Quarters" },
        { id: 4, value: "Communication" },
        { id: 5, value: "Administration" },
        { id: 6, value: "Branch Office" },
        { id: 7, value: "Warehouse" },
        { id: 8, value: "Factory" },
        { id: 9, value: "Others" },
    ]
    const dynObjs = {
        address_type: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        address1: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        address2: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        country: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        state: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        phone2: { value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null },
        city: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        zip_code: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        fax: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },

    }
    const [Nommiee, setNommiee] = useState([])
    const [count, setcount] = useState(0)

    const [BasicInformation, setBasicInformation] = useState({
        address_type: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        address1: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        address2: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        country: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        state: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        phone2: { value: "", validation: [{ name: "required" }, { name: 'mobilenumber' }], error: null, errmsg: null },
        city: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        zip_code: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        fax: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    })


    useEffect(() => {
        dispatch(ViewVendorDetails(vendorId))
        dispatch(getCountryList(1))
    }, [])


    useEffect(() => {
        let countryLists = []
        GetCountry?.map((data) => {
            countryLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCountryList(countryLists)

        let stateLists = []
        GetState?.map((data) => {
            stateLists.push(
                { id: data.id, value: data.name }
            )
        })
        setStateList(stateLists)

        let cityLists = []
        GetCity?.map((data) => {
            cityLists.push(
                { id: data.id, value: data.name }
            )
        })
        setCityList(cityLists)
    }, [GetCountry, GetState, GetCity])

    useEffect(() => {
        if (ViewVendor) {
            let objeList = [];
            if (Nommiee.length <= ViewVendor[0]?.address.length) {
                ViewVendor[0]?.address?.forEach((data, index) => {
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

            if (count > 0) {
                let updatedNommiee = {};
                ViewVendor[0]?.address?.forEach((data, index) => {
                    setRefresh(!Refresh)
                    let newObj = {}
                    Object.keys(data).forEach((items) => {
                        if (items === 'country') {
                            dispatch(getStateList(data[items]))
                        }
                        if (items === 'state') {
                            dispatch(getCityList(data[items]))
                        }
                        newObj[items] = { ...dynObjs[items], value: data[items] };
                    })
                    updatedNommiee[`obj${index}`] = newObj
                })
                setNommiee(updatedNommiee)
                setItemKeys(objeList)
            }

            // ViewVendor[0]?.address?.forEach((data, index) => {
            //     Object.keys(data).forEach((items) => {
            //         if (Object.keys(dynObjs).includes(items) && count > 0) {
            //             Nommiee[`obj${index}`][items].value = (items === 'address_type') ? 1 : data[items];
            //         }
            //     })
            // })
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

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(BasicInformation);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                BasicInformation[targetkeys[i]].value,
                BasicInformation[targetkeys[i]].validation
            );
            BasicInformation[targetkeys[i]].error = !errorcheck.state;
            BasicInformation[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = BasicInformation[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => BasicInformation[obj].error == true);

        var filtererr =null
        Itemkeys.map((item,index)=>{
            if(Nommiee[item][targetkeys[index]].value!==""){
                filtererr = targetkeys.filter((obj) => BasicInformation[obj].error == null)
            }else{
                filtererr = targetkeys.filter((obj) => BasicInformation[obj].error == true)
            }
        })

        const header = {
            address_type: [], country: [], zip_code: [], address2: [], fax: [], state: [], phone2: [], address1: [], city: []
        };

        Object.keys(Nommiee).forEach((data) => {
            header.address_type.push(Nommiee[data].address_type.value);
            header.address2.push(Nommiee[data].address2.value);
            header.address1.push(Nommiee[data].address1.value);
            header.country.push(Nommiee[data].country.value);
            header.state.push(Nommiee[data].state.value);
            header.city.push(Nommiee[data].city.value);
            header.phone2.push(Nommiee[data].phone2.value);
            header.zip_code.push(Nommiee[data].zip_code.value);
            header.fax.push(Nommiee[data].fax.value);
            // view[items] = Nommiee[data][items].value;
        })

        if (filtererr.length > 0) {
            setRefresh(!Refresh)

        } else {
            if (vendorId) {
                EditVendorAddress(header, vendorId)
                .then((res) => {
                    if (res?.Status === 'Success') {
                        notification.success({
                            message: res?.Message
                        });
                        handleActivekey('2', res?.Response?.id)
                        dispatch(getVendorList("All"))
                    } else {
                        notification.error({
                            message: "Something Went Wrong"
                        });
                    }
                })
            } else {

                AddVendorAddress(header, userId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('2', res?.Response?.id)
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

    // const HandleCancel = () => {
    //     let SalesKey = ["address_type: [], "address1", "address2", "state", "city", "country", "phone2", "zip_code", "fax"]
    //     SalesKey.map((data) => {
    //         generalDetails[data].value = ""
    //     })
    //     setgeneralDetails(prevState => ({
    //         ...prevState,
    //     }));
    //     history.push('/Vendor');
    // }

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

        if (filtererr.length > 0) {
        }
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
        let key_Data = ["address1", "country", "address_type", "zip_code", "address2", "fax", "state", "phone2", "city"]
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

    function OnChangeNommiee(item, key, data, index) {
        if (key === 'country') {
            dispatch(getStateList(item))
            // dispatch(getCityList(1))
        }
        if (key === 'state') {
            dispatch(getCityList(item))
        }
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

    return (
        <div>
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" container>
                {Itemkeys.length > 0 && Itemkeys.map((item, index) => {
                    return (
                        <>
                            <Grid item md={12} xs={12} lg={12}>
                                <Grid container spacing={2}>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="Address Type"
                                            changeData={(data) => OnChangeNommiee(data, "address_type", item, index)}
                                            showString
                                            dropdown={addressType}
                                            value={Nommiee[item]["address_type"].value == "" ? BasicInformation.address_type.value : Nommiee[item]["address_type"].value}
                                            error={Nommiee[item]["address_type"].value == "" ? BasicInformation.address_type.error : Nommiee[item]["address_type"].error}
                                            errmsg={Nommiee[item]["address_type"].value == "" ? BasicInformation.address_type.errmsg : Nommiee[item]["address_type"].errmsg}
                                        />
                                    </Grid>

                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="textarea" labelname="Address1"
                                            changeData={(data) => OnChangeNommiee(data, "address1", item, index)}
                                            value={Nommiee[item]["address1"].value == "" ? BasicInformation.address1.value : Nommiee[item]["address1"].value}
                                            error={Nommiee[item]["address1"].value == "" ? BasicInformation.address1.error : Nommiee[item]["address1"].error}
                                            errmsg={Nommiee[item]["address1"].value == "" ? BasicInformation.address1.errmsg : Nommiee[item]["address1"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="textarea" labelname="Address2"
                                            changeData={(data) => OnChangeNommiee(data, "address2", item, index)}
                                            value={Nommiee[item]["address2"].value == "" ? BasicInformation.address2.value : Nommiee[item]["address2"].value}
                                            error={Nommiee[item]["address2"].value == "" ? BasicInformation.address2.error : Nommiee[item]["address2"].error}
                                            errmsg={Nommiee[item]["address2"].value == "" ? BasicInformation.address2.errmsg : Nommiee[item]["address2"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="Country"
                                            changeData={(data) => OnChangeNommiee(data, "country", item, index)}
                                            dropdown={CountryList}
                                            value={Nommiee[item]["country"].value == "" ? BasicInformation.country.value : Nommiee[item]["country"].value}
                                            error={Nommiee[item]["country"].value == "" ? BasicInformation.country.error : Nommiee[item]["country"].error}
                                            errmsg={Nommiee[item]["country"].value == "" ? BasicInformation.country.errmsg : Nommiee[item]["country"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="State"
                                            changeData={(data) => OnChangeNommiee(data, "state", item, index)}
                                            dropdown={StateList}
                                            value={Nommiee[item]["state"].value == "" ? BasicInformation.state.value : Nommiee[item]["state"].value}
                                            error={Nommiee[item]["state"].value == "" ? BasicInformation.state.error : Nommiee[item]["state"].error}
                                            errmsg={Nommiee[item]["state"].value == "" ? BasicInformation.state.errmsg : Nommiee[item]["state"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="City"
                                            changeData={(data) => OnChangeNommiee(data, "city", item, index)}
                                            dropdown={CityList}
                                            value={Nommiee[item]["city"].value == "" ? BasicInformation.city.value : Nommiee[item]["city"].value}
                                            error={Nommiee[item]["city"].value == "" ? BasicInformation.city.error : Nommiee[item]["city"].error}
                                            errmsg={Nommiee[item]["city"].value == "" ? BasicInformation.city.errmsg : Nommiee[item]["city"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="number" labelname="Phone"
                                            showFlag
                                            changeData={(data) => OnChangeNommiee(data, "phone2", item, index)}
                                            value={Nommiee[item]["phone2"].value == "" ? BasicInformation.phone2.value : Nommiee[item]["phone2"].value}
                                            error={Nommiee[item]["phone2"].value == "" ? BasicInformation.phone2.error : Nommiee[item]["phone2"].error}
                                            errmsg={Nommiee[item]["phone2"].value == "" ? BasicInformation.phone2.errmsg : Nommiee[item]["phone2"].errmsg}
                                        />
                                    </Grid>

                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="number" labelname="Zip Code"
                                            changeData={(data) => OnChangeNommiee(data, "zip_code", item, index)}
                                            value={Nommiee[item]["zip_code"].value == "" ? BasicInformation.zip_code.value : Nommiee[item]["zip_code"].value}
                                            error={Nommiee[item]["zip_code"].value == "" ? BasicInformation.zip_code.error : Nommiee[item]["zip_code"].error}
                                            errmsg={Nommiee[item]["zip_code"].value == "" ? BasicInformation.zip_code.errmsg : Nommiee[item]["zip_code"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="Fax"
                                            changeData={(data) => OnChangeNommiee(data, "fax", item, index)}
                                            value={Nommiee[item]["fax"].value == "" ? BasicInformation.fax.value : Nommiee[item]["fax"].value}
                                            error={Nommiee[item]["fax"].value == "" ? BasicInformation.fax.error : Nommiee[item]["fax"].error}
                                            errmsg={Nommiee[item]["fax"].value == "" ? BasicInformation.fax.errmsg : Nommiee[item]["fax"].errmsg}
                                        />
                                    </Grid>
                                    {/* <Grid item md={4} xs={12} lg={4}>
                                                    {index ? <button
                                                        className="mr10 btn_remove" onClick={() => handleRemoveClick(item, index)}>Remove</button> : null}
                                                </Grid> */}
                                </Grid>
                            </Grid>
                        </>
                    )
                }
                )}

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Address' AddFieldBtn={AddNommiee} />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} onSaveBtn={onSubmit} onBack={() => handleActivekey('0')} nextDisable={ViewVendor[0] && ViewVendor[0]?.address.length > 0 ? false : true} />
            </Grid>
        </div>
    );
}