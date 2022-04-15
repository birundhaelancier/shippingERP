import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_REASON_LIST } from '../../Utils/constant';

export const AddReason = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_reason',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "reason_name": data.ReasonName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ReasonList())
            })
    } catch (err) { }
}
export const EditReason = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_reason',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "reason_id": id,
                "reason_name": data.ReasonName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ReasonList())
            })
    } catch (err) { }
}

export const ReasonList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'reason_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "reason_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_REASON_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ReasonStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_reason',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "reason_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ReasonList())
            })
    } catch (err) { }
}

export const DeleteReasonList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_reason',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "reason_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ReasonList())
            })
    } catch (err) { }
}