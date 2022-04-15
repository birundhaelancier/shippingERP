import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_STATE_LIST, VIEW_STATE_LIST } from '../../Utils/constant';

export const AddState = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_state',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "state_name": data.stateName.value,
                "country": data.countryName.value,
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

export const EditState = (data) => async dispatch => {
    console.log(data, 'data')
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_state',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "state_name": data.stateName.value,
                "country": data.countryId.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "state_id": data.stateId.value
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
            })
    } catch (err) { }
}

export const getStateList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'state_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_STATE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewStateDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_state',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "state_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_STATE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const StateStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_state',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "state_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getStateList())
            })
    } catch (err) { }
}

export const DeleteStateList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_state',
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
                dispatch(getStateList())
            })
    } catch (err) { }
}