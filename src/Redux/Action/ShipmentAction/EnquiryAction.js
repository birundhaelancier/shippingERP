import { apiurl, REQUEST_HEADERS } from "../../Utils/baseurl";
import axios from "axios";
import { notification } from "antd";
import {
  GET_CUSTOMER_DETAILS,
  VIEW_ENQUIRY_CUSTOMER_LIST,
  GET_ENQUIRY_CUSTOMER_LIST,
  SHIPMENT_VENDOR_LIST
} from "../../Utils/constant";

export const GetCustomerDetails = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "get_customer",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        name: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_CUSTOMER_DETAILS,
        payload: response.data.Response,
      });
    });
  } catch (err) { }
};

export const AddEnquiryCustomer = (data) => {
  var formData = new FormData();
  Object.keys(data).forEach((val) => {
    formData.set(val, data[val].value);
  });
  formData.set("stype", "General");
  formData.set("user_id", JSON.parse(localStorage.getItem("user_id")));

  try {
    return fetch(apiurl + "add_enquiry", {
      method: "post",
      headers: REQUEST_HEADERS().HEADER,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (err) { }
};

export const EditEnquiryCustomer = (data, enquiryId) => {
  var formData = new FormData();
  Object.keys(data).forEach((val) => {
    formData.set(val, data[val].value);
  });
  formData.set("stype", "General");
  formData.set("user_id", JSON.parse(localStorage.getItem("user_id")));
  formData.set("id", enquiryId);

  try {
    return fetch(apiurl + "edit_enquiry", {
      method: "post",
      headers: REQUEST_HEADERS().HEADER,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (err) { }
};

export const AddShipmentCustomer = (data, userId) => {
  var formData = new FormData();
  Object.keys(data && data).forEach((val) => {
    formData.set(val, data[val].value);
  });
  formData.set("stype", "Shipment");
  formData.set("user_id", JSON.parse(localStorage.getItem("user_id")));
  formData.set("id", userId);

  try {
    return fetch(apiurl + "add_enquiry", {
      method: "post",
      headers: REQUEST_HEADERS().HEADER,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (err) { }
};

export const EditShipmentCustomer = (data, enquiryId) => {
  var formData = new FormData();
  Object.keys(data).forEach((val) => {
    formData.set(val, data[val].value);
  });
  formData.set("stype", "Shipment");
  formData.set("user_id", JSON.parse(localStorage.getItem("user_id")));
  formData.set("id", enquiryId);

  try {
    return fetch(apiurl + "edit_enquiry", {
      method: "post",
      headers: REQUEST_HEADERS().HEADER,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (err) { }
};


export const getEnquiryCustomerList = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "enquiry_list",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: GET_ENQUIRY_CUSTOMER_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) { }
};

export const ViewEnquiryCustomerDetails = (data) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "view_enquiry",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        id: data,
      },
    }).then((response) => {
      dispatch({
        type: VIEW_ENQUIRY_CUSTOMER_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) { }
};

export const CustomerEnquiryStatus = (portId, status) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "status_enquiry",
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
      dispatch(getEnquiryCustomerList("All"));
    });
  } catch (err) { }
};

export const Get_Vendor_List = (type) => async (dispatch) => {
  try {
    axios({
      method: "POST",
      url: apiurl + "get_vendor",
      headers: REQUEST_HEADERS().HEADER,
      data: {
        user_id: JSON.parse(localStorage.getItem("user_id")),
        type: 7 || 0,
      },
    }).then((response) => {
      dispatch({
        type: SHIPMENT_VENDOR_LIST,
        payload: response.data.Response,
      });
    });
  } catch (err) { }
};

export const SendRateRequest = (enq_id,vendor_id) => {
  try {
    return fetch(apiurl + "send_rate_request", {
      method: "post",
      headers: REQUEST_HEADERS().HEADER,
      body:JSON.stringify({
        "user_id":JSON.parse(localStorage.getItem("user_id")),
        "enq_id":enq_id,
        "vendor[]":vendor_id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  } catch (err) { }
};