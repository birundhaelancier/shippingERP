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

    console.log(data, userId, 'test')
    var formData = new FormData()

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}`, data[val])
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
                return data;
            });
    } catch (err) { }
}


export const AddVendorKyc = (kycInfo, data, userId) => {
    var formData = new FormData()
    Object.keys(kycInfo)?.forEach((val) => {
        formData.set([val], kycInfo[val].value)
    })
    console.log(data, userId, 'image')

    data.gst_image.forEach((val) => {
        formData.append(`gst_image[]`, val)
    })
    data.gst_reg.forEach((val) => {
        formData.append(`gst_reg[]`, val)
    })
    data.gst_state.forEach((val) => {
        formData.append(`gst_state[]`, val)
    })

    formData.set(`id`, userId)
    formData.set(`stype`, `KYC`)
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

export const AddVendorContact = (data, userId) => {
    var formData = new FormData()
    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}`, data[val])
    })
    formData.set(`id`, userId)
    formData.set(`stype`, `Contact`)
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

export const AddVendorDocument = (data, userId) => {
    var formData = new FormData()

    data.document_name.forEach((val) => {
        formData.append(`document_name[]`, val)
    })

    data.document.forEach((val) => {
        formData.append(`document[]`, val)
    })

    formData.set(`id`, userId)
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

export const EditVendor = (data, vendorId) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(val, data[val].value)
    })
    formData.set(`id`, vendorId)
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

export const EditVendorAddress = (data, vendorId) => {
    var formData = new FormData()

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}`, data[val])
    })
    formData.set(`id`, vendorId)
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

export const EditVendorKyc = (kycInfo, data, vendorId) => {
    var formData = new FormData()
    Object.keys(kycInfo)?.forEach((val) => {
        formData.set([val], kycInfo[val].value)
    })

    formData.set( 'pan_no' , kycInfo.pan_no.value)
    formData.set( 'cin_no' , kycInfo.cin_no.value)
    formData.set( 'msme_reg' , kycInfo.msme_reg.value)
    formData.set( 'iec_reg' , kycInfo.iec_reg.value)

    formData.set( 'pan_image' , typeof val === 'string' ? "" : kycInfo.pan_image.value)
    formData.set( 'cin_image' , typeof val === 'string' ? "" : kycInfo.cin_image.value)
    formData.set( 'iec_image' , typeof val === 'string' ? "" : kycInfo.iec_image.value)
    formData.set( 'msme_image' , typeof val === 'string' ? "" : kycInfo.msme_image.value)

    data.gst_image.forEach((val) => {
        formData.append(`gst_image[]`, typeof val === 'string' ? "" : val)
    })
    data.gst_reg.forEach((val) => {
        formData.append(`gst_reg[]`, val)
    })
    data.gst_state.forEach((val) => {
        formData.append(`gst_state[]`, val)
    })

    formData.set(`id`, vendorId)
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

export const EditVendorContact = (data, vendorId) => {
    var formData = new FormData()
    console.log(data, 'tet')

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}`, data[val])
    })
    formData.set(`id`, vendorId)
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

export const EditVendorDocument = (data, vendorId) => {
    console.log(data, 'yuyu')
    var formData = new FormData()

    data.document_name.forEach((val) => {
        formData.append(`document_name[]`, val)
    })

    data.document.forEach((val) => {
        formData.append(`document[]`, typeof val === 'string' ? "" : val)
    })

    formData.set(`id`, vendorId)
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