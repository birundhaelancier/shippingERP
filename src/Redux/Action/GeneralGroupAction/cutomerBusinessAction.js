import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CUSTOMER_BUSINESS_NATURE_LIST, VIEW_CUSTOMER_BUSINESS_NATURE_LIST, GET_BUSINESS_TYPE } from '../../Utils/constant';

export const AddCustomerBusinessNature = (data, typeName) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_cus_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.businessName.value,
                "type": typeName,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCustomerBusinessNatureList("All"))
            })
    } catch (err) { }
}

export const EditCustomerBusinessNature = (data, countryId, typeName) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_cus_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.businessName.value,
                "type": typeName,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": countryId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCustomerBusinessNatureList("All"))
            })
    } catch (err) { }
}

export const getCustomerBusinessNatureList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'cus_business_nature_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_BUSINESS_NATURE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCustomerBusinessNatureDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_cus_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CUSTOMER_BUSINESS_NATURE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CustomerBusinessNatureStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_cus_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "status": status || 0,
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCustomerBusinessNatureList("All"))
                dispatch(getCustomerBusinessNatureList("All"))
            })
    } catch (err) { }
}

export const DeleteCustomerBusinessNatureList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_cus_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCustomerBusinessNatureList("All"))
                dispatch(getCustomerBusinessNatureList("All"))
            })
    } catch (err) { }
}

export const businessType = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'business_type',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_BUSINESS_TYPE,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}