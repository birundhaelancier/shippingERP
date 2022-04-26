import { GET_LEAD_LIST, VIEW_LEAD_LIST } from '../../Utils/constant';
const initalState = {
    GetLeadList: [],
    ViewLeadDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEAD_LIST:
            return { ...state, GetLeadList: payload }
        case VIEW_LEAD_LIST:
                return { ...state, ViewLeadDetails: payload }
        default:
            return state;
    }
};