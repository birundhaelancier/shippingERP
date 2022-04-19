import { GET_SCOPE_LIST,VIEW_SCOPE_LIST } from '../../Utils/constant';
const initalState = {
    GetBusinessScopeList: [],
    ViewBusinessScopeList:[]
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_SCOPE_LIST:
            return { ...state, GetBusinessScopeList: payload }
        case VIEW_SCOPE_LIST:
            return { ...state, ViewBusinessScopeList: payload }
        default:
            return state;
    }
};