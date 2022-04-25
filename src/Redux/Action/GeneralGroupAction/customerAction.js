import { apiurl, REQUEST_HEADERS } from '../../Utils/baseurl';
import axios from 'axios';
import { notification } from 'antd';
import { GET_CUSTOMER_LIST, VIEW_CUSTOMER_LIST } from '../../Utils/constant';

export const AddCustomer = (data) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(val, data[val].value)
    })
    try {
        return fetch(apiurl + 'add_customer', {
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

export const AddCustomerAddress = (data, userId) => {

    console.log(data, 'test')
    var formData = new FormData()

    Object.keys(data).forEach((val) => {
        // Array.from(data[val]).forEach(image => {
            formData.set(`${val}[]`, `[${data[val]}]`)

        // })
    })
    formData.set(`id`, userId)
    formData.set(`stype`, `Address`)
    try {
        return fetch(apiurl + 'add_customer', {
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


export const AddCustomerKyc = (kycInfo, data, userId) => {
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
        return fetch(apiurl + 'edit_customer', {
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

export const AddCustomerContact = (data, userId) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(`${val}[]`, data[val])
    })
    formData.set(`id`, userId)
    formData.set(`stype`, `Address`)
    try {
        return fetch(apiurl + 'add_customer', {
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

export const AddCustomerDocument = (data, userId) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'add_customer',
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
                dispatch(getCustomerList("All"))
            })
    } catch (err) { }
}

export const EditCustomer = (data, customerId) => {
    var formData = new FormData()
    Object.keys(data).forEach((val) => {
        formData.set(val, data[val].value)
    })
    formData.set(`id`, customerId)
    try {
        return fetch(apiurl + 'edit_customer', {
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
    //         url: apiurl + 'edit_customer',
    //         headers: REQUEST_HEADERS().HEADER,
    //         data: formData,
    //     })
    //         .then((response) => {
    //             notification.success({
    //                 message: response.data.Message
    //             });
    //             dispatch(getCustomerList("All"))

    //         })
    // } catch (err) { }
}

export const EditCustomerAddress = (data, customerId) => {
    var formData = new FormData()

    Object.keys(data)?.forEach((val) => {
    console.log(data[val], 'tet')
        formData.append(`${val}[]`, data[val].toString())
    })
    formData.set(`id`, customerId)
    formData.set(`stype`, `Address`)

    
    try {
        return fetch(apiurl + 'edit_customer', {
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

export const EditCustomerKyc = (kycInfo, data, customerId) => {
    var formData = new FormData()
    Object.keys(kycInfo)?.forEach((val) => {
        formData.set([val], kycInfo[val].value)
    })
    console.log(data, 'image')
    // Object.keys(data).forEach((val) => {
        formData.append(`gst_reg[]`, `[${data.gst_reg}]`)
        formData.append(`gst_state[]`, `[${data.gst_state}]`)
        formData.append(`gst_image[]`, data.gst_image)
    // })

    formData.set(`id`, customerId)
    formData.set(`stype`, `KYC`)
    try {
        return fetch(apiurl + 'edit_customer', {
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

export const EditCustomerContact = (data, customerId) => {
    var formData = new FormData()
    console.log(data, 'tet')

    Object.keys(data)?.forEach((val) => {
        formData.append(`${val}[]`, `[${data[val]}]`)
    })
    formData.set(`id`, customerId)
    formData.set(`stype`, `Contact`)
    try {
        return fetch(apiurl + 'edit_customer', {
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

export const EditCustomerDocument = (data, customerId) => {
    console.log(data, 'yuyu')
    var formData = new FormData()
    // Object.keys(data).forEach((val) => {
    formData.append(`document[]`, `[${data?.document}]`)
    formData.append(`document_name[]`, `[${data?.document_name}]`)

    // })

    formData.set(`id`, customerId)
    formData.set(`stype`, `Documents`)
    try {
        return fetch(apiurl + 'edit_customer', {
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

export const getCustomerList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'customer_list',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_CUSTOMER_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const ViewCustomerDetails = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'view_customer',
            headers: REQUEST_HEADERS().HEADER,
            data: {
                "user_id": JSON.parse(localStorage.getItem("user_id")),
                "id": data,
            }
        })
            .then((response) => {
                dispatch({
                    type: VIEW_CUSTOMER_LIST,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}

export const CustomerStatus = (portId, status) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'status_customer',
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
                dispatch(getCustomerList("All"))
            })
    } catch (err) { }
}

export const DeleteCustomerList = (data) => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'delete_customer',
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
                dispatch(getCustomerList("All"))
            })
    } catch (err) { }
}