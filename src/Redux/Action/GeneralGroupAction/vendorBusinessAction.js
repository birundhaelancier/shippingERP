import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_VENDOR_BUSINESS_NATURE_LIST, VIEW_VENDOR_BUSINESS_NATURE_LIST } from '../../Utils/constant';

export const AddVendorBusinessNature = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_ven_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.businessName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const EditVendorBusinessNature = (data, countryId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_ven_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.businessName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": countryId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const getVendorBusinessNatureList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'ven_business_nature_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_VENDOR_BUSINESS_NATURE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewVendorBusinessNatureDetails = (data) => async dispatch => {
    console.log(data, 'view_ven_business_nature')
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_ven_business_nature',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_VENDOR_BUSINESS_NATURE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const VendorBusinessNatureStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_ven_business_nature',
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
                dispatch(getVendorBusinessNatureList("All"))
            })
    } catch (err) { }
}

export const DeleteVendorBusinessNatureList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_ven_business_nature',
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
                dispatch(getVendorBusinessNatureList("All"))
            })
    } catch (err) { }
}