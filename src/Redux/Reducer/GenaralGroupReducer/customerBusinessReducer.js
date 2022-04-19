/* eslint-disable import/no-anonymous-default-export */
import { GET_CUSTOMER_BUSINESS_NATURE_LIST, VIEW_CUSTOMER_BUSINESS_NATURE_LIST, GET_BUSINESS_TYPE } from '../../Utils/constant';
const initalState = {
    GetCustomerBusinessList: [],
    ViewCustomerBusinessDetails: [],
    businessType: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_CUSTOMER_BUSINESS_NATURE_LIST:
            return { ...state, GetCustomerBusinessList: payload }
        case VIEW_CUSTOMER_BUSINESS_NATURE_LIST:
            return { ...state, ViewCustomerBusinessDetails: payload }
        case GET_BUSINESS_TYPE:
            return { ...state, businessType: payload }
        default:
            return state;
    }
};