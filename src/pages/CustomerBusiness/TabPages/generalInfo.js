import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import { AddCustomerBusinessNature, ViewCustomerBusinessNatureDetails, EditCustomerBusinessNature, businessType } from '../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction';
import FooterBtn from '../../../components/FooterButtons';

export default function GeneralInfo({ customerBusinessId }) {
    let history = useHistory()
    let dispatch = useDispatch();
    const Viewlist = useSelector((state) => state.CustomerBusinessReducer.ViewCustomerBusinessDetails);
    const getTypes = useSelector((state) => state.CustomerBusinessReducer.businessType);

    const [Refresh, setRefresh] = useState(false);
    const [businessNatureDetails, setbusinessNatureDetails] = useState({
        businessName: {
            value: " ", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        type: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        businessId: {
            value: "", validation: [], error: null, errmsg: null,
        },
    })
    const [typeList, setTypeList] = useState([])

    useEffect(() => {
        dispatch(ViewCustomerBusinessNatureDetails(customerBusinessId))
        dispatch(businessType())
    }, [])

    useEffect(() => {
        let typeLists = []
        getTypes?.map((data) => {
            typeLists.push(
                { id: data.id, value: data.name }
            )
        })
        setTypeList(typeLists)
    }, [getTypes, Viewlist])

    useEffect(() => {
        if (Viewlist) {
            let typeName = typeList?.find((data) => {
                return Viewlist[0]?.type === data.value ? data.id : '';
            });
            businessNatureDetails.businessName.value = Viewlist[0]?.name
            businessNatureDetails.businessId.value = Viewlist[0]?.id
            businessNatureDetails.type.value = typeName?.id
        }
    }, [Viewlist])



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
            if (customerBusinessId) {
                let typeName = typeList.find((data) => {
                    return businessNatureDetails.type.value === data.id ? data.value : '';
                });
                dispatch(EditCustomerBusinessNature(businessNatureDetails, customerBusinessId, typeName.value))
                HandleCancel()
            } else {
                let typeName = typeList.find((data) => {
                    return businessNatureDetails.type.value === data.id ? data.value : '';
                });
                dispatch(AddCustomerBusinessNature(businessNatureDetails, typeName.value))
                HandleCancel()
            }
        }
    }

    const HandleCancel = () => {
        let SalesKey = ["businessName", "businessId", "type"]
        SalesKey.map((data) => {
            businessNatureDetails[data].value = ""
        })
        setbusinessNatureDetails(prevState => ({
            ...prevState,
        }));
        history.push('/customerBusiness')
    }
    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>

                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Business Name"
                        changeData={(data) => Validation(data, "businessName")}
                        value={businessNatureDetails.businessName.value}
                        error={businessNatureDetails.businessName.error}
                        errmsg={businessNatureDetails.businessName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="select"
                        labelname="Type"
                        dropdown={typeList}
                        changeData={(data) => Validation(data, "type")}
                        value={businessNatureDetails.type.value}
                        error={businessNatureDetails.type.error}
                        errmsg={businessNatureDetails.type.errmsg}
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