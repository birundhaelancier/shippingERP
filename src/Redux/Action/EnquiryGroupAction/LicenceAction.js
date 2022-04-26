import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_LICENSE_LIST,VIEW_LICENSE_LIST } from '../../Utils/constant';
import moment from 'moment'
export const AddLicense = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_license',
            headers: REQUEST_HEADERS().HEADER,
            data:{
                "reg_no":data.reg_no.value, "reg_date" :moment(data.reg_date.value).format("DD-MM-YYYY"), "type" :data.license_type.value, "item_no" :data.license_item.value, 
                "unit_qty" :data.unit_qty.value, "part_license" :data.port_of_license.value, "cif_value" : data.total_cif.value, "debit_duty" :data.total_debit_duty.value,
                 "debit_qty" :data.total_debit_qty.value, "fc_value" :data.total_fc.value, "currency_sym" : data.currency_symbol.value, "currency" :data.license_currency.value, "exchange_rate" :data.exchange_rate.value, "party_name" :data.party_name.value,
                "description" :data.license_description.value, "license_no" :data.license_no.value, "license_date":moment(data.license_date.value).format("DD-MM-YYYY"), "user_id":JSON.parse(localStorage.getItem("user_id"))
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
                "reg_no":data.reg_no.value, "reg_date" :moment(data.reg_date.value).format("DD-MM-YYYY"), "type" :data.license_type.value, "item_no" :data.license_item.value, 
                "unit_qty" :data.unit_qty.value, "part_license" :data.port_of_license.value, "cif_value" : data.total_cif.value, "debit_duty" :data.total_debit_duty.value,
                 "debit_qty" :data.total_debit_qty.value, "fc_value" :data.total_fc.value, "currency_sym" : data.currency_symbol.value, "currency" :data.license_currency.value, "exchange_rate" :data.exchange_rate.value, "party_name" :data.party_name.value,
                "description" :data.license_description.value, "license_no" :data.license_no.value, "license_date":moment(data.license_date.value).format("DD-MM-YYYY") , "user_id":JSON.parse(localStorage.getItem("user_id")),"license_id":id
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