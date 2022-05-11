import { GET_VAS_LIST } from "../../Utils/constant";
const initalState = {
  GetVasList: [],
};
export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VAS_LIST:
      return { ...state, GetVasList: payload };
    default:
      return state;
  }
}
