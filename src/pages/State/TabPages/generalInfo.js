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


    const [stateDetails, setstateDetails] = useState(
        [
            {
                type: "text", key: 'stateId', labelName: "State Id", value: "", validation: [{ name: "required" }], error: null, errmsg: null
            },
            {
                type: "text", key: 'countryName', labelName: "Country Name", value: "", validation: [{ name: "required" }], error: null, errmsg: null
            },
            {
                type: "text", key: 'stateName', labelName: "State Name", value: "", validation: [{ name: "required" }], error: null, errmsg: null
            },
            {
                type: "text", key: 'activeStatus', labelName: "Active Status", value: "", validation: [{ name: "required" }], error: null, errmsg: null
            },
        ]
    )

    const Validation = (data, row, list) => {

        var errorcheck = ValidationLibrary.checkValidation(
            data,
            row.validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: row.validation,
        };

        setstateDetails(prevState => ({
            ...prevState,
            dynObj,

        }));
    }

    const onSubmit = () => {
        history.push("/customer");
    }


    const addInputBox = (obj) => {

    }

    return (
        <div>
            <Grid item xs={12} spacing={2} direction="row" container>
                {stateDetails.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show type={data.type}
                                labelname={data.labelName}
                                // changeData={(info) => Validation(info, data)}
                                // value={data.value}
                                // error={data.error}
                                // errmsg={data.errmsg}
                            />
                        </Grid>
                    )
                })}

                {/* <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="State Name"
                        changeData={(data) => Validation(data, "stateName")}
                        value={stateDetails.stateName.value}
                        error={stateDetails.stateName.error}
                        errmsg={stateDetails.stateName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Country Name"
                        changeData={(data) => Validation(data, "countryName")}
                        value={stateDetails.countryName.value}
                        error={stateDetails.countryName.error}
                        errmsg={stateDetails.countryName.errmsg}
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={12} sm={12}>
                    <Labelbox show type="text"
                        labelname="Active Status"
                        changeData={(data) => Validation(data, "activeStatus")}
                        value={stateDetails.activeStatus.value}
                        error={stateDetails.activeStatus.error}
                        errmsg={stateDetails.activeStatus.errmsg}
                    />
                </Grid> */}

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