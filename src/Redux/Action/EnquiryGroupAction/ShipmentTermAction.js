import { apiurl, REQUEST_HEADERS } from "../../Utils/baseurl";
import axios from "axios";
import { notification } from "antd";
import { GET_SHIPMENT_TERM_LIST } from "../../Utils/constant";

export const AddShipmentTerm = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "add_shipment_term",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        name: data.CargoName.value,
        user_id: JSON.parse(localStorage.getItem("user_id")),
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentTermList("All"));
    });
  } catch (err) {}
};
export const EditShipmentTerm = (data, id) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "edit_shipment_term",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        id: id,
        name: data.CargoName.value,
        user_id: JSON.parse(localStorage.getItem("user_id")),
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentTermList("All"));
    });
  } catch (err) {}
};

export const ShipmentTermList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "shipment_term_list",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_SHIPMENT_TERM_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) {}
};

export const ShipmentTermStatus = (portId, status) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "status_shipment_term",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: portId || 0,
        status: status || 0,
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentTermList("All"));
    });
  } catch (err) {}
};

export const DeleteShipmentTermList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "delete_shipment_term",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentTermList("All"));
    });
  } catch (err) {}
};
