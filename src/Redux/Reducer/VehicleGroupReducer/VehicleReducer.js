import { GET_VEHICLE_LIST, VIEW_VEHICLE_LIST } from '../../Utils/constant';
const initalState = {
    GetVehicleList: [],
    ViewVehicleDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_VEHICLE_LIST:
            return { ...state, GetVehicleList: payload }
        case VIEW_VEHICLE_LIST:
                return { ...state, ViewVehicleDetails: payload }
        default:
            return state;
    }
};