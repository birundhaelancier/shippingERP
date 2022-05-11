import { GET_PACKAGE_LIST } from "../../Utils/constant";
const initalState = {
  GetPackageList: [],
};
export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PACKAGE_LIST:
      return { ...state, GetPackageList: payload };
    default:
      return state;
  }
}
