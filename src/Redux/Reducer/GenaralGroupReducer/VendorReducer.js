/* eslint-disable import/no-anonymous-default-export */
import { GET_VENDOR_LIST, VIEW_VENDOR_LIST } from '../../Utils/constant';
const initalState = {
    GetVendorList: [],
    ViewVendorDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_VENDOR_LIST:
            return { ...state, GetVendorList: payload }
        case VIEW_VENDOR_LIST:
            return { ...state, ViewVendorDetails: payload }
        default:
            return state;
    }
};