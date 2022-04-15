import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_COUNTRY_LIST, VIEW_COUNTRY_LIST } from '../../Utils/constant';

export const AddContry = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_country',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "country_name": data.countryName.value,
                "country_code": data.countryCode.value,
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

export const EditContry = (data, countryId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_country',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "country_name": data.countryName.value,
                "country_code": data.countryCode.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id": countryId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const getCountryList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'country_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_COUNTRY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCountryDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_country',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_COUNTRY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CountryStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_country',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id": portId || 0,
                "status": status || 0,
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCountryList())
            })
    } catch (err) { }
}

export const DeleteCountryList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_country',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCountryList())
            })
    } catch (err) { }
}