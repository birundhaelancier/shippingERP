import react, { useEffect, useState } from "react";
import Labelbox from "../../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../../helpers/validationfunction";
import Grid from "@mui/material/Grid";
import CustomButton from "../../../components/Button";
import { useHistory } from "react-router-dom";
import AddFieldsBtn from "../../../components/AddFieldsBtn";
import { useDispatch, useSelector } from "react-redux";
import DynModel from "../../../components/CustomModal";
import AddFields from "../../AddFields/index";
import FooterBtn from "../../../components/FooterButtons";
import { getCustomerBusinessNatureList } from "../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction";
import { CargoList } from "../../../Redux/Action/EnquiryGroupAction/CargoAction";
import { ShipmentList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentAction";
import { SchemaList } from "../../../Redux/Action/EnquiryGroupAction/SchemaActions";
import { VehicleList } from "../../../Redux/Action/TransportGroupAction/VehicleAction";
import { ShipmentTermList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentTermAction";
import { ShipmentDescriptionList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentDescriptionAction";
import { PackageList } from "../../../Redux/Action/EnquiryGroupAction/PackageAction";
import { VasList } from "../../../Redux/Action/EnquiryGroupAction/VasAction";
import LabelBoxes from "../../../components/labelbox/labelbox";
import { Add } from "@mui/icons-material";
import {
  AddShipmentCustomer,
  ViewEnquiryCustomerDetails,
  EditShipmentCustomer,
} from "../../../Redux/Action/ShipmentAction/EnquiryAction";
import { notification } from "antd";


export default function ShipmentDetails({
  enquiryId,
  handleActivekey,
  location, userId
}) {
  let history = useHistory();
  let dispatch = useDispatch();
  const [Refresh, setRefresh] = useState(false);
  const params = new URLSearchParams(location?.search);
  const units = [
    { id: 1, value: "KG" },
    { id: 2, value: "Metric ton" },
    { id: 3, value: "CBM" },
  ];
  const [profileDetails, setprofileDetails] = useState({
    enq_date: {
      value: "",
      validation: [],
      error: null,
      errmsg: null,
    },
    shipment_type: {
      value: 0,
      validation: [],
      error: null,
      errmsg: null,
    },
    shipment_type_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    business_scope: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    business_scope_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipment_descp: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipment_descp_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    origin: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    destination: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    commodity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipment_term: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipment_term_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    nature_clearance: {
      value: 0,
      validation: [],
      error: null,
      errmsg: null,
    },
    nature_clearance_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    cargo: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    cargo_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    package: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    package_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    package_no: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    no_containers: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    commodity: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    gross_wt: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    net_wt: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    volumetric_wt: {
      value: 0,
      validation: [],
      error: null,
      errmsg: null,
    },
    chargeable_wt: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    pickup_location: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    drop_location: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    vehicle: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    vehicle_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    remarks: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    enq_status: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    cut_of_date: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    vas_type: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    vas_type_id: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    reason: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    grossUnit: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    },
    netUnit: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    },
    volumetricUnit: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    },
    chargeableUnit: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    }
  });
  const [calculateDetails, setcalculateDetails] = useState({
    length: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    },
    width: {
      value: "",
      validation: [{ name: 'required' }],
      error: null,
      errmsg: null,
    },
    height: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }})
  const [openModal, setOpenModal] = useState(false);
  const ViewBusiness = useSelector(
    (state) => state.CustomerBusinessReducer.GetCustomerBusinessList
  );
  const GetCargoList = useSelector((state) => state.CargoReducer.GetCargoList);
  const GetSchemaList = useSelector(
    (state) => state.SchemaReducer.GetSchemaList
  );
  const GetShipment = useSelector(
    (state) => state.ShipmentReducer.GetShipmentList
  );
  const GetVehicle = useSelector(
    (state) => state?.VehicleReducer?.GetVehicleList
  );
  const GetShipmentTermList = useSelector(
    (state) => state.ShipmentTermReducer.GetShipmentTermList
  );
  const GetShipmentDescriptionList = useSelector(
    (state) => state.ShipmentDescriptionReducer.GetShipmentDescriptionList
  );
  const GetPackageList = useSelector(
    (state) => state.PackageReducer.GetPackageList
  );
  const GetVasList = useSelector((state) => state.VasReducer.GetVasList);
  const ViewEnquiryDetails = useSelector(
    (state) => state.EnquiryReducer.ViewEnquiryCustomerDetails
  );
  const [businessNature, setbusinessNature] = useState([]);
  const [CargoLists, setCargoLists] = useState([]);
  const [ShipementList, setShipementList] = useState([]);
  const [schemeList, setschemeList] = useState([]);
  const [vehicleList, setvehicleList] = useState([]);
  const [shipmentTerm, setshipmentTerm] = useState([]);
  const [shipmentDescription, setshipmentDescription] = useState([]);
  const [packages, setpackage] = useState([]);
  const [vas, setvas] = useState([]);

  useEffect(() => {
    dispatch(ViewEnquiryCustomerDetails(enquiryId));
  }, [])

  useEffect(() => {
    dispatch(getCustomerBusinessNatureList(1));
    dispatch(ShipmentList(1));
    dispatch(CargoList(1));
    dispatch(SchemaList());
    dispatch(VehicleList());
    dispatch(ShipmentTermList());
    dispatch(ShipmentDescriptionList());
    dispatch(VasList());
    dispatch(PackageList());
  }, [profileDetails]);

  useEffect(() => {
    let customerLists = [];
    ViewBusiness?.map((data) => {
      if (data.type === "Customer") {
        customerLists.push({ id: data.id, value: data.name });
      }
    });
    setbusinessNature(customerLists);

    let cargoLists = [];
    GetCargoList?.map((data) => {
      cargoLists.push({ id: data.id, value: data.name });
    });
    setCargoLists(cargoLists);

    let schemeList = [];
    GetSchemaList?.map((data) => {
      schemeList.push({ id: data.id, value: data.description });
    });
    setschemeList(schemeList);

    let ShipementLists = [];
    GetShipment?.map((data) => {
      ShipementLists.push({ id: data.id, value: data.name });
    });
    setShipementList(ShipementLists);

    let VehicleLists = [];
    GetVehicle?.map((data) => {
      VehicleLists.push({ id: data.id, value: data.name });
    });
    setvehicleList(VehicleLists);

    let ShipmentLists = [];
    GetShipmentTermList?.map((data) => {
      ShipmentLists.push({ id: data.id, value: data.name });
    });
    setshipmentTerm(ShipmentLists);

    let shipmentDescription = [];
    GetShipmentDescriptionList?.map((data) => {
      shipmentDescription.push({ id: data.id, value: data.name });
    });
    setshipmentDescription(shipmentDescription);

    let packageLists = [];
    GetPackageList?.map((data) => {
      packageLists.push({ id: data.id, value: data.name });
    });
    setpackage(packageLists);

    let VasLists = [];
    GetVasList?.map((data) => {
      VasLists.push({ id: data.id, value: data.name });
    });
    setvas(VasLists);
  }, [
    ViewBusiness,
    GetCargoList,
    GetShipment,
    GetSchemaList,
    GetVehicle,
    GetVasList,
    GetPackageList,
    GetShipmentDescriptionList,
    GetShipmentTermList,
  ]);

  useEffect(() => {
    if (ViewEnquiryDetails.length > 0) {
      let details = ViewEnquiryDetails[0];
      // dispatch(getCustomerList(1));
      Object.keys(profileDetails).forEach((item) => {
        if (item != "chargeableUnit" && item != "volumetricUnit" && item != "netUnit" && item != "grossUnit") {
          //   if (item === "country") {
          //     dispatch(getStateList(details?.country));
          //   }
          //   if (item === "state") {
          //     dispatch(getCityList(details?.state));
          //   }
          profileDetails[item].value = details[item];
        }
      });

      // profileDetails.cus_type.value = details?.cus_type == "2" ? 2 : 1;
      // profileDetails.cus_name.value =
      //   details?.cus_type == "2" ? details?.cus_id : details?.cus_name;
      // profileDetails.cus_id.value = details?.cus_id;

      setprofileDetails((prevState) => ({
        ...prevState,
      }));
    }
  }, [ViewEnquiryDetails]);

  const getDropdownId = (id, arrList) => {
    return arrList.find((data) => {
      if (id === data.id) {
        return data
      }
    })

  }
  const  CalculateValidate = (data, key) => {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      calculateDetails[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: calculateDetails[key].validation,
    };

    setcalculateDetails((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  };

  const Validation = (data, key, list) => {
    let test = ["shipment_type_id", "business_scope_id", "shipment_descp_id", "shipment_term_id", "nature_clearance_id", "cargo_id", "package_id", "vas_type_id", "vehicle_id"]
    if (test.includes(key)) {
      let keyName = key.replace("_id", '')
      profileDetails[keyName].value = getDropdownId(data, list).value;
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


  const Calculate = () => {
    var mainvalue = {};
    var targetkeys = Object.keys(calculateDetails);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        calculateDetails[targetkeys[i]].value,
        calculateDetails[targetkeys[i]].validation
      );
      calculateDetails[targetkeys[i]].error = !errorcheck.state;
      calculateDetails[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = calculateDetails[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => calculateDetails[obj].error == true
    );
    if (filtererr.length > 0) {
      setRefresh(!Refresh);
    } else {
      let sum=0
        let Obj=Object.values(calculateDetails).map((val)=>{
             return val.value
        })
        sum=calculateDetails.length.value*calculateDetails.width.value*calculateDetails.height.value/6000
            profileDetails.volumetric_wt.value=sum.toFixed(2)
        setOpenModal(false)
        }
    setcalculateDetails((prevState) => ({
      ...prevState,
    }));
  }


  const onSubmit = () => {

    // if( profileDetails["gross_wt"].value){
    //   profileDetails["gross_wt"].value=
    // }
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
    let keys=["gross_wt"]
    let obj={}
    Object.keys(profileDetails).forEach((item)=>{
      if(keys.includes(item)){
        let unitKey = item.replace("_wt", "Unit")
        obj[item] = profileDetails[item].value + " " + profileDetails[unitKey].value
      }else{
        obj[item] = profileDetails[item].value
      }
    })

// console.log(Object.keys(obj),"objjjj")
    if (filtererr.length > 0) {
      setRefresh(!Refresh);
    } else {
      if (enquiryId) {
        EditShipmentCustomer(profileDetails, enquiryId).then((res) => {
          if (res?.Status === "Success") {
            notification.success({
              message: res?.Message,
            });
            handleActivekey("2", res?.Response?.id);
            // dispatch(getCustomerList("All"));
          } else {
            notification.success({
              message: "Something Went Wrong",
            });
          }
        });
      } else {
        AddShipmentCustomer(profileDetails, userId).then((res) => {
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
            handleActivekey("2", res?.Response?.id);
            // dispatch(getCustomerList("All"));
          } else {
            notification.success({
              message: res?.Message,
            });
          }
        });
      }
    }
    setprofileDetails((prevState) => ({
      ...prevState,
    }));
  };

  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="datepicker"
            labelname="ENQ Date"
            showFlag
            changeData={(data) => Validation(data, "enq_date")}
            value={profileDetails.enq_date.value}
            error={profileDetails.enq_date.error}
            errmsg={profileDetails.enq_date.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Shipment Type"
            showFlag
            dropdown={ShipementList}
            changeData={(data) => Validation(data, "shipment_type_id", ShipementList)}
            value={profileDetails.shipment_type_id.value}
            error={profileDetails.shipment_type_id.error}
            errmsg={profileDetails.shipment_type_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={businessNature}
            labelname="Business Scope"
            changeData={(data) => Validation(data, "business_scope_id", businessNature)}
            value={profileDetails.business_scope_id.value}
            error={profileDetails.business_scope_id.error}
            errmsg={profileDetails.business_scope_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={shipmentDescription}
            labelname="Shipment Description"
            showFlag
            changeData={(data) => Validation(data, "shipment_descp_id", shipmentDescription)}
            value={profileDetails.shipment_descp_id.value}
            error={profileDetails.shipment_descp_id.error}
            errmsg={profileDetails.shipment_descp_id.errmsg}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Origin"
            changeData={(data) => Validation(data, "origin")}
            value={profileDetails.origin.value}
            error={profileDetails.origin.error}
            errmsg={profileDetails.origin.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Destination"
            changeData={(data) => Validation(data, "destination")}
            value={profileDetails.destination.value}
            error={profileDetails.destination.error}
            errmsg={profileDetails.destination.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox show type="text" labelname="Commodity"
            changeData={(data) => Validation(data, "commodity")}
            value={profileDetails.commodity.value}
            error={profileDetails.commodity.error}
            errmsg={profileDetails.commodity.errmsg} />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={shipmentTerm}
            labelname="Shipment Term"
            changeData={(data) => Validation(data, "shipment_term_id", shipmentTerm)}
            value={profileDetails.shipment_term_id.value}
            error={profileDetails.shipment_term_id.error}
            errmsg={profileDetails.shipment_term_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={schemeList}
            labelname="Nature of Clearance"
            showFlag
            changeData={(data) => Validation(data, "nature_clearance_id", schemeList)}
            value={profileDetails.nature_clearance_id.value}
            error={profileDetails.nature_clearance_id.error}
            errmsg={profileDetails.nature_clearance_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={CargoLists}
            labelname="Cargo Types"
            showFlag
            changeData={(data) => Validation(data, "cargo_id", CargoLists)}
            value={profileDetails.cargo_id.value}
            error={profileDetails.cargo_id.error}
            errmsg={profileDetails.cargo_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={packages}
            labelname="Package Type"
            changeData={(data) => Validation(data, "package_id", packages)}
            value={profileDetails.package_id.value}
            error={profileDetails.package_id.error}
            errmsg={profileDetails.package_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="number"
            labelname="No of Packages"
            changeData={(data) => Validation(data, "package_no")}
            value={profileDetails.package_no.value}
            error={profileDetails.package_no.error}
            errmsg={profileDetails.package_no.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="number"
            labelname="No of Containers"
            changeData={(data) => Validation(data, "no_containers")}
            value={profileDetails.no_containers.value}
            error={profileDetails.no_containers.error}
            errmsg={profileDetails.no_containers.errmsg}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={12}
          sm={12}
          container
          direction="row"
          spacing={2}
          className="waitContent"
        >
          <div className="labeltext">Gross Wt</div>
          <div>
            <Grid
              item
              xs={12}
              md={12}
              sx={12}
              sm={12}
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="text" changeData={(data) => Validation(data, "gross_wt")}
                  value={profileDetails.gross_wt.value}
                  error={profileDetails.gross_wt.error}
                  errmsg={profileDetails.gross_wt.errmsg} />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units}
                  showString
                  changeData={(data) => Validation(data, "grossUnit")}
                  value={profileDetails.grossUnit.value}
                  error={profileDetails.grossUnit.error}
                  errmsg={profileDetails.grossUnit.errmsg} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={12}
          sm={12}
          container
          direction="row"
          spacing={2}
          className="waitContent"
        >
          <div className="labeltext">Net Wt</div>
          <div>
            <Grid
              item
              xs={12}
              md={12}
              sx={12}
              sm={12}
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="text" changeData={(data) => Validation(data, "net_wt")}
                  value={profileDetails.net_wt.value}
                  error={profileDetails.net_wt.error}
                  errmsg={profileDetails.net_wt.errmsg} />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} changeData={(data) => Validation(data, "netUnit")}
                  value={profileDetails.netUnit.value}
                  error={profileDetails.netUnit.error}
                  errmsg={profileDetails.netUnit.errmsg}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={12}
          sm={12}
          container
          direction="row"
          spacing={2}
          className="waitContent"
        >
          <div className="labeltext">Volumetric Wt</div>
          <div>
            <Grid
              item
              xs={12}
              md={12}
              sx={12}
              sm={12}
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="text" changeData={(data) => Validation(data, "volumetric_wt")}
                  disabled
                  value={profileDetails.volumetric_wt.value}
                  error={profileDetails.volumetric_wt.error}
                  errmsg={profileDetails.volumetric_wt.errmsg} />
              </Grid>
              <Grid item xs={12} md={4.5} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} changeData={(data) => Validation(data, "volumetricUnit")}
                  value={profileDetails.volumetricUnit.value}
                  error={profileDetails.volumetricUnit.error}
                  errmsg={profileDetails.volumetricUnit.errmsg}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={1.5}
                sx={12}
                sm={12}
                className="add_icons"
                onClick={() => setOpenModal(true)}
              >
                <Add />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={12}
          sm={12}
          container
          direction="row"
          spacing={2}
          className="waitContent"
        >
          <div className="labeltext">Chargeable Wt</div>
          <div>
            <Grid
              item
              xs={12}
              md={12}
              sx={12}
              sm={12}
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="text" changeData={(data) => Validation(data, "chargeable_wt")}
                  value={profileDetails.chargeable_wt.value}
                  error={profileDetails.chargeable_wt.error}
                  errmsg={profileDetails.chargeable_wt.errmsg} />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} changeData={(data) => Validation(data, "chargeableUnit")}
                  value={profileDetails.chargeableUnit.value}
                  error={profileDetails.chargeableUnit.error}
                  errmsg={profileDetails.chargeableUnit.errmsg}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Pickup Location"
            changeData={(data) => Validation(data, "pickup_location")}
            value={profileDetails.pickup_location.value}
            error={profileDetails.pickup_location.error}
            errmsg={profileDetails.pickup_location.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Drop Location"
            changeData={(data) => Validation(data, "drop_location")}
            value={profileDetails.drop_location.value}
            error={profileDetails.drop_location.error}
            errmsg={profileDetails.drop_location.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={vehicleList}
            labelname="Vehicle Type" changeData={(data) => Validation(data, "vehicle_id", vehicleList)}
            value={profileDetails.vehicle_id.value}
            error={profileDetails.vehicle_id.error}
            errmsg={profileDetails.vehicle_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={vas}
            labelname="Types of VAS"
            changeData={(data) => Validation(data, "vas_type_id", vas)}
            value={profileDetails.vas_type_id.value}
            error={profileDetails.vas_type_id.error}
            errmsg={profileDetails.vas_type_id.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Remarks"
            changeData={(data) => Validation(data, "remarks")}
            value={profileDetails.remarks.value}
            error={profileDetails.remarks.error}
            errmsg={profileDetails.remarks.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={[
              { id: 1, value: "Open" },
              { id: 2, value: "Closed" },
              { id: 3, value: "Converted" },
              { id: 4, value: "Pending" },
            ]}
            labelname="Enquiry Status"
            changeData={(data) => Validation(data, "enq_status")}
            value={profileDetails.enq_status.value}
            error={profileDetails.enq_status.error}
            errmsg={profileDetails.enq_status.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="datepicker"
            labelname="Enquiry Cut of Date"
            changeData={(data) => Validation(data, "cut_of_date")}
            value={profileDetails.cut_of_date.value}
            error={profileDetails.cut_of_date.error}
            errmsg={profileDetails.cut_of_date.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="textarea"
            labelname="Reason"
            changeData={(data) => Validation(data, "reason")}
            value={profileDetails.reason.value}
            error={profileDetails.reason.error}
            errmsg={profileDetails.reason.errmsg}
          />
        </Grid>
      </Grid>
      <DynModel
        handleChangeModel={openModal}
        modelTitle={"Volumetric Weight Calculator"}
        modalchanges="recruit_modal_css"
        handleChangeCloseModel={() => setOpenModal(false)}
        width={600}
        content={
          <>
            <Grid
              item
              xs={12}
              md={12}
              sx={12}
              sm={12}
              container
              direction="row"
              spacing={2}
            >
              <Grid item xs={12} md={4} sx={12} sm={12}>
                <LabelBoxes type="text" placeholder="Length in cm" changeData={(data) => CalculateValidate(data, "length")}
                value={calculateDetails.length.value}
                error={calculateDetails.length.error}
                errmsg={calculateDetails.length.errmsg} 
                />
              </Grid>
              <Grid item xs={12} md={4} sx={12} sm={12}>
                <LabelBoxes type="text" placeholder="Width in cm" changeData={(data) => CalculateValidate(data, "width")}
                value={calculateDetails.width.value}
                error={calculateDetails.width.error}
                errmsg={calculateDetails.width.errmsg} 
                />
              </Grid>
              <Grid item xs={12} md={4} sx={12} sm={12}>
                <LabelBoxes type="text" placeholder="Height in cm" changeData={(data) => CalculateValidate(data, "height")}
                value={calculateDetails.height.value}
                error={calculateDetails.height.error}
                errmsg={calculateDetails.height.errmsg} 
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={12}
                sm={12}
                container
                direction="row"
                justifyContent="center"
              >
                <Grid item xs={12} md={4} sx={12} sm={12}>
                  <CustomButton
                    btnName="Calculate Now"
                    custombtnCSS="Primary"
                  onBtnClick={Calculate}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      />

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

