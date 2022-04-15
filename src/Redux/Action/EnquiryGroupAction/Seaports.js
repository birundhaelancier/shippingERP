import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_COUNTRY_LIST, VIEW_COUNTRY_LIST,GET_SEA_LIST,VIEW_SEA_LIST } from '../../Utils/constant';

export const AddSeaPort = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_seaport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "seaport_name": data.portName.value,
                "seaport_code": data.portCode.value,
                "country": data.countryName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SeaPortList())
            })
    } catch (err) { }
}
export const EditSeaPort = (data,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_seaport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "seaport_id": id,
                "seaport_name": data.portName.value,
                "seaport_code": data.portCode.value,
                "country":data.countryName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SeaPortList())
            })
    } catch (err) { }
}

export const SeaPortList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'seaport_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "country_id":"All"
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SEA_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewSeaPortDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_seaport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "seaport_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_SEA_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const SeaPortStatus = (portId,status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_seaport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "seaport_id":portId || 0,
                "status":status || 0
            }
        })
         .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SeaPortList())
            })
    } catch (err) { }
}

export const DeleteSeaPortList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_seaport',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "seaport_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SeaPortList())
            })
    } catch (err) { }
}