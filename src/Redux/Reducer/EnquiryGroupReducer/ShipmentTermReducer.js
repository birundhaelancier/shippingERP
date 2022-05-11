import { GET_SHIPMENT_TERM_LIST } from "../../Utils/constant";
const initalState = {
  GetShipmentTermList: [],
};
export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIPMENT_TERM_LIST:
      return { ...state, GetShipmentTermList: payload };
    default:
      return state;
  }
}
