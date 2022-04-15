/* eslint-disable import/no-anonymous-default-export */
import { GET_SEA_LIST, VIEW_SEA_LIST } from '../../Utils/constant';
const initalState = {
    GetSeaList: [],
    ViewSeaDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_SEA_LIST:
            return { ...state, GetSeaList: payload }
        case VIEW_SEA_LIST:
            return { ...state, ViewSeaDetails: payload }
        default:
            return state;
    }
};