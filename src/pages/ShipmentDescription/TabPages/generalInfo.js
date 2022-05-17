import react, { useEffect, useState } from "react";
import Labelbox from "../../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../../helpers/validationfunction";
import Grid from "@mui/material/Grid";
import CustomButton from "../../../components/Button";
import { useHistory, useParams } from "react-router-dom";
import AddFieldsBtn from "../../../components/AddFieldsBtn";
import LabelBoxes from "../../../components/labelbox/labelbox";
import DynModel from "../../../components/CustomModal";
import AddFields from "../../AddFields/index";
import FooterBtn from "../../../components/FooterButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  AddShipmentDescription,
  EditShipmentDescription,
  ShipmentDescriptionList,
} from "../../../Redux/Action/EnquiryGroupAction/ShipmentDescriptionAction";

export default function GeneralInfo({ shipDescriptionId, shipDesmName }) {
  let history = useHistory();
  let dispatch = useDispatch();
  const [FieldModal, setFieldModal] = useState(false);

  const [CargoInfo, setCargoInfo] = useState({
    CargoName: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
  });

  useEffect(() => {
    if (shipDescriptionId) {
      CargoInfo.CargoName.value = shipDesmName;
      setCargoInfo((prevState) => ({
        ...prevState,
      }));
    }
  }, [shipDescriptionId, shipDesmName]);

  const Validation = (data, key, list) => {
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      CargoInfo[key].validation
    );
    let dynObj = {
      value: data,
      error: !errorcheck.state,
      errmsg: errorcheck.msg,
      validation: CargoInfo[key].validation,
    };

    setCargoInfo((prevState) => ({
      ...prevState,
      [key]: dynObj,
    }));
  };
  const onSubmit = () => {
    var mainvalue = {};
    var targetkeys = Object.keys(CargoInfo);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        CargoInfo[targetkeys[i]].value,
        CargoInfo[targetkeys[i]].validation
      );
      CargoInfo[targetkeys[i]].error = !errorcheck.state;
      CargoInfo[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = CargoInfo[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => CargoInfo[obj].error == true);

    if (filtererr.length > 0) {
    } else {
      if (shipDescriptionId) {
        dispatch(EditShipmentDescription(CargoInfo, shipDescriptionId)).then(
          () => {
            history.push("/shipmentDescription");
            //   HandleCancel();
          }
        );
      } else {
        dispatch(AddShipmentDescription(CargoInfo)).then(() => {
          history.push("/shipmentDescription");
          //   HandleCancel();
        });
      }
    }
  };
  const HandleCancel = () => {
    let SalesKey = Object.keys(CargoInfo);
    SalesKey.map((data) => {
      CargoInfo[data].value = "";
    });
    setCargoInfo((prevState) => ({
      ...prevState,
    }));
    history.push("/shipmentDescription");
  };

  const [showList, setShowList] = useState([
    {
      type: "text",
      labelName: "Designation",
      validation: ["required"],
      arrVal: [],
    },
    {
      type: "text",
      labelName: "Department",
      validation: ["required"],
      arrVal: [],
    },
    {
      type: "text",
      labelName: "Skype Id",
      validation: ["required"],
      arrVal: [],
    },
  ]);

  const addInputBox = (obj) => {
    if (Object.values(obj).every((data) => data != "")) {
      showList.push(obj);
      setShowList((prevState) => [...prevState]);
    }
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <Grid item xs={12} md={4} sx={12} sm={12}>
          <Labelbox
            show
            type="text"
            labelname="Shipment Description"
            changeData={(data) => Validation(data, "CargoName")}
            value={CargoInfo.CargoName.value}
            error={CargoInfo.CargoName.error}
            errmsg={CargoInfo.CargoName.errmsg}
          />
        </Grid>
      </Grid>
      <DynModel
        handleChangeModel={FieldModal}
        modelTitle={"Add Fields"}
        modalchanges="recruit_modal_css"
        handleChangeCloseModel={() => setFieldModal(false)}
        width={600}
        content={
          <>
            <AddFields
              CloseModal={(bln) => setFieldModal(bln)}
              addObj={(data) => addInputBox(data)}
            />
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
        <FooterBtn
          saveBtn={"Submit"}
          onSaveBtn={onSubmit}
          onSubmit={HandleCancel}
        />
      </Grid>
    </div>
  );
}
