import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CONSIGNEE_LIST, VIEW_CONSIGNEE_LIST } from '../../Utils/constant';

export const AddConsignee = (data) => {
    try {
        return fetch(apiurl + 'add_consignee', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: JSON.stringify({
                "company_name": data.companyName.value,
                "buyer": data.buyer.value,
                "primary_salute": data.salutation.value === 1 ? "Male" : "Female",
                "primary_first_name": data.fname.value,
                "primary_second_name": data.lname.value,
                "designation": data.designation.value,
                "department": data.department.value,
                "phone": data.phone.value,
                "email": data.email.value,
                "website": data.website.value,
                "business_nature": data.businessNature.value,
                "stype": "General",
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            })
        })
            .then((response) => response.json())
            .then((data) => {
                return data.Response;
            });
    } catch (err) { }
}


export const AddConsigneeAddress = (data, userId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_consignee',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "address1": data.address1.value,
                "address2": data.address2.value,
                "state": data.state.value,
                "city": data.city.value,
                "country": data.country.value,
                "zip_code": data.zipcode.value,
                "phone2": data.phone.value,
                "fax": data.fax.value,
                "stype": "Address",
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": userId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getConsigneeList("All"))
            })
    } catch (err) { }
}

export const EditConsignee = (data, consigneeId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_consignee',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "company_name": data.companyName.value,
                "buyer": data.buyer.value,
                "primary_salute": data.salutation.value === 1 ? "Male" : "Female",
                "primary_first_name": data.fname.value,
                "primary_second_name": data.lname.value,
                "designation": data.designation.value,
                "department": data.department.value,
                "phone": data.phone.value,
                "email": data.email.value,
                "website": data.website.value,
                "business_nature": data.businessNature.value,
                "stype": "General",
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": consigneeId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getConsigneeList("All"))

            })
    } catch (err) { }
}

export const EditConsigneeAddress = (data, consigneeId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_consignee',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "address1": data.address1.value,
                "address2": data.address2.value,
                "state": data.state.value,
                "city": data.city.value,
                "country": data.country.value,
                "zip_code": data.zipcode.value,
                "phone2": data.phone.value,
                "fax": data.fax.value,
                "stype": "Address",
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": consigneeId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getConsigneeList("All"))

            })
    } catch (err) { }
}

export const getConsigneeList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'consignee_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_CONSIGNEE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewConsigneeDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_consignee',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CONSIGNEE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ConsigneeStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_consignee',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "status": status || 0,
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getConsigneeList("All"))
            })
    } catch (err) { }
}

export const DeleteConsigneeList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_consignee',
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
                dispatch(getConsigneeList("All"))
            })
    } catch (err) { }
}