import react, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import CustomButton from "../../components/Button";
// import './customer.css';
import { ViewEnquiryCustomerDetails } from "../../Redux/Action/ShipmentAction/EnquiryAction";
import { useDispatch, useSelector } from "react-redux";

const ViewEnquiry = ({ GetId }) => {
  let dispatch = useDispatch();
  const ViewEnquiry = useSelector(
    (state) => state.EnquiryReducer.ViewEnquiryCustomerDetails
  );
  const [generalDetails, setgeneralDetails] = useState({
    cus_name: "Customer Name",
    contact: "Contact",
    designation: "Designation",
    mobile: "Mobile",
    phone: "Phone",
    email: "Email",
    address: "Address",
    country: "Country",
    state: "State",
    city: "City",
    enq_date: "ENQ Date",
    shipment_type: "Shipment Type",
    shipment_descp: "Shipment Description",
    shipment_term: "Shipment Term",
    business_scope: "Business Scope",
    origin: "Origin",
    destination: "Destination",
    commodity: "Commodity",
    nature_clearance: "Nature of Clearance",
    cargo: "Cargo",
    package: "Package",
    package_no: "No Of Package",
    no_containers: "No of Containers",
    gross_wt: "Gross Wt",
    net_wt: "Net Wt",
    volumetric_wt: "Volumetric Wt",
    chargeable_wt: "Chargeable Wt",
    pickup_location: "Pickup Location",
    drop_location: "Drop Location",
    vehicle: "Vehicle Type",
    vas_type: "Types of VAS",
    enq_status: "Enquiry Status",
    cut_of_date: "Enquiry Cut of Date",
    reason: "Reason",
  });

  useEffect(() => {
    dispatch(ViewEnquiryCustomerDetails(GetId));
  }, []);

  return (
    <>
      <Grid item xs={12} spacing={2} direction="row" container>
        {Object.keys(generalDetails).map((data) => {
          return (
            <Grid item xs={12} md={3} sx={12} sm={12}>
              <label className="labeltxtView">{generalDetails[data]}</label>
              <div>{ViewEnquiry.length > 0 && ViewEnquiry[0][data]}</div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ViewEnquiry;
