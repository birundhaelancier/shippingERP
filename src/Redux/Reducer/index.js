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
import DimensionReducer from './EnquiryGroupReducer/DimensionReducer';
import ShipmentReducer from './EnquiryGroupReducer/ShipmentReducer';
import ReasonReducer from './EnquiryGroupReducer/ReasonReducer';
import SchemaReducer from "./EnquiryGroupReducer/SchemaReducer";
import BusinessScopeReducer from "./EnquiryGroupReducer/BusinessScopeReducer";
import RateReducer from "./GenaralGroupReducer/RateReducer";
export default combineReducers({
    CountryReducer,
    StateReducer,
    CityReducer,
    SeaPortReducer,
    AirPortReducer,
    HsnReducer,
    LicenseReducer,
    CargoReducer,
    DimensionReducer,
    ShipmentReducer,
    ReasonReducer,
    SchemaReducer,
    BusinessScopeReducer,
    RateReducer
})
