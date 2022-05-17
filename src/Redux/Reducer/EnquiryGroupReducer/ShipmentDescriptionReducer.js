import { GET_SHIPMENT_DESCRIPTION_LIST } from "../../Utils/constant";
const initalState = {
  GetShipmentDescriptionList: [],
};
export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPMENT_DESCRIPTION_LIST:
      return { ...state, GetShipmentDescriptionList: payload };
    default:
      return state;
  }
}
