import { combineReducers } from "redux";
// import AllReducer from './allReducer'
import CountryReducer from './countryReducer';
import SeaPortReducer from "./SeaPortReducer";
import AirPortReducer from "./AirPortReducer";
import HsnReducer from "./HsnReducer";
import LicenseReducer from "./LicenseReducer";
export default combineReducers({
    CountryReducer,
    SeaPortReducer,
    AirPortReducer,
    HsnReducer,
    LicenseReducer
    // AllReducer,

})
