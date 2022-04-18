import { GET_CURRENCY_LIST, VIEW_CURRENCY_LIST } from '../../Utils/constant';
const initalState = {
    GetCurrencyList: [],
    ViewCurrencyDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_CURRENCY_LIST:
            return { ...state, GetCurrencyList: payload }
            case VIEW_CURRENCY_LIST:
                return { ...state, ViewCurrencyDetails: payload }
        default:
            return state;
    }
};