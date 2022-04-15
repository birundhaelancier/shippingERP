import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_AIRPORT_LIST, VIEW_AIRPORT_LIST } from '../../Utils/constant';
export const AddAirPort = (data,country_Id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_airport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "airport_name": data.portName.value,
                "airport_code": data.portCode.value,
                "country": data.countryId.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(AirPortList())
            })
    } catch (err) { }
}
export const EditAirPort = (data,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_airport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "airport_id": id,
                "airport_name": data.portName.value,
                "airport_code": data.portCode.value,
                "country":data.countryId.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(AirPortList())
            })
    } catch (err) { }
}

export const AirPortList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'airport_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id":"All"
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_AIRPORT_LIST,
                    payload: response.data.Response
                })
                
            })
    } catch (err) { }
}

export const ViewAirPortDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_airport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "airport_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_AIRPORT_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const AirPortStatus = (portId,status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_airport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "airport_id":portId || 0,
                "status":status
            }
        })
         .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(AirPortList())
            })
    } catch (err) { }
}

export const DeleteAirPortList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_airport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "airport_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(AirPortList())

            })
    } catch (err) { }
}