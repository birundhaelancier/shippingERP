import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_COST_LIST, VIEW_COST_LIST } from '../../Utils/constant';

export const AddCost = (data) => async dispatch => {
    console.log(data, 'AddCost');
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "scheme": data.clearanceScheme.value,
                "cargo": data.cargoType.value,
                "shipment": data.shipmentType.value,
                "expense_type": data.expenseType.value,
                "expense": data.expense.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CostList())
            })
    } catch (err) { }
}

export const EditCost = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "scheme": data.clearanceScheme.value,
                "cargo": data.cargoType.value,
                "shipment": data.shipmentType.value,
                "expense_type": data.expenseType.value,
                "expense": data.expense.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": data.costId.value
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CostList())
            })
    } catch (err) { }
}

export const CostList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'cost_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_COST_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCostDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_COST_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CostStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CostList())
            })
    } catch (err) { }
}

export const CostDefault = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'default_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": portId || 0,
                "default": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CostList())
            })
    } catch (err) { }
}

export const DeleteCostList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_cost',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cost_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CostList())
            })
    } catch (err) { }
}