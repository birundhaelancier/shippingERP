import { GET_CARGO_LIST, VIEW_CARGO_LIST } from '../../Utils/constant';
const initalState = {
    GetCargoList: [],
    ViewCargoDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_CARGO_LIST:
            return { ...state, GetCargoList: payload }
        case VIEW_CARGO_LIST:
            return { ...state, ViewCargoDetails: payload }
        default:
            return state;
    }
};