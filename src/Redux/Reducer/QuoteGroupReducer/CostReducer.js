import { GET_COST_LIST, VIEW_COST_LIST } from '../../Utils/constant';
const initalState = {
    GetCostList: [],
    ViewCostDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_COST_LIST:
            return { ...state, GetCostList: payload }
        case VIEW_COST_LIST:
                return { ...state, ViewCostDetails: payload }
        default:
            return state;
    }
};