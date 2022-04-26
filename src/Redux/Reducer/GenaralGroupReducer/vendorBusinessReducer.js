/* eslint-disable import/no-anonymous-default-export */
import { GET_VENDOR_BUSINESS_NATURE_LIST, VIEW_VENDOR_BUSINESS_NATURE_LIST } from '../../Utils/constant';
const initalState = {
    GetVendorBusinessList: [],
    ViewVendorBusinessDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_VENDOR_BUSINESS_NATURE_LIST:
            return { ...state, GetVendorBusinessList: payload }
        case VIEW_VENDOR_BUSINESS_NATURE_LIST:
            return { ...state, ViewVendorBusinessDetails: payload }
        default:
            return state;
    }
};