import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CARGO_LIST, VIEW_CARGO_LIST } from '../../Utils/constant';

export const AddCargo = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_cargo',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "cargo_name": data.CargoName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CargoList())
            })
    } catch (err) { }
}
export const EditCargo = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_cargo',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "cargo_id": id,
                "cargo_name": data.CargoName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CargoList())
            })
    } catch (err) { }
}

export const CargoList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'cargo_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cargo_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_CARGO_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCargoDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_cargo',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "seaport_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CARGO_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CargoStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_cargo',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "cargo_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(CargoList())
            })
    } catch (err) { }
}

export const DeleteCargoList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_cargo',
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
                dispatch(CargoList())
            })
    } catch (err) { }
}