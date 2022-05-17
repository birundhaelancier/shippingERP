/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CUSTOMER_DETAILS,
  VIEW_ENQUIRY_CUSTOMER_LIST,
  GET_ENQUIRY_CUSTOMER_LIST,
  SHIPMENT_VENDOR_LIST
} from "../../Utils/constant";
const initalState = {
  GetCustomerDetails: [],
  GetEnquiryCustomerDetails: [],
  ViewEnquiryCustomerDetails: [],
  Vendor_list:[]
};
export default function (state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMER_DETAILS:
      return { ...state, GetCustomerDetails: payload };
    case GET_ENQUIRY_CUSTOMER_LIST:
      return { ...state, GetEnquiryCustomerDetails: payload };
    case VIEW_ENQUIRY_CUSTOMER_LIST:
      return { ...state, ViewEnquiryCustomerDetails: payload };
    case SHIPMENT_VENDOR_LIST:
      return { ...state, Vendor_list: payload };  
    default:
      return state;
  }
}