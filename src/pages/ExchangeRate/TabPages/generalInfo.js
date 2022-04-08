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
    const [exchangeRateInfo, setexchangeRateInfo] = useState({
       
        exchangeId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        currencyId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        exchangeRate: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        date: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            exchangeRateInfo[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: exchangeRateInfo[key].validation,
        };

        setexchangeRateInfo(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
        ]
    )


    const onSubmit = () => {
        history.push("/customer");
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
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
            <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Exchange Id"
                        changeData={(data) => Validation(data, "exchangeId")}
                        value={exchangeRateInfo.exchangeId.value}
                        error={exchangeRateInfo.exchangeId.error}
                        errmsg={exchangeRateInfo.exchangeId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Currency Id"
                        changeData={(data) => Validation(data, "currencyId")}
                        value={exchangeRateInfo.currencyId.value}
                        error={exchangeRateInfo.currencyId.error}
                        errmsg={exchangeRateInfo.currencyId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={exchangeRateInfo.countryName.value}
                        error={exchangeRateInfo.countryName.error}
                        errmsg={exchangeRateInfo.countryName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Exchange Rate"
                        changeData={(data) => Validation(data, "exchangeRate")}
                        value={exchangeRateInfo.exchangeRate.value}
                        error={exchangeRateInfo.exchangeRate.error}
                        errmsg={exchangeRateInfo.exchangeRate.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="datepicker"
                        labelname="Date"
                        changeData={(data) => Validation(data, "date")}
                        value={exchangeRateInfo.date.value}
                        error={exchangeRateInfo.date.error}
                        errmsg={exchangeRateInfo.date.errmsg}
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