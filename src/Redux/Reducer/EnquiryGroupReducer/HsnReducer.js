import { GET_HSN_LIST,VIEW_HSN_LIST } from '../../Utils/constant';
const initalState = {
    GetHsnList: [],
    ViewHsnDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_HSN_LIST:
            return { ...state, GetHsnList: payload }
        case VIEW_HSN_LIST:
            return { ...state, ViewHsnDetails: payload }
        default:
            return state;
    }
};