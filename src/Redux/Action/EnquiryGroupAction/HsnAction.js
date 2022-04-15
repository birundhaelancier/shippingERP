import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_HSN_LIST,VIEW_HSN_LIST } from '../../Utils/constant';

export const AddHsn = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_hsn',
            headers: REQUEST_HEADERS().HEADER,
            data:{
            "type":data.transaction.value===1?"Import":"Export","section_name":data.sectionName.value,"chapter_name":data.chapterName.value,"hsn_code":data.hsnCode.value,
            "description":data.description.value,"unit":data.unit.value,"rate_standard":data.rateStandard.value,"rate_preferential":data.ratePre.value, 
            "section_description": "test", "chapter_description": "test","user_id": JSON.parse(localStorage.getItem("user_id"))}
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(HsnList())
            })
    } catch (err) { }
}
export const EditHsn = (data,id) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'edit_hsn',
            headers: REQUEST_HEADERS().HEADER,
            data:{
                "type":data.transaction.value===1?"Import":"Export","section_name":data.sectionName.value,"chapter_name":data.chapterName.value,"hsn_code":data.hsnCode.value,
                "description":data.description.value,"unit":data.unit.value,"rate_standard":data.rateStandard.value,"rate_preferential":data.ratePre.value, 
                "section_description": "test", "chapter_description": "test","hsn_id":id,"user_id": JSON.parse(localStorage.getItem("user_id"))}
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(HsnList())
            })
    } catch (err) { }
}

export const HsnList = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'hsn_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "hsn_id":"All"
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_HSN_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewHsnDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_hsn',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "hsn_id": data || 0,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_HSN_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const HsnStatus = (portId,status) => async dispatch => {

    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_hsn',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "hsn_id":portId || 0,
                "status":status || 0
            }
        })
         .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(HsnList())
            })
    } catch (err) { }
}

export const DeleteHsnList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_hsn',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "hsn_id": data
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(HsnList())
            })
    } catch (err) { }
}