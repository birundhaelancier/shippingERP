import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_LEAD_LIST, VIEW_LEAD_LIST } from '../../Utils/constant';

export const AddLead = (data) => async dispatch => {
    console.log(data, 'AddLead');
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_lead',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "company_name": data.companyName.value,
                "company_address": data.companyAddress.value,
                "country": data.country.value,
                "state": data.state.value,
                "city": data.city.value,
                "area": data.area.value,
                "contact_person": data.contactPerson.value,
                "mobile": data.mobile.value,
                "phone": data.phone.value,
                "email": data.email.value,
                "website": data.website.value,
                "lead_source": data.leadSource.value,
                "business_presence": data.businessPresence.value,
                "business_nature": data.businessNature.value,
                "user_id": JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LeadList())
            })
    } catch (err) { alert('catch') }
}

export const EditLead = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_lead',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "company_name": data.companyName.value,
                "company_address": data.companyAddress.value,
                "country": data.country.value,
                "state": data.state.value,
                "city": data.city.value,
                "area": data.area.value,
                "contact_person": data.contactPerson.value,
                "mobile": data.mobile.value,
                "phone": data.phone.value,
                "email": data.email.value,
                "website": data.website.value,
                "lead_source": data.leadSource.value,
                "business_presence": data.businessPresence.value,
                "business_nature": data.businessNature.value,
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": id
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LeadList())
            })
    } catch (err) { }
}

export const LeadList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'lead_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_LEAD_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewLeadDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_lead',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_LEAD_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const LeadStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_lead',
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
                dispatch(LeadList())
            })
    } catch (err) { }
}

export const LeadDefault = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'default_lead',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": portId || 0,
                "default": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(LeadList())
            })
    } catch (err) { }
}

export const DeleteLeadList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_lead',
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
                dispatch(LeadList())
            })
    } catch (err) { }
}