import { GET_SHIPMENT_LIST } from '../../Utils/constant';
const initalState = {
    GetShipmentList: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_SHIPMENT_LIST:
            return { ...state, GetShipmentList: payload }
        default:
            return state;
    }
};