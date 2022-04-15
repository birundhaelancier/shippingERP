/* eslint-disable import/no-anonymous-default-export */
import { GET_STATE_LIST, VIEW_STATE_LIST } from '../../Utils/constant';
const initalState = {
    GetStateList: [],
    ViewStateDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_STATE_LIST:
            return { ...state, GetStateList: payload }
        case VIEW_STATE_LIST:
            return { ...state, ViewStateDetails: payload }
        default:
            return state;
    }
};