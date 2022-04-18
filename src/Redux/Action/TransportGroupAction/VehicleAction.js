import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_VEHICLE_LIST, VIEW_VEHICLE_LIST } from '../../Utils/constant';

export const AddVehicle = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_vehicle',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "name": data.vehicleName.value,
                "body_type": data.bodyType.value,
                "length": data.length.value,
                "breadth": data.breadth.value,
                "height": data.height.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(VehicleList())
            })
    } catch (err) { }
}
export const EditVehicle = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_vehicle',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "id": id,
                "name": data.vehicleName.value,
                "body_type": data.bodyType.value,
                "length": data.length.value,
                "breadth": data.breadth.value,
                "height": data.height.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(VehicleList())
            })
    } catch (err) { }
}

export const VehicleList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'vehicle_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_VEHICLE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewVehicleDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_vehicle',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_VEHICLE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const VehicleStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_vehicle',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(VehicleList())
            })
    } catch (err) { }
}

export const DeleteVehicleList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_vehicle',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(VehicleList())
            })
    } catch (err) { }
}