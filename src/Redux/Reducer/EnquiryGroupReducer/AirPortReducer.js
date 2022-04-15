/* eslint-disable import/no-anonymous-default-export */
import { GET_AIRPORT_LIST, VIEW_AIRPORT_LIST } from '../../Utils/constant';
const initalState = {
    GetAirPortList: [],
    ViewAirPortDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_AIRPORT_LIST:
            return { ...state, GetAirPortList: payload }
        case VIEW_AIRPORT_LIST:
            return { ...state, ViewAirPortDetails: payload }
        default:
            return state;
    }
};