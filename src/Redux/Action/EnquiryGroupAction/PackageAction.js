import { apiurl, REQUEST_HEADERS } from "../../Utils/baseurl";
import axios from "axios";
import { notification } from "antd";
import { GET_PACKAGE_LIST } from "../../Utils/constant";

export const AddPackage = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "add_package",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        name: data.CargoName.value,
        user_id: JSON.parse(localStorage.getItem("user_id")),
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(PackageList("All"));
    });
  } catch (err) {}
};
export const EditPackage = (data, id) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "edit_package",
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
      dispatch(PackageList("All"));
    });
  } catch (err) {}
};

export const PackageList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "package_list",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_PACKAGE_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) {}
};

export const PackageStatus = (portId, status) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "status_package",
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
      dispatch(PackageList("All"));
    });
  } catch (err) {}
};

export const DeletePackageList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "delete_package",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      notification.success({
        message: response.data.Message,
      });
      dispatch(PackageList("All"));
    });
  } catch (err) {}
};
