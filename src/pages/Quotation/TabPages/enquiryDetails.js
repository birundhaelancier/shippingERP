import react, { useEffect, useState } from "react";
import Labelbox from "../../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../../helpers/validationfunction";
import Grid from "@mui/material/Grid";
import CustomButton from "../../../components/Button";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DynModel from "../../../components/CustomModal";
import AddFields from "../../AddFields/index";
import FooterBtn from "../../../components/FooterButtons";
import { getCustomerBusinessNatureList } from "../../../Redux/Action/GeneralGroupAction/cutomerBusinessAction";
import { CargoList } from "../../../Redux/Action/EnquiryGroupAction/CargoAction";
import { ShipmentList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentAction";
import { SchemaList } from "../../../Redux/Action/EnquiryGroupAction/SchemaActions";
import { ShipmentTermList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentTermAction";
import { ShipmentDescriptionList } from "../../../Redux/Action/EnquiryGroupAction/ShipmentDescriptionAction";

export default function QuoteDetails({ getShipmentType }) {
  let history = useHistory();
  let dispatch = useDispatch();
  const [FieldModal, setFieldModal] = useState(false);
  const [profileDetails, setprofileDetails] = useState({
    quoteId: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    enqNo: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    enqDate: {
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
    businesScope: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipmentType: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipmentDescription: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    shipmentTeam: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    clearance: {
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
    volume: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    weight: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    remark: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    chargeableWeight: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    buyRate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    sellRate: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });
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
  const GetShipmentTermList = useSelector(
    (state) => state.ShipmentTermReducer.GetShipmentTermList
  );
  const GetShipmentDescriptionList = useSelector(
    (state) => state.ShipmentDescriptionReducer.GetShipmentDescriptionList
  );

  const [businessNature, setbusinessNature] = useState([]);
  const [CargoLists, setCargoLists] = useState([]);
  const [ShipementList, setShipementList] = useState([]);
  const [schemeList, setschemeList] = useState([]);

  const [shipmentTerm, setshipmentTerm] = useState([]);
  const [shipmentDescription, setshipmentDescription] = useState([]);

  useEffect(() => {
    getShipmentType(profileDetails.shipmentType.value);
    dispatch(getCustomerBusinessNatureList(1));
    dispatch(ShipmentList(1));
    dispatch(CargoList(1));
    dispatch(SchemaList());
    dispatch(ShipmentTermList());
    dispatch(ShipmentDescriptionList());
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
      schemeList.push({ id: data.id, value: data.name });
    });
    setschemeList(schemeList);

    let ShipementLists = [];
    GetShipment?.map((data) => {
      ShipementLists.push({ id: data.id, value: data.name });
    });
    setShipementList(ShipementLists);

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
  }, [ViewBusiness, GetCargoList]);

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
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="datepicker"
            labelname="ENQ Date"
            changeData={(data) => Validation(data, "enqDate")}
            value={profileDetails.enqDate.value}
            error={profileDetails.enqDate.error}
            errmsg={profileDetails.enqDate.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Customer Name"
            changeData={(data) => Validation(data, "customerName")}
            value={profileDetails.customerName.value}
            error={profileDetails.customerName.error}
            errmsg={profileDetails.customerName.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Business Scope"
            dropdown={businessNature}
            changeData={(data) => Validation(data, "businesScope")}
            value={profileDetails.businesScope.value}
            error={profileDetails.businesScope.error}
            errmsg={profileDetails.businesScope.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Shipment Type"
            dropdown={ShipementList}
            changeData={(data) => Validation(data, "shipmentType")}
            value={profileDetails.shipmentType.value}
            error={profileDetails.shipmentType.error}
            errmsg={profileDetails.shipmentType.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Shipment Description"
            changeData={(data) => Validation(data, "shipmentDescription")}
            value={profileDetails.shipmentDescription.value}
            error={profileDetails.shipmentDescription.error}
            errmsg={profileDetails.shipmentDescription.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Shipment Term"
            changeData={(data) => Validation(data, "shipmentTeam")}
            value={profileDetails.shipmentTeam.value}
            error={profileDetails.shipmentTeam.error}
            errmsg={profileDetails.shipmentTeam.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Nature of Clearance"
            dropdown={schemeList}
            changeData={(data) => Validation(data, "clearance")}
            value={profileDetails.clearance.value}
            error={profileDetails.clearance.error}
            errmsg={profileDetails.clearance.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="select"
            labelname="Cargo"
            dropdown={CargoLists}
            changeData={(data) => Validation(data, "cargo")}
            value={profileDetails.cargo.value}
            error={profileDetails.cargo.error}
            errmsg={profileDetails.cargo.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Volume"
            changeData={(data) => Validation(data, "volume")}
            value={profileDetails.volume.value}
            error={profileDetails.volume.error}
            errmsg={profileDetails.volume.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Weight"
            changeData={(data) => Validation(data, "weight")}
            value={profileDetails.weight.value}
            error={profileDetails.weight.error}
            errmsg={profileDetails.weight.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Remarks"
            changeData={(data) => Validation(data, "remark")}
            value={profileDetails.remark.value}
            error={profileDetails.remark.error}
            errmsg={profileDetails.remark.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Chargeable Weight"
            changeData={(data) => Validation(data, "chargeableWeight")}
            value={profileDetails.chargeableWeight.value}
            error={profileDetails.chargeableWeight.error}
            errmsg={profileDetails.chargeableWeight.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Buy EX Rate"
            changeData={(data) => Validation(data, "buyRate")}
            value={profileDetails.buyRate.value}
            error={profileDetails.buyRate.error}
            errmsg={profileDetails.buyRate.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Sell EX Rate"
            changeData={(data) => Validation(data, "sellRate")}
            value={profileDetails.sellRate.value}
            error={profileDetails.sellRate.error}
            errmsg={profileDetails.sellRate.errmsg}
          />
        </Grid>
        <Grid item xs={12} md={4} sx={12} sm={12}></Grid>

        {/* 
                {showList?.map((data) => {
                    return (
                        <Grid item xs={12} md={4} sx={12} sm={12}>
                            <Labelbox type={data.type}
                                labelname={data.labelName}
                            // changeData={(data) => Validation(data, "zipCode")}
                            />
                        </Grid>
                    )
                })} */}
      </Grid>
      <DynModel
        handleChangeModel={FieldModal}
        modelTitle={"Add Fields"}
        modalchanges="recruit_modal_css"
        handleChangeCloseModel={() => setFieldModal(false)}
        width={600}
        content={
          <>
            <AddFields CloseModal={(bln) => setFieldModal(bln)} />
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
