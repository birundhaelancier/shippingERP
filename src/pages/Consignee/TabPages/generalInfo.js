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
    let history = useHistory()
    const [FieldModal, setFieldModal] = useState(false);
    const [profileDetails, setprofileDetails] = useState({
        vendorId: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessNature: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        companyName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        addressType: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        primary: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        customerEmail: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address2: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        state: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        city: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        zipCode: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        fax: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        phone: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        activeStatus: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: 'text', label: 'Consignee Id', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Buyer', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Primary Contact', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Company Name', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Business Nature', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Email', validation: ["required"], arrVal: [] },
            { type: 'number', label: 'Phone', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Designation', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Department', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Website', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Active Status', validation: ["required"], arrVal: [] },
        ]
    )
    const [value, setValue] = useState();

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
            <Grid item xs={12} md={12} sx={12} sm={12} spacing={2} direction="row" container>
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
          
            <DynModel handleChangeModel={FieldModal} modelTitle={"Add Fields"}
                modalchanges="recruit_modal_css" handleChangeCloseModel={() => setFieldModal(false)} width={600} content={
                    <>
                        <AddFields CloseModal={(bln) => setFieldModal(bln)} addObj={(data) => addInputBox(data)} />
                    </>
                }
            />

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn saveBtn={"Save Stage"} />
            </Grid>
        </div>
    );
}