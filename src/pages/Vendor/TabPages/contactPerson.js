import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import { notification } from 'antd';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import { AddVendorContact, ViewVendorDetails, EditVendorContact, getVendorList } from '../../../Redux/Action/GeneralGroupAction/VendorAction';
import { getStateList } from '../../../Redux/Action/GeneralGroupAction/stateAction';
import { getCountryList } from '../../../Redux/Action/GeneralGroupAction/countryAction';
import { getCityList } from '../../../Redux/Action/GeneralGroupAction/cityAction';

export default function ContactPerson({ vendorId, userId, handleActivekey }) {
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
        contact_salute: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        contact_first_name: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        contact_second_name: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        country: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        state: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        phone: { value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null },
        city: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        mobile: { value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null },
        email: { value: "", validation: [{ name: "required" }, { name: "email" }], error: null, errmsg: null },
        department: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        designation: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },

    }
    const [Nommiee, setNommiee] = useState([])
    const [count, setcount] = useState(0)

    const [BasicInformation, setBasicInformation] = useState({
        contact_salute: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        contact_first_name: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        contact_second_name: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        country: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        state: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        phone: { value: "", validation: [{ name: "required" }, { name: 'mobilenumber' }], error: null, errmsg: null },
        city: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        mobile: { value: "", validation: [{ name: "required" }, { name: "mobilenumber" }], error: null, errmsg: null },
        email: { value: "", validation: [{ name: "required" }, { name: "email" }], error: null, errmsg: null },
        department: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
        designation: { value: "", validation: [{ name: "required" }], error: null, errmsg: null },
    })


    useEffect(() => {
        dispatch(ViewVendorDetails(vendorId ? vendorId : userId))
        dispatch(getCountryList(1))
    }, [])


    useEffect(() => {
        let countryLists = []
        const arrayUniqueByKey = [...new Map(ViewVendor[0]?.address?.map(item =>
            [item.country, item])).values()]?.forEach((data) => {
                countryLists.push({ id: data.country, value: data.country_name })
            })
        setCountryList(countryLists)

        let stateLists = []
        const state = [...new Map(ViewVendor[0]?.address?.map(item =>
            [item.state, item])).values()]?.forEach((data) => {
                stateLists.push({ id: data.state, value: data.state_name })
            })
        setStateList(stateLists)

        let cityLists = []
        const city = [...new Map(ViewVendor[0]?.address?.map(item =>
            [item.city, item])).values()]?.forEach((data) => {
                cityLists.push({ id: data.city, value: data.city_name })
            })
        setCityList(cityLists)
    }, [ViewVendor])

    const getSalutation = (data)=>{
        switch (data){
            case "Mr": return 1;
            case "Mrs": return 2;
            case "Ms": return 3;
            case "Miss": return 4;
            case "Dr": return 5;
            default: return '';
        }
    }

    useEffect(() => {
        if (ViewVendor) {

            let objeList = [];
            if (Nommiee.length <= ViewVendor[0]?.contact.length) {
                ViewVendor[0]?.contact?.forEach((data, index) => {
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
            ViewVendor[0]?.contact?.forEach((data, index) => {
                Object.keys(data).forEach((items) => {
                    if (Object.keys(dynObjs).includes(items) && count > 0 && Nommiee[`obj${index}`] != undefined) {
                        Nommiee[`obj${index}`][items].value = (items === 'contact_salute') ? getSalutation(data[items])  : data[items];
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

        const header = {
            contact_salute: [], country: [], mobile: [], contact_second_name: [], email: [], state: [], phone: [], contact_first_name: [], city: [], email: [], department: [], designation: []
        };

        Object.keys(Nommiee).forEach((data) => {
            header.contact_salute.push(Nommiee[data].contact_salute.value);
            header.contact_second_name.push(Nommiee[data].contact_second_name.value);
            header.contact_first_name.push(Nommiee[data].contact_first_name.value);
            header.country.push(Nommiee[data].country.value);
            header.state.push(Nommiee[data].state.value);
            header.city.push(Nommiee[data].city.value);
            header.phone.push(Nommiee[data].phone.value);
            header.mobile.push(Nommiee[data].mobile.value);
            header.email.push(Nommiee[data].email.value);
            header.department.push(Nommiee[data].department.value);
            header.designation.push(Nommiee[data].designation.value);
            // view[items] = Nommiee[data][items].value;
        })

        if (filtererr.length > 0) {
            setRefresh(!Refresh)

        } else {
            if (vendorId) {

                EditVendorContact(header, vendorId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('4', res?.Response?.id)
                            dispatch(getVendorList("All"))
                        } else {
                            notification.success({
                                message: "Something Went Wrong"
                            });
                        }
                    })
            } else {

                AddVendorContact(header, userId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            handleActivekey('4', res?.Response?.id)
                            dispatch(getVendorList("All"))
                        } else {
                            notification.success({
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
    //     let SalesKey = ["contact_salute: [], "contact_first_name", "contact_second_name", "state", "city", "department", "designation", "country", "phone", "mobile", "email"]
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
        let key_Data = ["contact_first_name", "country", "contact_salute", "mobile", "contact_second_name", "email", "state", "phone", "city", "department", "designation"]
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
                                        <Labelbox type="select" labelname="Salutaion"
                                            changeData={(data) => OnChangeNommiee(data, "contact_salute", item, index)}
                                            showString
                                            dropdown={[
                                                { id: 1, value: 'Mr' },
                                                { id: 2, value: 'Mrs' },
                                                { id: 3, value: 'Ms' },
                                                { id: 4, value: 'Miss' },
                                                { id: 5, value: 'Dr' },
                                            ]}
                                            value={Nommiee[item]["contact_salute"].value == "" ? BasicInformation.contact_salute.value : Nommiee[item]["contact_salute"].value}
                                            error={Nommiee[item]["contact_salute"].error == null ? BasicInformation.contact_salute.error : Nommiee[item]["contact_salute"].error}
                                            errmsg={Nommiee[item]["contact_salute"].errmsg == null ? BasicInformation.contact_salute.errmsg : Nommiee[item]["contact_salute"].errmsg}
                                        />
                                    </Grid>

                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="First Name"
                                            changeData={(data) => OnChangeNommiee(data, "contact_first_name", item, index)}
                                            value={Nommiee[item]["contact_first_name"].value == "" ? BasicInformation.contact_first_name.value : Nommiee[item]["contact_first_name"].value}
                                            error={Nommiee[item]["contact_first_name"].error == null ? BasicInformation.contact_first_name.error : Nommiee[item]["contact_first_name"].error}
                                            errmsg={Nommiee[item]["contact_first_name"].errmsg == null ? BasicInformation.contact_first_name.errmsg : Nommiee[item]["contact_first_name"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="Last Name"
                                            changeData={(data) => OnChangeNommiee(data, "contact_second_name", item, index)}
                                            value={Nommiee[item]["contact_second_name"].value == "" ? BasicInformation.contact_second_name.value : Nommiee[item]["contact_second_name"].value}
                                            error={Nommiee[item]["contact_second_name"].error == null ? BasicInformation.contact_second_name.error : Nommiee[item]["contact_second_name"].error}
                                            errmsg={Nommiee[item]["contact_second_name"].errmsg == null ? BasicInformation.contact_second_name.errmsg : Nommiee[item]["contact_second_name"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="Country"
                                            changeData={(data) => OnChangeNommiee(data, "country", item, index)}
                                            dropdown={CountryList}
                                            value={Nommiee[item]["country"].value == "" ? BasicInformation.country.value : Nommiee[item]["country"].value}
                                            error={Nommiee[item]["country"].error == null ? BasicInformation.country.error : Nommiee[item]["country"].error}
                                            errmsg={Nommiee[item]["country"].errmsg == null ? BasicInformation.country.errmsg : Nommiee[item]["country"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="State"
                                            changeData={(data) => OnChangeNommiee(data, "state", item, index)}
                                            dropdown={StateList}
                                            value={Nommiee[item]["state"].value == "" ? BasicInformation.state.value : Nommiee[item]["state"].value}
                                            error={Nommiee[item]["state"].error == null ? BasicInformation.state.error : Nommiee[item]["state"].error}
                                            errmsg={Nommiee[item]["state"].errmsg == null ? BasicInformation.state.errmsg : Nommiee[item]["state"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="select" labelname="City"
                                            changeData={(data) => OnChangeNommiee(data, "city", item, index)}
                                            dropdown={CityList}
                                            value={Nommiee[item]["city"].value == "" ? BasicInformation.city.value : Nommiee[item]["city"].value}
                                            error={Nommiee[item]["city"].error == null ? BasicInformation.city.error : Nommiee[item]["city"].error}
                                            errmsg={Nommiee[item]["city"].errmsg == null ? BasicInformation.city.errmsg : Nommiee[item]["city"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="number" labelname="Phone"
                                            showFlag
                                            changeData={(data) => OnChangeNommiee(data, "phone", item, index)}
                                            value={Nommiee[item]["phone"].value == "" ? BasicInformation.phone.value : Nommiee[item]["phone"].value}
                                            error={Nommiee[item]["phone"].error == null ? BasicInformation.phone.error : Nommiee[item]["phone"].error}
                                            errmsg={Nommiee[item]["phone"].errmsg == null ? BasicInformation.phone.errmsg : Nommiee[item]["phone"].errmsg}
                                        />
                                    </Grid>

                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="number" labelname="Mobile"
                                            changeData={(data) => OnChangeNommiee(data, "mobile", item, index)}
                                            showFlag
                                            value={Nommiee[item]["mobile"].value == "" ? BasicInformation.mobile.value : Nommiee[item]["mobile"].value}
                                            error={Nommiee[item]["mobile"].error == null ? BasicInformation.mobile.error : Nommiee[item]["mobile"].error}
                                            errmsg={Nommiee[item]["mobile"].errmsg == null ? BasicInformation.mobile.errmsg : Nommiee[item]["mobile"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="Email"
                                            changeData={(data) => OnChangeNommiee(data, "email", item, index)}
                                            value={Nommiee[item]["email"].value == "" ? BasicInformation.email.value : Nommiee[item]["email"].value}
                                            error={Nommiee[item]["email"].error == null ? BasicInformation.email.error : Nommiee[item]["email"].error}
                                            errmsg={Nommiee[item]["email"].errmsg == null ? BasicInformation.email.errmsg : Nommiee[item]["email"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="Designation"
                                            changeData={(data) => OnChangeNommiee(data, "designation", item, index)}
                                            value={Nommiee[item]["designation"].value == "" ? BasicInformation.designation.value : Nommiee[item]["designation"].value}
                                            error={Nommiee[item]["designation"].error == null ? BasicInformation.designation.error : Nommiee[item]["designation"].error}
                                            errmsg={Nommiee[item]["designation"].errmsg == null ? BasicInformation.designation.errmsg : Nommiee[item]["designation"].errmsg}
                                        />
                                    </Grid>
                                    <Grid item md={4} xs={12} lg={4}>
                                        <Labelbox type="text" labelname="Department"
                                            changeData={(data) => OnChangeNommiee(data, "department", item, index)}
                                            value={Nommiee[item]["department"].value == "" ? BasicInformation.department.value : Nommiee[item]["department"].value}
                                            error={Nommiee[item]["department"].error == null ? BasicInformation.department.error : Nommiee[item]["department"].error}
                                            errmsg={Nommiee[item]["department"].errmsg == null ? BasicInformation.department.errmsg : Nommiee[item]["department"].errmsg}
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
                    <AddFieldsBtn fieldName='Add Contact' AddFieldBtn={AddNommiee} />
                </Grid>
            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'}  onBack={() => handleActivekey('2')}  onSaveBtn={onSubmit} nextDisable={ViewVendor[0] && ViewVendor[0]?.contact.length > 0 ? false : true} />
            </Grid>
        </div>
    );
}