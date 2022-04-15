import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_DIMENSION_LIST, VIEW_DIMENSION_LIST } from '../../Utils/constant';

export const AddDimension = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_dimension',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "dimension_name": data.dimensionName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(DimensionList())
            })
    } catch (err) { }
}
export const EditDimension = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_dimension',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "dimension_id": id,
                "dimension_name": data.dimensionName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(DimensionList())
            })
    } catch (err) { }
}

export const DimensionList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'dimension_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "dimension_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_DIMENSION_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const DimensionStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_dimension',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "dimension_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(DimensionList())
            })
    } catch (err) { }
}

export const DeleteDimensionList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_dimension',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "dimension_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(DimensionList())
            })
    } catch (err) { }
}