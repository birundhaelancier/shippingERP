/* eslint-disable import/no-anonymous-default-export */
import { GET_COUNTRY_LIST, VIEW_COUNTRY_LIST } from '../Utils/constant';
const initalState = {
    GetCountryList: [],
    ViewCountryDetails: [],
  };
export default function (state = initalState, action) {

    const { type, payload } = action;

    switch (type) {
        case GET_COUNTRY_LIST:
            return { ...state, GetCountryList: payload }
        case VIEW_COUNTRY_LIST:
            return { ...state, ViewCountryDetails: payload }
        default:
            return state;
    }
};