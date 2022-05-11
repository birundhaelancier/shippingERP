import react, { useEffect, useState } from "react";
import Labelbox from "../../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../../helpers/validationfunction";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import FooterBtn from "../../../components/FooterButtons";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerList } from "../../../Redux/Action/GeneralGroupAction/customerAction";
import {
  GetCustomerDetails,
  AddEnquiryCustomer,
  ViewEnquiryCustomerDetails,
  EditEnquiryCustomer,
} from "../../../Redux/Action/ShipmentAction/EnquiryAction";
import { getStateList } from "../../../Redux/Action/GeneralGroupAction/stateAction";
import { getCountryList } from "../../../Redux/Action/GeneralGroupAction/countryAction";
import { getCityList } from "../../../Redux/Action/GeneralGroupAction/cityAction";
import { notification } from "antd";

export default function CustomerDetails({
  enquiryId,
  handleActivekey,
  location,
}) {
  let history = useHistory();
  let dispatch = useDispatch();
  const params = new URLSearchParams(location?.search);

  const GetCustomerList = useSelector(
    (state) => state.CustomerReducer.GetCustomerList
  );
  const CustomerAllDetails = useSelector(
    (state) => state.EnquiryReducer.GetCustomerDetails
  );
  const ViewEnquiryDetails = useSelector(
    (state) => state.EnquiryReducer.ViewEnquiryCustomerDetails
  );
  const GetCountry = useSelector(
    (state) => state.CountryReducer.GetCountryList
  );
  const GetState = useSelector((state) => state.StateReducer.GetStateList);
  const GetCity = useSelector((state) => state.CityReducer.GetCityList);

  const [customerList, setCustomerList] = useState([]);
  const [FieldModal, setFieldModal] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const [CountryList, setCountryList] = useState([]);
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [profileDetails, setprofileDetails] = useState({
    cus_type: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    cus_id: {
      value: 0,
      validation: [],
      error: null,
      errmsg: null,
    },
    cus_name: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    contact: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    designation: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    phone: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    mobile: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    email: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    address: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    state: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    city: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    country: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });

  useEffect(() => {
    dispatch(getCountryList(1));
    dispatch(ViewEnquiryCustomerDetails(enquiryId));
  }, []);

  useEffect(() => {
    if (ViewEnquiryDetails.length > 0) {
      let details = ViewEnquiryDetails[0];
      console.log(ViewEnquiryDetails, "ViewEnquiryDetails");
      dispatch(getCustomerList(1));
      Object.keys(profileDetails).forEach((item) => {
        if (item != "cus_type" && item != "cus_name" && item != "cus_id") {
          if (item === "country") {
            dispatch(getStateList(details?.country));
          }
          if (item === "state") {
            dispatch(getCityList(details?.state));
          }
          profileDetails[item].value = details[item];
        }
      });

      profileDetails.cus_type.value = details?.cus_type == "2" ? 2 : 1;
      profileDetails.cus_name.value =
        details?.cus_type == "2" ? details?.cus_id : details?.cus_name;
      profileDetails.cus_id.value = details?.cus_id;

      setprofileDetails((prevState) => ({
        ...prevState,
      }));
    }
  }, [ViewEnquiryDetails]);

  useEffect(() => {
    if (GetCustomerList) {
      let customerList = [];
      GetCustomerList?.map((data) => {
        customerList.push({ id: data.id, value: data.primary_first_name });
      });
      setCustomerList(customerList);
    }

    if (CustomerAllDetails.length > 0) {
      let obj = ["designation", "phone", "mobile", "email"];
      obj.forEach((data) => {
        profileDetails[data].value = CustomerAllDetails[0][data];
      });
      setprofileDetails((prevState) => ({
        ...prevState,
      }));
    }

    let countryLists = [];
    GetCountry?.map((data) => {
      countryLists.push({ id: data.id, value: data.name });
    });
    setCountryList(countryLists);

    let stateLists = [];
    GetState?.map((data) => {
      stateLists.push({ id: data.id, value: data.name });
    });
    setStateList(stateLists);

    let cityLists = [];
    GetCity?.map((data) => {
      cityLists.push({ id: data.id, value: data.name });
    });
    setCityList(cityLists);
  }, [GetCustomerList, CustomerAllDetails, GetCountry, GetState, GetCity]);

  const Validation = (data, key, list) => {
    if (key === "cus_type" && data === 2) {
      dispatch(getCustomerList(1));
    }
    if (key === "cus_name" && data) {
      dispatch(GetCustomerDetails(data));
      customerList.forEach((item) => {
        if (item.value === data) {
          profileDetails.cus_id.value = item.id;
        }
      });
    }
    if (key === "country") {
      dispatch(getStateList(data));
    }
    if (key === "state") {
      dispatch(getCityList(data));
    }
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      profileDetails[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: profileDetails[key].validation,
    };

    setprofileDetails((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  };

  const onSubmit = () => {
    var mainvalue = {};
    var targetkeys = Object.keys(profileDetails);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        profileDetails[targetkeys[i]].value,
        profileDetails[targetkeys[i]].validation
      );
      profileDetails[targetkeys[i]].error = !errorcheck.state;
      profileDetails[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = profileDetails[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => profileDetails[obj].error == true
    );

    if (filtererr.length > 0) {
      setRefresh(!Refresh);
    } else {
      if (enquiryId) {
        profileDetails.cus_type.value === 2 &&
          customerList.forEach((item) => {
            if (item.id == profileDetails.cus_name.value) {
              profileDetails.cus_name.value = item.value;
            }
          });
        EditEnquiryCustomer(profileDetails, enquiryId).then((res) => {
          if (res?.Status === "Success") {
            notification.success({
              message: res?.Message,
            });
            handleActivekey("1", res?.Response?.id);
            // dispatch(getCustomerList("All"));
          } else {
            notification.success({
              message: "Something Went Wrong",
            });
          }
        });
      } else {
        AddEnquiryCustomer(profileDetails).then((res) => {
          if (res?.Status === "Success") {
            notification.success({
              message: res?.Message,
            });
            params.set("user_id", res?.Response?.id);
            window.history.replaceState(
              {},
              "",
              decodeURIComponent(`${window.location.href}?${params}`)
            );
            handleActivekey("1", res?.Response?.id);
            // dispatch(getCustomerList("All"));
          } else {
            notification.success({
              message: res?.Message,
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        spacing={2}
        direction="row"
        justifyContent={"center"}
        container
      >
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Customer Type"
            dropdown={[
              { id: 1, value: "New" },
              { id: 2, value: "Existing" },
            ]}
            changeData={(data) => Validation(data, "cus_type")}
            value={profileDetails.cus_type.value}
            error={profileDetails.cus_type.error}
            errmsg={profileDetails.cus_type.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type={profileDetails.cus_type.value == 1 ? "text" : "select"}
            labelname="Customer Name"
            changeData={(data) => Validation(data, "cus_name")}
            dropdown={customerList}
            showString
            value={profileDetails.cus_name.value}
            error={profileDetails.cus_name.error}
            errmsg={profileDetails.cus_name.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Contact Person"
            changeData={(data) => Validation(data, "contact")}
            value={profileDetails.contact.value}
            error={profileDetails.contact.error}
            errmsg={profileDetails.contact.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Designation"
            changeData={(data) => Validation(data, "designation")}
            value={profileDetails.designation.value}
            error={profileDetails.designation.error}
            errmsg={profileDetails.designation.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="number"
            labelname="Phone"
            placeholder="Work Phone"
            changeData={(data) => Validation(data, "phone")}
            value={profileDetails.phone.value}
            error={profileDetails.phone.error}
            errmsg={profileDetails.phone.errmsg}
            showFlag
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12} className="mobile_label">
          <Labelbox
            show
            type="number"
            labelname="Mobile"
            placeholder="Mobile"
            changeData={(data) => Validation(data, "mobile")}
            value={profileDetails.mobile.value}
            error={profileDetails.mobile.error}
            errmsg={profileDetails.mobile.errmsg}
            showFlag
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Email"
            changeData={(data) => Validation(data, "email")}
            value={profileDetails.email.value}
            error={profileDetails.email.error}
            errmsg={profileDetails.email.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="textarea"
            labelname="Address"
            changeData={(data) => Validation(data, "address")}
            value={profileDetails.address.value}
            error={profileDetails.address.error}
            errmsg={profileDetails.address.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Country"
            dropdown={CountryList}
            changeData={(data) => Validation(data, "country")}
            value={profileDetails.country.value}
            error={profileDetails.country.error}
            errmsg={profileDetails.country.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="State"
            dropdown={StateList}
            changeData={(data) => Validation(data, "state")}
            value={profileDetails.state.value}
            error={profileDetails.state.error}
            errmsg={profileDetails.state.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="City"
            dropdown={CityList}
            changeData={(data) => Validation(data, "city")}
            value={profileDetails.city.value}
            error={profileDetails.city.error}
            errmsg={profileDetails.city.errmsg}
          />
        </Grid>

        <Grid item xs={12} md={4} sx={12} sm={12}></Grid>
      </Grid>

      <Grid
        item
        xs={12}
        spacing={2}
        direction="row"
        justifyContent="center"
        container
      >
        <FooterBtn nextBtn saveBtn={"Save Stage"} onSaveBtn={onSubmit} />
      </Grid>
    </div>
  );
}
