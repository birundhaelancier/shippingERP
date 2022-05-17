import react, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/Button";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import DynModel from "../../components/CustomModal";
import ViewCargo from "./viewshipmentDescription";
import CustomTable from "../../components/CustomTable";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  ShipmentDescriptionList,
  ShipmentDescriptionStatus,
  DeleteShipmentDescriptionList,
} from "../../Redux/Action/EnquiryGroupAction/ShipmentDescriptionAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSwitch from "../../components/SwitchBtn";
// import './customer.css';

export default function ShipmentDescriptionDetails() {
  const [openModal, setOpenModal] = useState(false);
  let dispatch = useDispatch();
  const GetShipmentDescriptionList = useSelector(
    (state) => state?.ShipmentDescriptionReducer?.GetShipmentDescriptionList
  );
  const [rowData, setRowData] = useState([]);
  const [GetId, setGetId] = useState(null);
  const columnss = [
    { field: "id", width: 130, headerName: "S.No" },
    {
      field: "shipmentDescriptionId",
      width: 230,
      headerName: "Shipment Description Id",
    },
    {
      field: "shipmentDescriptionType",
      width: 230,
      headerName: "Shipment Description Type",
    },
    {
      field: "activeStatus",
      width: 230,
      headerName: "Active Status",
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CustomSwitch
              size="small"
              onSwitchChange={() =>
                OnChangeStatus(
                  params.row.shipmentDescriptionId,
                  params.row.activeStatus === 1 ? 0 : 1
                )
              }
              checked={params.row.activeStatus === 1 ? true : false}
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 230,
      align: "center",
      headerAlign: "center",
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link
              to={`/addShipmentDescription?user_id=${params.row.shipmentDescriptionId}&&name=${params.row.shipmentDescriptionType}`}
              className="editSymbol"
            >
              <Edit />
            </Link>
            <div
              className="deleteSymbol"
              onClick={() => deleteLead(params.row.shipmentDescriptionId)}
            >
              <Delete />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(ShipmentDescriptionList("All"));
  }, []);

  let history = useHistory();
  const openFields = () => {
    setOpenModal(true);
    history.push("/addShipmentDescription");
  };

  useEffect(() => {
    let rows = [];
    GetShipmentDescriptionList?.map((items, index) => {
      rows.push({
        id: index + 1,
        shipmentDescriptionId: items.id,
        shipmentDescriptionType: items.name,
        activeStatus: items.status,
      });
    });
    setRowData(rows);
  }, [GetShipmentDescriptionList]);

  const viewModal = (id) => {
    setOpenModal(true);
    setGetId(id);
  };
  const deleteLead = (id) => {
    dispatch(DeleteShipmentDescriptionList(id));
  };
  const OnChangeStatus = (id, status) => {
    dispatch(ShipmentDescriptionStatus(id, status));
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <ContentHeader
          openFields
          mainTitle={"Shipment Description"}
          count="20,000"
          heading={"Shipment Description"}
        />
      </Grid>
      <>
        <CustomTable
          rowData={rowData}
          columnData={columnss}
          rowsPerPageOptions={[5, 25, 50, 100]}
          onclickEye={(data) => setOpenModal(data)}
          onAddBtnClick={openFields}
        />
        <DynModel
          handleChangeModel={openModal}
          modelTitle={"Shipment Description"}
          modalchanges="recruit_modal_css"
          handleChangeCloseModel={() => setOpenModal(false)}
          width={800}
          content={
            <>
              <ViewCargo CloseModal={(bln) => setOpenModal(bln)} />
            </>
          }
        />
      </>
    </div>
  );
}
