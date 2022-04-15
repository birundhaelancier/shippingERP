import { GET_DIMENSION_LIST, VIEW_DIMENSION_LIST } from '../../Utils/constant';
const initalState = {
    GetDimensionList: [],
    ViewDimensionDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_DIMENSION_LIST:
            return { ...state, GetDimensionList: payload }
        case VIEW_DIMENSION_LIST:
            return { ...state, ViewDimensionDetails: payload }
        default:
            return state;
    }
};