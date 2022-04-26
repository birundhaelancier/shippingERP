import react, { useState, useEffect } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AddCustomerDocument, ViewCustomerDetails, EditCustomerDocument, getCustomerList } from '../../../Redux/Action/GeneralGroupAction/customerAction';

export default function Documents({ handleActivekey, customerId, userId }) {
    const Description = [
        { description: 'This page is used to upload all key documents for this customer which is required for furture reference.' },
        { description: 'Sample identity document(s) required for business - AEO Certificate, MSDS Document, ISO Cert, DG Cert etc….' },
        { description: 'Upload Clear and not Blurry' },
        { description: 'Maximum 1.2 MB in size' },
        { description: 'Any one  of these formats: .png, .jpeg, .Doc, .xls .and .pdf.' },
        { description: 'Do not include special characters in the file name (examples: $, &, or #)' },
    ]

    let dispatch = useDispatch();
    let history = useHistory()
    const [count, setcount] = useState(0)
    const [Nommiee, setNommiee] = useState([])
    const [Itemkeys, setItemKeys] = useState([])
    const [Refresh, setRefresh] = useState(false);
    const ViewCustomer = useSelector((state) => state.CustomerReducer.ViewCustomerDetails);

    const [BasicInformation, setBasicInformation] = useState({
        document: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const dynObjs = {
        document: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    }

    useEffect(() => {
        dispatch(ViewCustomerDetails(customerId ? customerId : userId))
    }, [])

    let url = 'https://cdn.shopify.com/s/files/1/0234/8017/2591/products/young-man-in-bright-fashion_925x_f7029e2b-80f0-4a40-a87b-834b9a283c39.jpg'
    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))
    useEffect(() => {
        if (ViewCustomer) {
            console.log(toDataURL(url), 'toDataURL(url)')

            let objeList = [];
            if (Nommiee.length <= ViewCustomer[0]?.documents.length) {
                ViewCustomer[0]?.documents?.forEach((data, index) => {
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
            ViewCustomer[0]?.documents?.forEach((data, index) => {
                Object.keys(data)?.forEach((items) => {
                    if (Object.keys(dynObjs)?.includes(items) && count > index && Nommiee[`obj${index}`] != undefined) {
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
    }, [ViewCustomer])

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
        let key_Data = ["document"]
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
        console.log(item,key,data,"gggggggggggg")
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
        // var mainvalue = {};
        // var targetkeys = Object.keys(kycInfo);
        // for (var i in targetkeys) {
        //     var errorcheck = ValidationLibrary.checkValidation(
        //         kycInfo[targetkeys[i]].value,
        //         kycInfo[targetkeys[i]].validation
        //     );
        //     kycInfo[targetkeys[i]].error = !errorcheck.state;
        //     kycInfo[targetkeys[i]].errmsg = errorcheck.msg;
        //     mainvalue[targetkeys[i]] = kycInfo[targetkeys[i]].value;
        // }
        // var filtererr = targetkeys.filter((obj) => kycInfo[obj].error == true);
        var filtererr = [];


        const header = { document: [], document_name: [] };

        Object.keys(Nommiee).forEach((data) => {
            header.document.push(Nommiee[data].document.value);
            header.document_name.push(Nommiee[data].document.value.name);
            // view[items] = Nommiee[data][items].value;
        })
        if (filtererr.length > 0) {
            setRefresh(!Refresh)

        } else {
            if (customerId) {
                EditCustomerDocument(header, customerId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            history.push('/customer')
                            dispatch(getCustomerList("All"))
                        } else {
                            notification.success({
                                message: "Something Went Wrong"
                            });
                        }

                    })
            } else {
                AddCustomerDocument(header, userId)
                    .then((res) => {
                        if (res?.Status === 'Success') {
                            notification.success({
                                message: res?.Message
                            });
                            history.push('/customer')
                            dispatch(getCustomerList("All"))
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

    console.log(Nommiee, 'Nommiee')

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" alignItems={'center'} container>
                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Documents' AddFieldBtn={AddNommiee} />
                </Grid>

                {Itemkeys.length > 0 && Itemkeys.map((item, index) => {
                    return (
                        <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" justifyContent={'flex-start'} container>

                            <Grid item md={7} xs={12} lg={7}>
                                <Labelbox type="text" labelname={`Documents${index + 1}`}
                                    changeData={(data) => OnChangeNommiee(data, "document", item, index)}
                                    // value={Nommiee[item]["document"].value == "" ? BasicInformation.document.value : Nommiee[item]["document"].value?.name}
                                    value={Nommiee[item]["document"].value == "" ? BasicInformation.document.value : typeof Nommiee[item]["document"].value === 'string' ? Nommiee[item]["document"].value?.split("_")[Nommiee[item]["document"].value?.split("_").length - 1]  : Nommiee[item]["document"].value?.name}
                                    error={Nommiee[item]["document"].error == null ? BasicInformation.document.error : Nommiee[item]["document"].error}
                                    errmsg={Nommiee[item]["document"].errmsg == null ? BasicInformation.document.errmsg : Nommiee[item]["document"].errmsg}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12} md={4} sx={12} sm={12}>
                                <UploadFiles show getOnChangeFile={(event, name) => OnChangeNommiee(event, 'document', item, index)} showLabel={Nommiee[item]["document"].value === "" ? BasicInformation.document.value : Nommiee[item]["document"].value} fileId={index + 1}
                                    showName
                                    showLabelView
                                />
                            </Grid>
                        </Grid>
                    )
                }
                )}

                <Grid item xs={12} md={12} sx={12} sm={12}>
                    <div className='uploadDescription'>
                        {Description.map((val) => {
                            return (
                                <div className='uploadContent'>
                                    <div className='startIcon'><StarPurple500Icon /></div>
                                    <div className='uploadData'>{val.description}</div>
                                </div>
                            )
                        })}

                    </div>
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} onBack={() => handleActivekey('3')} onSaveBtn={onSubmit} onCancel={() => history.push('/customer')} nextDisable={ViewCustomer[0] && ViewCustomer[0]?.documents.length > 0 ? false : true} />
            </Grid>
        </div>
    );
}