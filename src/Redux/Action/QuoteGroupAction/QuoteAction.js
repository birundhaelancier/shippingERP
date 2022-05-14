import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_QUOTE_LIST, VIEW_QUOTE_LIST } from '../../Utils/constant';

export const AddQuote = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_quote',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "scheme": data.clearanceScheme.value,
                "cargo": data.cargoType.value,
                "shipment": data.shipmentType.value,
                "expense_type": data.expenseType.value,
                "stuffing_type": data.stuffingType.value,
                "amount": data.amount.value,
                "unit": data.unit.value,
                "remarks": data.remarks.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(QuoteList())
            })
    } catch (err) { }
}

export const EditQuote = (data, id) => async dispatch => {
    // try {
    axios({
        method: 'POST',
        url: apiurl + 'edit_quote',
        headers: REQUEST_HEADERS().HEADER,
        data: {
            "scheme": data.clearanceScheme.value,
            "cargo": data.cargoType.value,
            "shipment": data.shipmentType.value,
            "expense_type": data.expenseType.value,
            "stuffing_type": data.stuffingType.value,
            "amount": data.amount.value,
            "unit": data.unit.value,
            "remarks": data.remarks.value,
            "user_id": JSON.parse(localStorage.getItem("user_id")),
            "quote_id": id
        }
    })
        .then((response) => {
            notification.success({
                message: response.data.Message
            });
            dispatch(QuoteList())
        })
    // } catch (err) { }
}

export const QuoteList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'quote_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "quote_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_QUOTE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewQuoteDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_quote',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "quote_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_QUOTE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const QuoteStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_quote',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "quote_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(QuoteList())
            })
    } catch (err) { }
}

export const QuoteDefault = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'default_quote',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "quote_id": portId || 0,
                "default": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(QuoteList())
            })
    } catch (err) { }
}

export const DeleteQuoteList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_quote',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "quote_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(QuoteList())
            })
    } catch (err) { }
}