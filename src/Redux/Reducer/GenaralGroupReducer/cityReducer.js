/* eslint-disable import/no-anonymous-default-export */
import { GET_CITY_LIST, VIEW_CITY_LIST } from '../../Utils/constant';
const initalState = {
    GetCityList: [],
    ViewCityDetails: [],
  };
export default function (state = initalState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CITY_LIST:
            return { ...state, GetCityList: payload }
        case VIEW_CITY_LIST:
            return { ...state, ViewCityDetails: payload }
        default:
            return state;
    }
};