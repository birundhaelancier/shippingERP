import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_SHIPPER_LIST, VIEW_SHIPPER_LIST } from '../../Utils/constant';

export const AddShipper = (data) => {
    try {
        return fetch(apiurl + 'add_shipper', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: JSON.stringify({
                "company_name": data.companyName.value,
                "exporter": data.exporter.value,
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
export const AddShipperAddress = (data, userId) => async dispatch => {
    // try {
        axios({
            method: 'POST',
            url: apiurl + 'add_shipper',
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
                dispatch(getShipperList("All"))

            })
    // } catch (err) { }
}
export const EditShipper = (data, countryId) => async dispatch => {
    // try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_shipper',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "company_name": data.companyName.value,
                "exporter": data.exporter.value,
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
                "id": countryId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getShipperList("All"))
            })
    // } catch (err) { }
}

export const EditShipperAddress = (data, countryId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_shipper',
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
                "id": countryId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getShipperList("All"))
            })
    } catch (err) { }
}

export const getShipperList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'shipper_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SHIPPER_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewShipperDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_shipper',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_SHIPPER_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ShipperStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_shipper',
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
                dispatch(getShipperList("All"))
            })
    } catch (err) { }
}

export const DeleteShipperList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_shipper',
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
                dispatch(getShipperList("All"))
            })
    } catch (err) { }
}