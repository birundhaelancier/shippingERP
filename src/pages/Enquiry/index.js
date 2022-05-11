import react, { useState, useEffect } from "react";
import Labelbox from "../../helpers/labelbox/labelbox";
import ValidationLibrary from "../../helpers/validationfunction";
import Grid from "@mui/material/Grid";
import ContentHeader from "../../components/ContentHeader";
import CustomButton from "../../components/Button";
import { RemoveRedEye, Edit, Delete } from "@mui/icons-material";
import DynModel from "../../components/CustomModal";
import CustomTable from "../../components/CustomTable";
import ViewEnquiry from "./viewenquiry";
import {
  getEnquiryCustomerList,
  CustomerEnquiryStatus,
} from "../../Redux/Action/ShipmentAction/EnquiryAction";
import CustomSwitch from "../../components/SwitchBtn";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";

export default function EnquiryDetails() {
  let history = useHistory();
  let dispatch = useDispatch();
  const [showlist, setShowlist] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [GetId, setGetId] = useState(null);

  const GetEnquiryCustomerDetails = useSelector(
    (state) => state.EnquiryReducer.GetEnquiryCustomerDetails
  );

  const columnss = [
    { field: "id", width: 50, headerName: "S.No" },
    { field: "customerType", width: 130, headerName: "Customer Type" },
    { field: "customerName", width: 150, headerName: "Customer Name" },
    { field: "mobile", width: 140, headerName: "Phone No" },
    { field: "enquiryNo", width: 200, headerName: "Enquiry No" },
    { field: "enquiryDate", width: 140, headerName: "Enquiry Date" },
    {
      field: "activeStatus",
      width: 120,
      headerName: "Status",
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
                OnChangeStatus(params.row.Id, params.row.activeStatus)
              }
              checked={params.row.activeStatus}
            />
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 90,
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
            <div className="eyeSymbol" onClick={() => viewModal(params.row.Id)}>
              <RemoveRedEye />
            </div>
            <Link
              to={`/addEnquiry?user_id=${params.row.Id}`}
              className="editSymbol"
            >
              <Edit />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getEnquiryCustomerList("All"));
  }, []);

  const openFields = () => {
    setOpenModal(true);
    history.push("/addEnquiry");
  };
  useEffect(() => {
    let rows = [];
    console.log(GetEnquiryCustomerDetails, "GetEnquiryCustomerDetails");
    GetEnquiryCustomerDetails?.map((items, index) => {
      rows.push({
        id: index + 1,
        customerType: items.cus_type == 1 ? "New" : "Existing",
        customerName: items.cus_name,
        mobile: items.phone,
        enquiryNo: items.email,
        activeStatus: items.enq_status,
        enquiryDate: items.enq_date,
        Id: items.id,
      });
    });
    setRowData(rows);
  }, [GetEnquiryCustomerDetails]);

  const viewModal = (id) => {
    setOpenModal(true);
    setGetId(id);
  };
  const OnChangeStatus = (id, status) => {
    dispatch(CustomerEnquiryStatus(id, status));
  };
  return (
    <div>
      <Grid item xs={12} spacing={2} direction="row" container>
        <ContentHeader
          userTitle="This is your Dashboard"
          userName="Hello Thomas"
          openFields
          mainTitle={"Enquiry"}
          count="20,000"
          heading={"Enquiry"}
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
          modelTitle={"Enquiry"}
          modalchanges="recruit_modal_css"
          handleChangeCloseModel={() => setOpenModal(false)}
          width={800}
          content={
            <>
              <ViewEnquiry
                CloseModal={(bln) => setOpenModal(bln)}
                GetId={GetId}
              />
            </>
          }
        />
      </>
    </div>
  );
}
