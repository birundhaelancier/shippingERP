import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { VIEW_SCOPE_LIST,GET_SCOPE_LIST } from '../../Utils/constant';

export const AddBusinessScope = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_business_scope',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "business_scope_code":data.Code.value,
                "business_scope_name":data.Name.value,
                "business_scope_description":data.Description.value,
                "user_id":JSON.parse(localStorage.getItem("user_id"))
            }
            })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(BusinessScopeList())
            })
    } catch (err) { }
}
export const EditBusinessScope = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_business_scope',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "business_scope_id":id,
                "business_scope_code":data.Code.value,
                "business_scope_name":data.Name.value,
                "business_scope_description":data.Description.value,
                "user_id":JSON.parse(localStorage.getItem("user_id"))
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(BusinessScopeList())
            })
    } catch (err) { }
}
export const ViewBusinessScopeDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_business_scope',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "scheme_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_SCOPE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const BusinessScopeList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'business_scope_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "business_scope_id": "All",
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SCOPE_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const BusinessScopeStatus = (portId, status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_business_scope',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "business_scope_id": portId || 0,
                "status": status || 0
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(BusinessScopeList())
            })
    } catch (err) { }
}

export const DeleteBusinessScopeList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_business_scope',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "business_scope_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(BusinessScopeList())
            })
    } catch (err) { }
}