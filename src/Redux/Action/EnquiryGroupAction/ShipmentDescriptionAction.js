import { apiurl, REQUEST_HEADERS } from "../../Utils/baseurl";
import axios from "axios";
import { notification } from "antd";
import { GET_SHIPMENT_DESCRIPTION_LIST } from "../../Utils/constant";

export const AddShipmentDescription = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "add_shipment_description",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        name: data.CargoName.value,
        user_id: JSON.parse(localStorage.getItem("user_id")),
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentDescriptionList("All"));
    });
  } catch (err) {}
};
export const EditShipmentDescription = (data, id) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "edit_shipment_description",
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
      dispatch(ShipmentDescriptionList("All"));
    });
  } catch (err) {}
};

export const ShipmentDescriptionList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "shipment_description_list",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_SHIPMENT_DESCRIPTION_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) {}
};

export const ShipmentDescriptionStatus =
  (portId, status) => async (dispatch) => {
    try {
      axios({
        method: "POST",
        url: apiurl + "status_shipment_description",
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
        dispatch(ShipmentDescriptionList("All"));
      });
    } catch (err) {}
  };

export const DeleteShipmentDescriptionList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "delete_shipment_description",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(ShipmentDescriptionList("All"));
    });
  } catch (err) {}
};
