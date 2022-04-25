import { GET_RATE_LIST,VIEW_RATE_LIST } from '../../Utils/constant';
const initalState = {
    GetRateList: [],
    ViewRateList:[]
  };
export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_RATE_LIST:
            return { ...state, GetRateList: payload }
        case VIEW_RATE_LIST:
            return { ...state, ViewRateList: payload }
        default:
            return state;
    }
};