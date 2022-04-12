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
    const [profileDetails, setprofileDetails] = useState({
        countryId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        countryCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

        activeStatus: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: 'text', label: 'License Id', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Registration No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Registration Date', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Type', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Item No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Unit Qty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Port of License', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total CIF Value', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total Debit Duty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total Debit Qty', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Total FC Value', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Currency Symbol', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Currency', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Exchange Rate', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Party Name', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Description', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License No', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Date', validation: ["required"], arrVal: [] },

        ]
    )

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            profileDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: profileDetails[key].validation,
        };

        setprofileDetails(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

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
                {showList.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type={data.type}
                                labelname={data.label}
                            />
                        </Grid>
                    )
                })}

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} />
            </Grid>
        </div>
    );
}