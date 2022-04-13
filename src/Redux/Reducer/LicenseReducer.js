import { GET_LICENSE_LIST, VIEW_LICENSE_LIST } from '../Utils/constant';
const initalState = {
    GetLicenseList: [],
    ViewLicenseDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_LICENSE_LIST:
            return { ...state, GetLicenseList: payload }
        case VIEW_LICENSE_LIST:
            return { ...state, ViewLicenseDetails: payload }
        default:
            return state;
    }
};