import react, { useState } from 'react';
import Labelbox from '../../helpers/labelbox/labelbox';
import CustomButton from '../../components/Button';

import Grid from '@mui/material/Grid';


export default function AddFields({ addObj, CloseModal }) {

    const initialValues = {
        type: "",
        placeholder: "",
        list: "",
        validtype: "",
    };
    const [values, setValues] = useState(initialValues);
    const inputType = [
        {id:1, value: 'text'},
        {id:2, value: 'number'},
        {id:3, value: 'datepicker'},
        {id:4, value: 'select'},
        {id:5, value: 'textarea'},
        {id:6, value: 'radio'},
    ]

    const handleInputChange = (data, key) => {
        setValues({
            ...values,
            [key]: data,
        });
    }
    const addInputBox = () => {
        var names = values.list;
        var nameArr = names.split(',');
        let obj = { type: values.type, placeholder: values.placeholder, labelName: values.placeholder, arrVal: '7', validation: 'y' }
        // let obj = { type: values.type, placeholder: values.placeholder, labelName: values.placeholder, arrVal: nameArr, validation: values.validtype.split(',') }

        addObj(obj)
        CloseModal(false)
    }

    return (
        <div>
            <div>
                <div>
                    <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container>
                        <Grid item xs={12} md={10} sx={12} sm={12}>
                            <Labelbox type="select"
                                labelname="Type"
                                changeData={(data) => handleInputChange(data, "type")}
                                value={values.type}
                                dropdown={inputType}
                            />
                        </Grid>
                        <Grid item xs={12} md={10} sx={12} sm={12}>
                            <Labelbox type="text"
                                labelname="Placeholder"
                                changeData={(data) => handleInputChange(data, "placeholder")}
                                value={values.placeholder}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} sx={12} sm={12}>
                        <CustomButton btnName="Add Field" custombtnCSS="Primary" onBtnClick={() => addInputBox()} />

                        </Grid>
                    </Grid>

                </div>
            </div>
        </div>
    );
}