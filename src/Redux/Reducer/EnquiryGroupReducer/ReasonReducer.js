import { GET_REASON_LIST } from '../../Utils/constant';
const initalState = {
    GetReasonList: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_REASON_LIST:
            return { ...state, GetReasonList: payload }
        default:
            return state;
    }
};