import { apiurl, REQUEST_HEADERS } from '../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CITY_LIST, VIEW_CITY_LIST } from '../Utils/constant';

export const AddCity = (data) => async dispatch => {
    console.log(data, 'data')
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_city',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "city_name": data.cityName.value,
                "state": data.stateName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country": data.countryName.value,
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const EditCity = (data, ViewCity) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_city',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "city_id": ViewCity[0]?.id,
                "city_name": data.cityName.value,
                "state": data.stateName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country": data.countryName.value,
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const getCityList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'city_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                console.log(response)
                dispatch({
                    type: GET_CITY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCityDetails = (data) => async dispatch => {
    console.log(data, 'data')
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_city',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "city_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CITY_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const Citytatus = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_city',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {

            })
    } catch (err) { }
}

export const DeleteCityList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_city',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "state_id": data,

            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getCityList())
            })
    } catch (err) { }
}