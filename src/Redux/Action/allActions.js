import { GET_TYPES } from '../Utils/constant';
import { apiurl } from '../Utils/baseurl';

import axios from 'axios';
export const UserLogin = () => async dispatch => {
    try {
        axios({
            method: 'POST',
            url: apiurl + 'login',
            body: {
                "email":"ship_erp",
                "password":"ship_erp2022"
            }
        })
            .then((response) => {
                dispatch({
                    type: GET_TYPES,
                    payload: response.data.Response
                })
            })
    } catch (err) { }
}