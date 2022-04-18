import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CURRENCY_LIST, VIEW_CURRENCY_LIST } from '../../Utils/constant';

export const AddCurrency = (data) => async dispatch => {
    console.log(data,'AddCurrency');
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "currency_name": data.currencyName.value,
                "country": data.countryId.value,
                "currency_symbol": data.currencySymbol.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CurrencyList())
            })
    } catch (err) { alert('catch') }
}

export const EditCurrency = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "currency_name": data.currencyName.value,
                "country": data.countryId.value,
                "currency_symbol": data.currencySymbol.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": id
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CurrencyList())
            })
    } catch (err) { }
}

export const CurrencyList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'currency_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_CURRENCY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCurrencyDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CURRENCY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CurrencyStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CurrencyList())
            })
    } catch (err) { }
}

export const CurrencyDefault = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'default_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": portId || 0,
                "default": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CurrencyList())
            })
    } catch (err) { }
}

export const DeleteCurrencyList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_currency',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "currency_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CurrencyList())
            })
    } catch (err) { }
}