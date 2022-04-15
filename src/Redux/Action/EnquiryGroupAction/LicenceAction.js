import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_LICENSE_LIST,VIEW_LICENSE_LIST } from '../../Utils/constant';

export const AddLicense = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_license',
            headers: REQUEST_HEADERS().HEADER,
            data:{
                "reg_no":"01", "reg_date" : "11-04-2022", "type" : "Test", "item_no" : "6364", 
                "unit_qty" : "1", "part_license" : "12", "cif_value" : "12", "debit_duty" : "td", "debit_qty" : "12", "fc_value" : "123", "currency_sym" : "₹", "currency" : "INR", "exchange_rate" : "1", "party_name" : "test",
                "description" : "tesssss", "license_no" : "133", "license_date":"11-04-2022", "user_id":"1"
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LicenseList())
            })
    } catch (err) { }
}
export const EditLicense = (data,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_license',
            headers: REQUEST_HEADERS().HEADER,
            data:{
                "type":data.transaction.value===1?"Import":"Export","section_name":data.sectionName.value,"chapter_name":data.chapterName.value,"hsn_code":data.hsnCode.value,
                "description":data.description.value,"unit":data.unit.value,"rate_standard":data.rateStandard.value,"rate_preferential":data.ratePre.value, 
                "section_description": "test", "chapter_description": "test","hsn_id":id,"user_id": JSON.parse(localStorage.getItem("user_id"))}
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LicenseList())
            })
    } catch (err) { }
}

export const LicenseList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'license_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_LICENSE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewLicenseDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_license',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "license_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_LICENSE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

// export const LicenseStatus = (portId,status) => async dispatch => {

//     try {
//         axios({
//             method: 'POST',
//             url: apiurl + 'status_hsn',
//             headers: REQUEST_HEADERS().HEADER,
//             data: {
//                 "user_id": JSON.parse(localStorage.getItem("user_id")),
//                 "hsn_id":portId || 0,
//                 "status":status || 0
//             }
//         })
//          .then((response) => {
//                 notification.success({
//                     message: response.data.Message
//                 });
//                 dispatch(LicenseList())
//             })
//     } catch (err) { }
// }

export const DeleteLicenseList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_license',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "license_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LicenseList())
            })
    } catch (err) { }
}