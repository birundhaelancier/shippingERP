import react, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/Button";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import DynModel from "../../components/CustomModal";
import ViewCargo from "./viewpackage";
import CustomTable from "../../components/CustomTable";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  PackageList,
  PackageStatus,
  DeletePackageList,
} from "../../Redux/Action/EnquiryGroupAction/PackageAction";
import { useDispatch, useSelector } from "react-redux";
import CustomSwitch from "../../components/SwitchBtn";
// import './customer.css';

export default function PackageDetails() {
  const [openModal, setOpenModal] = useState(false);
  let dispatch = useDispatch();
  const GetPackageList = useSelector(
    (state) => state.PackageReducer.GetPackageList
  );
  const [rowData, setRowData] = useState([]);
  const [GetId, setGetId] = useState(null);
  const columnss = [
    { field: "id", width: 130, headerName: "S.No" },
    { field: "packageId", width: 230, headerName: "Package Id" },
    { field: "packageType", width: 230, headerName: "Package Type" },
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
                  params.row.packageId,
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
              to={`/addPackage?user_id=${params.row.packageId}&&name=${params.row.packageType}`}
              className="editSymbol"
            >
              <Edit />
            </Link>
            <div
              className="deleteSymbol"
              onClick={() => deleteLead(params.row.packageId)}
            >
              <Delete />
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(PackageList("All"));
  }, []);

  let history = useHistory();
  const openFields = () => {
    setOpenModal(true);
    history.push("/addPackage");
  };

  useEffect(() => {
    let rows = [];
    GetPackageList?.map((items, index) => {
      rows.push({
        id: index + 1,
        packageId: items.id,
        packageType: items.name,
        activeStatus: items.status,
      });
    });
    setRowData(rows);
  }, [GetPackageList]);

  const viewModal = (id) => {
    setOpenModal(true);
    setGetId(id);
  };
  const deleteLead = (id) => {
    dispatch(DeletePackageList(id));
  };
  const OnChangeStatus = (id, status) => {
    dispatch(PackageStatus(id, status));
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <ContentHeader
          openFields
          mainTitle={"Package Type"}
          count="20,000"
          heading={"Package Type"}
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
          modelTitle={"Package Type"}
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
