import react, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/Button";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import DynModel from "../../components/CustomModal";
import ViewCargo from "./viewshipmentTerm";
import CustomTable from "../../components/CustomTable";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  ShipmentTermList,
  ShipmentTermStatus,
  DeleteShipmentTermList,
} from "../../Redux/Action/EnquiryGroupAction/ShipmentTermAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSwitch from "../../components/SwitchBtn";
// import './customer.css';

export default function ShipmentTermDetails() {
  const [openModal, setOpenModal] = useState(false);
  let dispatch = useDispatch();
  const GetShipmentTermList = useSelector(
    (state) => state.ShipmentTermReducer.GetShipmentTermList
  );
  const [rowData, setRowData] = useState([]);
  const [GetId, setGetId] = useState(null);
  const columnss = [
    { field: "id", width: 130, headerName: "S.No" },
    { field: "shipmentTermId", width: 230, headerName: "Shipment Term Id" },
    { field: "shipmentTermType", width: 230, headerName: "Shipment Term Type" },
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
                  params.row.shipmentTermId,
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
              to={`/addShipmentTerm?user_id=${params.row.shipmentTermId}&&name=${params.row.shipmentTermType}`}
              className="editSymbol"
            >
              <Edit />
            </Link>
            <div
              className="deleteSymbol"
              onClick={() => deleteLead(params.row.shipmentTermId)}
            >
              <Delete />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(ShipmentTermList("All"));
  }, []);

  let history = useHistory();
  const openFields = () => {
    setOpenModal(true);
    history.push("/addShipmentTerm");
  };

  useEffect(() => {
    let rows = [];
    GetShipmentTermList?.map((items, index) => {
      rows.push({
        id: index + 1,
        shipmentTermId: items.id,
        shipmentTermType: items.name,
        activeStatus: items.status,
      });
    });
    setRowData(rows);
  }, [GetShipmentTermList]);

  const viewModal = (id) => {
    setOpenModal(true);
    setGetId(id);
  };
  const deleteLead = (id) => {
    dispatch(DeleteShipmentTermList(id));
  };
  const OnChangeStatus = (id, status) => {
    dispatch(ShipmentTermStatus(id, status));
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <ContentHeader
          openFields
          mainTitle={"Shipment Term"}
          count="20,000"
          heading={"Shipment Term"}
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
          modelTitle={"Shipment Term"}
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
