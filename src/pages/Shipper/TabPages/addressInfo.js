import react, { useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import ContentHeader from '../../../components/ContentHeader';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import UploadFiles from '../../../components/Upload';
import { Add, Delete, CheckCircle } from '@mui/icons-material';
import CustomTab from '../../../components/CustomTab';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import FooterBtn from '../../../components/FooterButtons';


export default function AddressInfo() {
    let history = useHistory()
    const [profileDetails, setprofileDetails] = useState({
        customerId: {
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
        country: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        address1: {
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
    })

    const [showList, setShowList] = useState(
        [
            { type: 'textarea', label: 'Address1', validation: ["required"], arrVal: [] },
            { type: 'textarea', label: 'Address2', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'State', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'City', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Country', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Zip Code', validation: ["required"], arrVal: [] },
            { type: 'number', label: 'Phone', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Fax', validation: ["required"], arrVal: [] },
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
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <AddFieldsBtn fieldName='Add Additional Field' />
                </Grid>

            </Grid>
            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn nextBtn backBtn saveBtn={'Save Stage'} />
            </Grid>
        </div>
    );
}