import react, { useEffect, useState } from 'react';
import Labelbox from '../../../helpers/labelbox/labelbox';
import ValidationLibrary from '../../../helpers/validationfunction';
import Grid from '@mui/material/Grid';
import CustomButton from '../../../components/Button';
import { useHistory,useParams } from 'react-router-dom';
import AddFieldsBtn from '../../../components/AddFieldsBtn';
import LabelBoxes from '../../../components/labelbox/labelbox';
import DynModel from '../../../components/CustomModal';
import AddFields from '../../AddFields/index';
import FooterBtn from '../../../components/FooterButtons';
import { ViewSchemaDetails,EditSchema,AddSchema } from '../../../Redux/Action/EnquiryGroupAction/SchemaActions'
import { useDispatch,useSelector } from 'react-redux';


export default function GeneralInfo() {
    let history = useHistory()
    let dispatch=useDispatch()
    let { id } =useParams()
    const [AddmoreObj, setAddmoreObj] = useState([{ address: "", gst: "", state: "", city: "", country: "" }])
    const [CustomerObj, setCustomerObj] = useState([{ description: "", state: "", city: "" }]);

    const ViewSchemaList = useSelector((state) => state.SchemaReducer.ViewSchemaList);
    const [FieldModal, setFieldModal] = useState(false);
    const [SchemaDetails, setSchemaDetails] = useState({
        Code: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
        Description: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },

        Liciense: {
            value: "", validation: [{ name: "required" }], error: null, errmsg: null,
        },
    })

    const [showList, setShowList] = useState(
        [
            { type: 'text', label: 'Scheme Id', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Scheme Code', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'Scheme Description', validation: ["required"], arrVal: [] },
            { type: 'text', label: 'License Required', validation: ["required"], arrVal: [] },
        ]
    )

   
    useEffect(() => {
        dispatch(ViewSchemaDetails(id))
    }, [id])

    useEffect(() => {
    if(id){
        SchemaDetails.Description.value = ViewSchemaList[0]?.description || ""
        SchemaDetails.Code.value = ViewSchemaList[0]?.code || ""
        SchemaDetails.Liciense.value = ViewSchemaList[0]?.license==="Yes"?1:2
        }
    }, [ViewSchemaList])
  

    const Validation = (data, key, list) => {
     
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            SchemaDetails[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: SchemaDetails[key].validation,
        };

        setSchemaDetails(prevState => ({
            ...prevState,
            [key]: dynObj,
        }));
    }
    const onSubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(SchemaDetails);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                SchemaDetails[targetkeys[i]].value,
                SchemaDetails[targetkeys[i]].validation
            );
            SchemaDetails[targetkeys[i]].error = !errorcheck.state;
            SchemaDetails[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = SchemaDetails[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => SchemaDetails[obj].error == true);

        if (filtererr.length > 0) {
        } else {
            if (id) {
                dispatch(EditSchema(SchemaDetails,id)).then(()=>{
                    HandleCancel()
                })
            } else {
                dispatch(AddSchema(SchemaDetails)).then(()=>{
                    HandleCancel()
                })
            }

        }
    }
    const HandleCancel = () => {
        let SalesKey =Object.keys(SchemaDetails)
        SalesKey.map((data) => {
            SchemaDetails[data].value = ""
        })
        setSchemaDetails(prevState => ({
            ...prevState,
        }));
        history.push("/scheme")
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
                            <Labelbox show 
                             type="number"
                             labelname="Scheme Code"
                             changeData={(data) => Validation(data, "Code")}
                             value={SchemaDetails.Code.value}
                             error={SchemaDetails.Code.error}
                             errmsg={SchemaDetails.Code.errmsg}
                            />
              
                        </Grid>
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox show 
                             type="select"
                             labelname="License Required"
                             changeData={(data) => Validation(data, "Liciense")}
                             value={SchemaDetails.Liciense.value}
                             error={SchemaDetails.Liciense.error}
                             errmsg={SchemaDetails.Liciense.errmsg}
                             dropdown={[{id:1,value:"Yes"},{id:2,value:"No"}]}
                            />
                        </Grid>

                        <Grid item xs={12} md={4} sx={12} sm={12}>
                        </Grid>
                        <Grid item xs={12} md={8} sx={12} sm={12}>
                            <Labelbox show 
                             type="textarea"
                             labelname="Scheme Description"
                             changeData={(data) => Validation(data, "Description")}
                             value={SchemaDetails.Description.value}
                             error={SchemaDetails.Description.error}
                             errmsg={SchemaDetails.Description.errmsg}
                            />
                        </Grid>
            

            </Grid>
            <Grid item xs={12} md={4} sx={12} sm={12} direction="row" justifyContent={'flex-start'} container >
                <AddFieldsBtn fieldName='Add Additional Field' />
            </Grid>

            <Grid item xs={12} spacing={2} direction="row" justifyContent="center" container>
                <FooterBtn saveBtn={'Submit'} onSaveBtn={onSubmit} onCancel={HandleCancel}/>
            </Grid>
        </div>
    );
}