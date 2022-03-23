// import react, { useState } from 'react';
// import { Input, DatePicker, Select, Radio, Checkbox } from 'antd';
// import ContentHeader from '../../components/ContentHeader';
// import Grid from '@mui/material/Grid';


// export default function Dashboard() {
//     const { Option } = Select;
//     const { TextArea } = Input;
//     const initialValues = {
//         type: "",
//         placeholder: "",
//         list: "",
//         name: "",
//         validtype:"",
//     };
//     const [values, setValues] = useState(initialValues);
//     const [formList, setFormList] = useState({});
//     const [showList, setShowList] = useState(
//         [
//             { type: "text", name: "fname", labelName: "First Name", validation: ["required"], arrVal: [] },
//             { type: "number", name: "mobile", labelName: "Mobile", validation: ["required", "mobile"], arrVal: [] },
//             { type: "select", name: "city", labelName: "City", validation: ["required"], arrVal: ["a", "b", "v"] },
//             { type: "date", name: "doj", labelName: "DOJ", validation: ["required"], arrVal: [] },
//             { type: "radio", name: "state", labelName: "State", validation: ["required"], arrVal: [1, 2, 4, 7] },
//             { type: "checkbox", name: "skill", labelName: "Skills", validation: ["required"], arrVal: ["test1", "test3"] },

//         ]
//     )
//     const [err, serErr] = useState("")

//     const checkValidation = (validationType, params) => {
//         console.log(params, "params")
//         if (validationType == "mobile") {
//             var re = /^([0-9][0-9]{9})$/;
//             if (re.test(params) == false) {
//                 return "Please Enter 10 digit Mobile Number";
//             }
//         }
//         if (validationType == "pincode") {
//             var re = /^([0-9][0-9]{5})$/;
//             if (re.test(params) == false) {
//                 return "Please Enter 6 digit";
//             }
//         }
//     }

//     const handleChange = (e, validation) => {
//         const { name, value } = e.target;
//         let test = checkValidation(validation[1], value)
//         serErr(test)
//         // validation.map(element => {
//         //    return checkValidation(element, value)
//         // });
//         console.log(test, "formList")

//         setFormList({
//             ...formList,
//             [name]: value,
//         });
//     }


//     const getInput = (info) => {
//         switch (info.type) {
//             case 'text':
//                 return <div>
//                     <Input name={info.name} placeholder={info.labelName} onChange={(e) => handleChange(e, info.validation)} type={info.type} />
//                 </div>
//             case 'number':
//                 return <div>
//                     <Input name={info.name} placeholder={info.labelName} onChange={(e) => handleChange(e, info.validation)} type={info.type} />
//                     <div className='errMsg'>{err}</div>
//                 </div>
//             case 'date':
//                 return <DatePicker name={info.name} onChange={handleChange} type={info.type} />
//             case 'select':
//                 return <Select defaultValue={info.labelName} onChange={handleChange} name={info.name} style={{ width: 120 }} >
//                     {info.arrVal.map((val) => {
//                         return <Option value={val}>{val}</Option>
//                     })}
//                 </Select>
//             case 'radio':
//                 return <Radio.Group value={2} name={info.name} onChange={handleChange}>
//                     {info.arrVal.map((val) => {
//                         return <Radio value={val}>{val}</Radio>
//                     })}
//                 </Radio.Group>
//             case 'checkbox':
//                 return <Checkbox name={info.name} onChange={handleChange}>Checkbox</Checkbox>
//             default:
//                 return <Input placeholder={info.labelName} type="text" />
//         }
//         // case 
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         setValues({
//             ...values,
//             [name]: value,
//         });
//     }

//     const addInputBox = () => {
//         var names = values.list;
//         var nameArr = names.split(',');
//         let obj = { type: values.type, name: values.name, labelName: values.placeholder, arrVal: nameArr, validation: values.validtype.split(',') }
//         showList.push(obj)
//         setShowList((prevState) => ([
//             ...prevState,
//         ]));
//     }

//     return (
//         <div>
//             <Grid item xs={12} spacing={2} direction="row" container>
//                 <ContentHeader headerTitle="Dashboard" />
//             </Grid>
//             {showList.map((data) => {
//                 return (
//                     <div style={{ margin: 5 }}>
//                         {getInput(data)}
//                     </div>
//                 )
//             })}

//             <div>
//                 <h2 style={{ margin: 7 }}>Add Fields</h2>
//                 <div>
//                     <Input style={{ margin: 5 }} type={"text"} name={"type"} value={values.type} onChange={handleInputChange} placeholder={"Type"} />

//                     <Input style={{ margin: 5 }} type={"text"} name={"name"} value={values.name} onChange={handleInputChange} placeholder={"Name"} />

//                     <Input style={{ margin: 5 }} type={"text"} name={"placeholder"} value={values.placeholder} onChange={handleInputChange} placeholder={"Placeholder"} />

//                     <TextArea style={{ margin: 5 }} type={"text"} name={"validtype"} value={values.validtype} onChange={handleInputChange} placeholder={"Validation Type"} />

//                     <TextArea style={{ margin: 5 }} type={"text"} name={"list"} value={values.list} onChange={handleInputChange} placeholder={"List"} />
//                 </div>
//                 <button style={{ margin: 5 }} onClick={addInputBox}>Add Inputs</button>
//             </div>
//         </div>
//     );
// }



// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
// import Page from '../c'
import AppWebsiteVisits from './AppWebsiteVisits'
import AppCurrentSubject from './AppCurrentSubject'
import AppConversionRates from './AppConversionRates';
import AppCurrentVisits from './AppCurrentVisits'
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
      <>
          <Typography variant="h6" style={{marginBottom:"10px",fontWeight:"600"}}>Hi, Welcome back</Typography>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
    </>
  );
}
