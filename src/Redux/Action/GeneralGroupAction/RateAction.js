import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_RATE_LIST, VIEW_RATE_LIST } from '../../Utils/constant';
import moment from 'moment'
export const AddRate = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_exchange_rate',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "exchange_rate":data.exchangeRate.value,
                "country":data.countryName.value,
                "currency":data.currencyId.value,
                "date":moment(data.date.value).format("DD-MM-YYYY"),
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(RateList())
            })
    } catch (err) { }
}
export const EditRate = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_exchange_rate',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "exchange_rate_id":id,
                "exchange_rate":data.exchangeRate.value,
                "country":data.countryName.value,
                "currency":data.currencyId.value,
                "date":moment(data.date.value).format("DD-MM-YYYY"),
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(RateList())
            })
    } catch (err) { }
}

export const RateList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'exchange_rate_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id":"All"
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_RATE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewRateDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_exchange_rate',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "exchange_rate_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_RATE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}



export const DeleteRate = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_exchange_rate',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "exchange_rate_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(RateList())
            })
    } catch (err) { }
}