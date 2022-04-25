/* eslint-disable import/no-anonymous-default-export */
import { GET_CONSIGNEE_LIST, VIEW_CONSIGNEE_LIST } from '../../Utils/constant';
const initalState = {
    GetConsigneeList: [],
    ViewConsigneeDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CONSIGNEE_LIST:
            return { ...state, GetConsigneeList: payload }
        case VIEW_CONSIGNEE_LIST:
            return { ...state, ViewConsigneeDetails: payload }
        default:
            return state;
    }
};