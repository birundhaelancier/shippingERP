import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_SHIPMENT_LIST } from '../../Utils/constant';

export const AddShipment = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_shipment',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "shipment_name": data.shipmentName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ShipmentList("All"))
            })
    } catch (err) { }
}
export const EditShipment = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_shipment',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "shipment_id": id,
                "shipment_name": data.shipmentName.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ShipmentList("All"))
            })
    } catch (err) { }
}

export const ShipmentList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'shipment_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "shipment_id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SHIPMENT_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ShipmentStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_shipment',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "shipment_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ShipmentList("All"))
            })
    } catch (err) { }
}

export const DeleteShipmentList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_shipment',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "shipment_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(ShipmentList("All"))
            })
    } catch (err) { }
}