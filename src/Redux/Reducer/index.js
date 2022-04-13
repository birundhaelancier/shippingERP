import { combineReducers } from "redux";
// import AllReducer from './allReducer'
import CountryReducer from './GenaralGroupReducer/countryReducer';
import StateReducer from './GenaralGroupReducer/stateReducer';
import CityReducer from './GenaralGroupReducer/cityReducer';

export default combineReducers({
    CountryReducer,
    StateReducer,
    CityReducer
})
