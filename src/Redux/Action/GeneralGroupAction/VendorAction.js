import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_VENDOR_LIST, VIEW_VENDOR_LIST } from '../../Utils/constant';

export const AddVendor = (data) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(val, data[val].value)
    })
    try {
        return fetch(apiurl + 'add_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const AddVendorAddress = (data, userId) => {

    console.log(data, 'test')
    var formData = new FormData()

    Object.keys(data).forEach((val) => {
        Array.from(data[val]).forEach(image => {
            formData.set(`${val}[]`, data[val])

        })
    })
    formData.set(`id`, userId)
    formData.set(`stype`, `Address`)
    try {
        return fetch(apiurl + 'add_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data.Response;
            });
    } catch (err) { }
}


export const AddVendorKyc = (kycInfo, data, userId) => {
    var formData = new FormData()
    Object.keys(kycInfo)?.forEach((val) => {
        formData.set([val], kycInfo[val].value)
    })
    Object.keys(data).forEach((val) => {
        formData.append(`gst_reg[]`, `[${data.gst_reg}]`)
        formData.append(`gst_state[]`, `[${data.gst_state}]`)
        formData.append(`gst_image[]`, data.gst_image)
    })

    formData.set(`id`, userId)
    formData.set(`stype`, `KYC`)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const AddVendorContact = (data, userId) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(`${val}[]`, data[val])
    })
    formData.set(`id`, userId)
    formData.set(`stype`, `Address`)
    try {
        return fetch(apiurl + 'add_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data.Response;
            });
    } catch (err) { }
}

export const AddVendorDocument = (data, userId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_vendor',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "document_name": [],
                "document": [],
                "stype": "Documents",
                "id": userId
            }
        })
            .then((response) => {
                notification.success({
                    message: response.data.Message
                });
                dispatch(getVendorList("All"))
            })
    } catch (err) { }
}

export const EditVendor = (data, VendorId) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(val, data[val].value)
    })
    formData.set(`id`, VendorId)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
    // try {
    //     axios({
    //         method: 'POST',
    //         url: apiurl + 'edit_vendor',
    //         headers: REQUEST_HEADERS().HEADER,
    //         data: formData,
    //     })
    //         .then((response) => {
    //             notification.success({
    //                 message: response.data.Message
    //             });
    //             dispatch(getVendorList("All"))

    //         })
    // } catch (err) { }
}

export const EditVendorAddress = (data, VendorId) => {
    var formData = new FormData()
    console.log(data, 'tet')

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}[]`, `[${data[val]}]`)
    })
    formData.set(`id`, VendorId)
    formData.set(`stype`, `Address`)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const EditVendorKyc = (kycInfo, data, VendorId) => {
    var formData = new FormData()
    Object.keys(kycInfo)?.forEach((val) => {
        formData.set([val], kycInfo[val].value)
    })
    Object.keys(data).forEach((val) => {
        formData.append(`gst_reg[]`, `[${data.gst_reg}]`)
        formData.append(`gst_state[]`, `[${data.gst_state}]`)
        formData.append(`gst_image[]`, data.gst_image)
    })

    formData.set(`id`, VendorId)
    formData.set(`stype`, `KYC`)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const EditVendorContact = (data, VendorId) => {
    var formData = new FormData()
    console.log(data, 'tet')

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}[]`, `[${data[val]}]`)
    })
    formData.set(`id`, VendorId)
    formData.set(`stype`, `Contact`)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const EditVendorDocument = (data, VendorId) => {
    console.log(data, 'yuyu')
    var formData = new FormData()
    // Object.keys(data).forEach((val) => {
    formData.append(`document[]`, `[${data?.document}]`)
    formData.append(`document_name[]`, `[${data?.document_name}]`)

    // })

    formData.set(`id`, VendorId)
    formData.set(`stype`, `Documents`)
    try {
        return fetch(apiurl + 'edit_vendor', {
            method: "post",
            headers: REQUEST_HEADERS().HEADER,
            body: formData
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    } catch (err) { }
}

export const getVendorList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'vendor_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_VENDOR_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewVendorDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_vendor',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_VENDOR_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const VendorStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_vendor',
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
                dispatch(getVendorList("All"))
            })
    } catch (err) { }
}

export const DeleteVendorList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_vendor',
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
                dispatch(getVendorList("All"))
            })
    } catch (err) { }
}