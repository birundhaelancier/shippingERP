import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_SALES_LIST, VIEW_SALES_LIST } from '../../Utils/constant';

export const AddSales = (data) => async dispatch => {
    console.log(data,'AddSales');
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_sale_person',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.name.value,
                "incentive_plan": data.incentivePlan.value,
                "designation": data.designation.value,
                "mobile": data.mobile.value,
                "email": data.email.value,
                "remarks": data.remarks.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SalesList())
            })
    } catch (err) { alert('catch') }
}

export const EditSales = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_sale_person',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.name.value,
                "incentive_plan": data.incentivePlan.value,
                "designation": data.designation.value,
                "mobile": data.mobile.value,
                "email": data.email.value,
                "remarks": data.remarks.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": id
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SalesList())
            })
    } catch (err) { }
}

export const SalesList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'sale_person_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SALES_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewSalesDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_sale_person',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_SALES_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const SalesStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_sale_person',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SalesList())
            })
    } catch (err) { }
}

export const SalesDefault = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'default_sale_person',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "default": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SalesList())
            })
    } catch (err) { }
}

export const DeleteSalesList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_sale_person',
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
                dispatch(SalesList())
            })
    } catch (err) { }
}