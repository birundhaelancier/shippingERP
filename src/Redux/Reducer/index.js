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
import CurrencyReducer from './QuoteGroupReducer/CurrencyReducer';
import VehicleReducer from './VehicleGroupReducer/VehicleReducer';
import CostReducer from './QuoteGroupReducer/CostReducer';
import QuoteReducer from './QuoteGroupReducer/QuoteReducer';
import CustomerBusinessReducer from './GenaralGroupReducer/customerBusinessReducer';
import VendorBusinessReducer from './GenaralGroupReducer/vendorBusinessReducer';

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
    CurrencyReducer,
    VehicleReducer,
    CostReducer,
    QuoteReducer,
    CustomerBusinessReducer,
    VendorBusinessReducer,
})
