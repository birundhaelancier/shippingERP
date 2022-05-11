import react, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/Button";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import DynModel from "../../components/CustomModal";
import ViewCargo from "./viewvas";
import CustomTable from "../../components/CustomTable";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  VasList,
  VasStatus,
  DeleteVasList,
} from "../../Redux/Action/EnquiryGroupAction/VasAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSwitch from "../../components/SwitchBtn";
// import './customer.css';

export default function VasDetails() {
  const [openModal, setOpenModal] = useState(false);
  let dispatch = useDispatch();
  const GetVasList = useSelector((state) => state.VasReducer.GetVasList);
  const [rowData, setRowData] = useState([]);
  const [GetId, setGetId] = useState(null);
  const columnss = [
    { field: "id", width: 130, headerName: "S.No" },
    { field: "vasId", width: 230, headerName: "Vas Id" },
    { field: "vasType", width: 230, headerName: "Vas Type" },
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
                  params.row.vasId,
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
              to={`/addVas?user_id=${params.row.vasId}&&name=${params.row.vasType}`}
              className="editSymbol"
            >
              <Edit />
            </Link>
            <div
              className="deleteSymbol"
              onClick={() => deleteLead(params.row.vasId)}
            >
              <Delete />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(VasList("All"));
  }, []);

  let history = useHistory();
  const openFields = () => {
    setOpenModal(true);
    history.push("/addVas");
  };

  useEffect(() => {
    let rows = [];
    GetVasList?.map((items, index) => {
      rows.push({
        id: index + 1,
        vasId: items.id,
        vasType: items.name,
        activeStatus: items.status,
      });
    });
    setRowData(rows);
  }, [GetVasList]);

  const viewModal = (id) => {
    setOpenModal(true);
    setGetId(id);
  };
  const deleteLead = (id) => {
    dispatch(DeleteVasList(id));
  };
  const OnChangeStatus = (id, status) => {
    dispatch(VasStatus(id, status));
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <ContentHeader
          openFields
          mainTitle={"Vas Type"}
          count="20,000"
          heading={"Vas Type"}
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
          modelTitle={"Vas Type"}
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
