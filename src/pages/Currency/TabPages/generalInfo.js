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
        currencyId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        currencyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        }, 
        currencySymbol: {
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
     
        activeStatus: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: "text", labelName: "Designation", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Department", validation: ["required"], arrVal: [] },
            { type: "text", labelName: "Skype Id", validation: ["required"], arrVal: [] },
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
            <Grid item xs={8} spacing={2} direction="row" justifyContent={'center'} container>
            <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Currency Id"
                        changeData={(data) => Validation(data, "currencyId")}
                        value={profileDetails.currencyId.value}
                        error={profileDetails.currencyId.error}
                        errmsg={profileDetails.currencyId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Name"
                        changeData={(data) => Validation(data, "currencyName")}
                        value={profileDetails.currencyName.value}
                        error={profileDetails.currencyName.error}
                        errmsg={profileDetails.currencyName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Currency Symbol"
                        changeData={(data) => Validation(data, "currencySymbol")}
                        value={profileDetails.currencySymbol.value}
                        error={profileDetails.currencySymbol.error}
                        errmsg={profileDetails.currencySymbol.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="number"
                        labelname="Country Id"
                        changeData={(data) => Validation(data, "countryId")}
                        value={profileDetails.countryId.value}
                        error={profileDetails.countryId.error}
                        errmsg={profileDetails.countryId.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={profileDetails.countryName.value}
                        error={profileDetails.countryName.error}
                        errmsg={profileDetails.countryName.errmsg}
                    />
                </Grid>
               
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Default"
                        changeData={(data) => Validation(data, "default")}
                        value={profileDetails.default.value}
                        error={profileDetails.default.error}
                        errmsg={profileDetails.default.errmsg}
                    />
                </Grid>
               
                <Grid item xs={12} md={10} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeStatus")}
                        value={profileDetails.activeStatus.value}
                        error={profileDetails.activeStatus.error}
                        errmsg={profileDetails.activeStatus.errmsg}
                    />
                </Grid>

            </Grid>
            <Grid item xs={12} md={10} sx={12} sm={12} direction="row" justifyContent={'flex-end'} container style={{ position: 'relative', bottom: '50px' }}>
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