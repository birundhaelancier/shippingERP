import { combineReducers } from "redux";
// import AllReducer from './allReducer'
import CountryReducer from './GenaralGroupReducer/countryReducer';
import SeaPortReducer from "./EnquiryGroupReducer/SeaPortReducer";
import AirPortReducer from "./EnquiryGroupReducer/AirPortReducer";
import StateReducer from './GenaralGroupReducer/stateReducer';
import CityReducer from './GenaralGroupReducer/cityReducer';
import HsnReducer from "./EnquiryGroupReducer/HsnReducer";
import LicenseReducer from "./EnquiryGroupReducer/LicenseReducer";
import CargoReducer from './EnquiryGroupReducer/CargoReducer'
export default combineReducers({
    CountryReducer,
    StateReducer,
    CityReducer,
    SeaPortReducer,
    AirPortReducer,
    HsnReducer,
    LicenseReducer,
    CargoReducer
    // AllReducer,

})
