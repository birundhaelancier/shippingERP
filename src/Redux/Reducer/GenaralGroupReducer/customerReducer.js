/* eslint-disable import/no-anonymous-default-export */
import { GET_CUSTOMER_LIST, VIEW_CUSTOMER_LIST } from '../../Utils/constant';
const initalState = {
    GetCustomerList: [],
    ViewCustomerDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CUSTOMER_LIST:
            return { ...state, GetCustomerList: payload }
        case VIEW_CUSTOMER_LIST:
            return { ...state, ViewCustomerDetails: payload }
        default:
            return state;
    }
};