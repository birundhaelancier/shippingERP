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

export default function ShipmentDetails({
  enquiryId,
  handleActivekey,
  location,
}) {
  let history = useHistory();
  let dispatch = useDispatch();
  const [FieldModal, setFieldModal] = useState(false);
  const units = [
    { id: 1, value: "KG" },
    { id: 2, value: "Metric ton" },
    { id: 3, value: "CBM" },
  ];
  const [profileDetails, setprofileDetails] = useState({
    customerType: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    customerName: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    contactPerson: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    companyName: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    addressType: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    primary: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    customerEmail: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    address2: {
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
    zipCode: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    fax: {
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
    activeStatus: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });
  const [openModal, setOpenModal] = useState(false);
  const [showInput, setShowInput] = useState(false);
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

  const Validation = (data, key, list) => {
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

  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="datepicker"
            labelname="ENQ Date"
            showFlag
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Shipment Type"
            showFlag
            dropdown={ShipementList}
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={businessNature}
            labelname="Business Scope"
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={shipmentDescription}
            labelname="Shipment Description"
            showFlag
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Origin"
            changeData={(data) => Validation(data, "customerType")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Destination"
            changeData={(data) => Validation(data, "customerName")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox show type="text" labelname="Commodity" />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={shipmentTerm}
            labelname="Shipment Term"
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={schemeList}
            labelname="Nature of Clearance"
            showFlag
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={CargoLists}
            labelname="Cargo Types"
            showFlag
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={packages}
            labelname="Package Type"
            changeData={(data) => Validation(data, "customerEmail")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="number"
            labelname="No of Packages"
            changeData={(data) => Validation(data, "activeStatus")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="number"
            labelname="No of Containers"
            changeData={(data) => Validation(data, "activeStatus")}
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
                <LabelBoxes type="text" />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} />
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
                <LabelBoxes type="text" />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} />
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
                <LabelBoxes type="text" />
              </Grid>
              <Grid item xs={12} md={4.5} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} />
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
                <LabelBoxes type="text" />
              </Grid>
              <Grid item xs={12} md={6} sx={12} sm={12}>
                <LabelBoxes type="select" dropdown={units} />
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Pickup Location"
            changeData={(data) => Validation(data, "customerType")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Drop Location"
            changeData={(data) => Validation(data, "customerName")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={vehicleList}
            labelname="Vehicle Type"
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            dropdown={vas}
            labelname="Types of VAS"
            changeData={(data) => Validation(data, "customerType")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Remarks"
            changeData={(data) => Validation(data, "customerName")}
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
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="datepicker"
            labelname="Enquiry Cut of Date"
            changeData={(data) => Validation(data, "customerType")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <Labelbox
            show
            type="textarea"
            labelname="Reason"
            changeData={(data) => Validation(data, "customerName")}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={12} sm={12}>
          <AddFieldsBtn fieldName="Add More Details" />
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
                <LabelBoxes type="text" placeholder="Length in cm" />
              </Grid>
              <Grid item xs={12} md={4} sx={12} sm={12}>
                <LabelBoxes type="text" placeholder="Width in cm" />
              </Grid>
              <Grid item xs={12} md={4} sx={12} sm={12}>
                <LabelBoxes type="text" placeholder="Height in cm" />
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
                    // onBtnClick={onCancel}
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
        <FooterBtn nextBtn saveBtn={"Save Stage"} />
      </Grid>
    </div>
  );
}
