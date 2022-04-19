import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import { AddVendorBusinessNature, ViewVendorBusinessNatureDetails, EditVendorBusinessNature } from '../../../Redux/Action/GeneralGroupAction/vendorBusinessAction';
import FooterBtn from '../../../components/FooterButtons';

export default function GeneralInfo({ VendorBusinessId }) {
    let history = useHistory()
    let dispatch = useDispatch();
    const ViewVendorBusiness = useSelector((state) => state.VendorBusinessReducer.ViewVendorBusinessDetails);
    const [Refresh, setRefresh] = useState(false);
    const [businessNatureDetails, setbusinessNatureDetails] = useState({
        businessName: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessId: {
            value: "", validation: [], error: null, errmsg: null,
        },
    })

    useEffect(() => {
        dispatch(ViewVendorBusinessNatureDetails(VendorBusinessId))
    }, [])

    useEffect(() => {
    if(ViewVendorBusiness){
        businessNatureDetails.businessName.value = ViewVendorBusiness[0]?.name
        businessNatureDetails.businessId.value = ViewVendorBusiness[0]?.id
        }
    }, [ViewVendorBusiness])

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            businessNatureDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: businessNatureDetails[key].validation,
        };

        setbusinessNatureDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }

    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(businessNatureDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                businessNatureDetails[targetkeys[i]].value,
                businessNatureDetails[targetkeys[i]].validation
            );
            businessNatureDetails[targetkeys[i]].error = !errorcheck.state;
            businessNatureDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = businessNatureDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => businessNatureDetails[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            if (VendorBusinessId) {
                dispatch(EditVendorBusinessNature(businessNatureDetails, VendorBusinessId))
                HandleCancel()
            } else {
                dispatch(AddVendorBusinessNature(businessNatureDetails))
                HandleCancel()
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey = ["businessName", "businessId"]
        SalesKey.map((data) => {
            businessNatureDetails[data].value = ""
        })
        setbusinessNatureDetails(prevState => ({
            ...prevState,
        }));
        history.push('/VendorBusiness')
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Name"
                        changeData={(data) => Validation(data, "businessName")}
                        value={businessNatureDetails.businessName.value}
                        error={businessNatureDetails.businessName.error}
                        errmsg={businessNatureDetails.businessName.errmsg}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel} />
            </Grid>
        </div>
    );
}