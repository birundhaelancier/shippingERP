import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_SCHEMA_LIST, VIEW_SCHEMA_LIST } from '../../Utils/constant';

export const AddSchema = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_scheme',
            headers: REQUEST_HEADERS().HEADER,
            data: {"scheme_name":"Test","scheme_code":data.Code.value,"scheme_description":data.Description.value,
            "scheme_license":data.Liciense.value===1?"Yes":"No","user_id":JSON.parse(localStorage.getItem("user_id"))}
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SchemaList())
            })
    } catch (err) { }
}
export const EditSchema = (data, id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_scheme',
            headers: REQUEST_HEADERS().HEADER,
            data: {"scheme_name":"Test Scheme","scheme_code":data.Code.value,"scheme_description":data.Description.value,
            "scheme_license":data.Liciense.value===1?"Yes":"No","user_id":JSON.parse(localStorage.getItem("user_id")),"scheme_id":id}
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SchemaList())
            })
    } catch (err) { }
}

export const SchemaList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'scheme_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_SCHEMA_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewSchemaDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_scheme',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "scheme_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_SCHEMA_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}



export const DeleteSchema = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_scheme',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "scheme_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(SchemaList())
            })
    } catch (err) { }
}