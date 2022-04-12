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
            { type: "text", label: "Business Scope ID", validation: ["required"], arrVal: [] },
            { type: "text", label: "Business Scope Code", validation: ["required"], arrVal: [] },
            { type: "text", label: "Business Scope Name", validation: ["required"], arrVal: [] },
            { type: "text", label: "Description", validation: ["required"], arrVal: [] },
            { type: "text", label: "Active Status", validation: ["required"], arrVal: [] },
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
                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox type={data.type} showFlag={data.type === 'number' && true}
                                labelname={data.label}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })}

            </Grid>
            <Grid item xs={12} md={10} sx={12} sm={12} direction="row" container>
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