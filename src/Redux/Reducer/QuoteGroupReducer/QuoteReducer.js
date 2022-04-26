import { GET_QUOTE_LIST, VIEW_QUOTE_LIST } from '../../Utils/constant';
const initalState = {
    GetQuoteList: [],
    ViewQuoteDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_QUOTE_LIST:
            return { ...state, GetQuoteList: payload }
        case VIEW_QUOTE_LIST:
                return { ...state, ViewQuoteDetails: payload }
        default:
            return state;
    }
};