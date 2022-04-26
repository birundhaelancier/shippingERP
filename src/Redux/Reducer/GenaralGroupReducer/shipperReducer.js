/* eslint-disable import/no-anonymous-default-export */
import { GET_SHIPPER_LIST, VIEW_SHIPPER_LIST } from '../../Utils/constant';
const initalState = {
    GetShipperList: [],
    ViewShipperDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_SHIPPER_LIST:
            return { ...state, GetShipperList: payload }
        case VIEW_SHIPPER_LIST:
            return { ...state, ViewShipperDetails: payload }
        default:
            return state;
    }
};