import { GET_SALES_LIST, VIEW_SALES_LIST } from '../../Utils/constant';
const initalState = {
    GetSalesList: [],
    ViewSalesDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;
    switch (type) {
        case GET_SALES_LIST:
            return { ...state, GetSalesList: payload }
        case VIEW_SALES_LIST:
                return { ...state, ViewSalesDetails: payload }
        default:
            return state;
    }
};