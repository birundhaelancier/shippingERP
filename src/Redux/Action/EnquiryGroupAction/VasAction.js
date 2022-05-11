import { apiurl, REQUEST_HEADERS } from "../../Utils/baseurl";
import axios from "axios";
import { notification } from "antd";
import { GET_VAS_LIST } from "../../Utils/constant";

export const AddVas = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "add_vas_type",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        name: data.CargoName.value,
        user_id: JSON.parse(localStorage.getItem("user_id")),
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(VasList("All"));
    });
  } catch (err) {}
};
export const EditVas = (data, id) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "edit_vas_type",
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
      dispatch(VasList("All"));
    });
  } catch (err) {}
};

export const VasList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "vas_type_list",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_VAS_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) {}
};

export const VasStatus = (portId, status) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "status_vas_type",
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
      dispatch(VasList("All"));
    });
  } catch (err) {}
};

export const DeleteVasList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "delete_vas_type",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(VasList("All"));
    });
  } catch (err) {}
};
