import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Stack } from "@mui/material";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "./Images/layout.png";
import PropTypes from "prop-types";
import DashboardShow from "./pages/Dashboard";
import Reports from "./pages/Reports";
import HeaderView from "./pages/Header";
import CustomerClient from "./pages/CustomerClient";
import SiderMenu from "./components/Sider/index";
import VendorDetails from "./pages/Vendor";
import StateDetails from "./pages/State";
import CountryDetails from "./pages/Country";
import HSNDetails from "./pages/HSN";
import SeaportDetails from "./pages/Seaport";
import AirportDetails from "./pages/Airport";
import ExchangeRateDetails from "./pages/ExchangeRate";
import Login from "./pages/Login";
import AddCustomer from "./pages/CustomerClient/customerAdd";
import AddVendor from "./pages/Vendor/vendorAdd";
import AddState from "./pages/State/stateadd";
import AddCountry from "./pages/Country/countryadd";
import AddHSN from "./pages/HSN/hsnadd";
import AddSeaport from "./pages/Seaport/seaportadd";
import AddAirport from "./pages/Airport/airportadd";
import AddExchangeRate from "./pages/ExchangeRate/exchangerateadd";
import CityDetails from "./pages/City/index";
import AddCity from "./pages/City/cityadd";
import CurrencyDetails from "./pages/Currency";
import AddCurrency from "./pages/Currency/currencyadd";
import ShipmentDetails from "./pages/Shipment";
import AddShipment from "./pages/Shipment/shipmentadd";
import CargoDetails from "./pages/Cargo";
import AddCargo from "./pages/Cargo/cargoadd";
import DimensionDetails from "./pages/Dimension";
import ReasonDetails from "./pages/Reason";
import AddDimension from "./pages/Dimension/dimensionadd";
import AddReason from "./pages/Reason/reasonadd";
import EnquiryDetails from './pages/Enquiry'
import AddEnquiry from './pages/Enquiry/enquiryadd';
import JobsDetails from './pages/Jobs'
import AddJobs from './pages/Jobs/jobadd';
import LicenseDetails from './pages/License'
import AddLicense from './pages/License/licenseadd';
import SchemeDetails from './pages/Scheme'
import AddScheme from './pages/Scheme/schemeadd';
import CostDetails from './pages/Cost'
import AddCost from './pages/Cost/costadd';
import QuoteDetails from './pages/Quote'
import AddQuote from './pages/Quote/quoteadd';
import VehicleDetails from './pages/Vehicle'
import AddVehicle from './pages/Vehicle/vehicleadd';
import SalesDetails from './pages/Sales'
import AddSales from './pages/Sales/salesadd';
import LeadDetails from './pages/Lead'
import AddLead from './pages/Lead/leadadd';
import ShipperDetails from './pages/Shipper'
import AddShipper from './pages/Shipper/shipperadd';
import ConsigneeDetails from './pages/Consignee'
import AddConsignee from './pages/Consignee/consigneeadd';
import BusinessDetails from './pages/BusinessScope'
import AddBusiness from './pages/BusinessScope/businessadd';
import CustomerBusinessDetails from './pages/CustomerBusiness';
import AddCustomerBusiness from './pages/CustomerBusiness/customerBusinessadd';
import VendorBusinessDetails from './pages/VendorBusiness';
import AddVendorBusiness from './pages/VendorBusiness/vendorBusinessadd';
import { Route } from "react-router-dom";
import AccountPopover from "./pages/layouts/dashboard/AccountPopover";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Margin } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  // overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    width: `calc(100%-${theme.spacing(7)} + 1px)`,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ResponsiveDrawer(props) {

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }} className="dashb_par">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        className="custom_appar"
        style={{zIndex: 120}}
        sx={{
          width: {
            sm: `calc(100% - ${open ? drawerWidth : 67}px)`,
            xs: "100%",
          },
          // ml: { sm: `${drawerWidth}px` },
          background: "#fff",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="end"
            style={{ color: "#141d56" }}
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: { sm: "red", xs: "blue" },
              display: { sm: "none", xs: "block" },
            }}
          >
            <MenuIcon className="ic_menu" />
          </IconButton>

          <Stack
            className="stackContent"
            direction="row"
            alignItems="end"
            style={{ alignItems: "center" }}
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <i
              class="fa fa-bell-o"
              aria-hidden="true"
              style={{
                color: "#141d56",
                fontSize: "20px",
                paddingRight: "15px",
              }}
            ></i>
            {/* <NotificationsOutlinedIcon  style={{color:"red"}}  className="notify"/> */}
            <div>
              <AccountPopover />
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        container={container}
        variant="temporary"
        open={open}
        className="dashb_par"
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            paddingTop: "15px",
            zIndex: 0,
            background: "#151e57",
            boxShadow: "none",
          },
        }}
      >
        {/* {drawer} */}
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            //   ...(open && { display: 'none' }),
            display: { sm: "none", xs:"none" },
          }}
        >
          <MenuIcon  className="dash_menu"/>
        </IconButton> */}
        {/* <Toolbar /> */}

        {/* <Divider /> */}
        <div
          className="header_menu"
          style={{
            marginBottom: open ? "20px" : "0px",
            // justifyContent: open ? "space-between" : "center",
          }}
        >
          {open && (
            // <HeaderView/>
            <div>
              <img src={logo} style={{ width: "63%" }} />
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-end" : "center",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
              {/* <MenuIcon /> */}
              <i
                class="fa fa-bars"
                style={{ fontSize: "18px", color: "#fff" }}
                aria-hidden="true"
              ></i>
            </IconButton>
          </div>
        </div>
        <SiderMenu openMenu={open} />
      </MuiDrawer>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          // '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0,background:"#151e57" },
        }}
      >
        <div
          className="header_menu"
          style={{
            marginBottom: open ? "25px" : "0px",
          }}
        >
          {open && (
            // <HeaderView/>
            <div>
              <img src={logo} style={{ width: "63%" }} />
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: open ? "flex-end" : "center",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
              {/* <MenuIcon /> */}
              <i
                class="fa fa-bars"
                style={{ fontSize: "18px", color: "#fff" }}
                aria-hidden="true"
              ></i>
            </IconButton>
          </div>
        </div>

        <SiderMenu open={open} />
      </Drawer>
      <Box
        style={{ background: "#fbfbfb" }}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Route exact path="/dashboard" component={DashboardShow} />
        <Route exact path="/report" component={Reports} />
        <Route exact path="/customer" component={CustomerClient} />
        <Route exact path="/vendor" component={VendorDetails} />
        <Route exact path="/state" component={StateDetails} />
        <Route exact path="/hsn" component={HSNDetails} />
        <Route exact path="/seaport" component={SeaportDetails} />
        <Route exact path="/airport" component={AirportDetails} />
        <Route exact path="/shipment" component={ShipmentDetails} />
        <Route exact path="/cargo" component={CargoDetails} />
        <Route exact path="/dimension" component={DimensionDetails} />
        <Route exact path="/reason" component={ReasonDetails} />
        <Route exact path="/exchangerate" component={ExchangeRateDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/addCustomer" component={AddCustomer} />
        <Route exact path="/addVendor" component={AddVendor} />
        <Route exact path="/addState" component={AddState} />
        <Route exact path="/addHsn/:id?" component={AddHSN} />
        <Route exact path="/addSeaport/:id?" component={AddSeaport} />
        <Route exact path="/addAirport/:id?" component={AddAirport} />
        <Route exact path="/addShipment" component={AddShipment} />
        <Route exact path="/addCargo/:id?/:name?" component={AddCargo} />
        <Route exact path="/addDimension" component={AddDimension} />
        <Route exact path="/addReason" component={AddReason} />
        <Route exact path="/addExchangerate" component={AddExchangeRate} />
        <Route exact path="/city" component={CityDetails} />
        <Route exact path="/addCity" component={AddCity} />
        <Route exact path="/country" component={CountryDetails} />
        <Route exact path="/addCountry" component={AddCountry} />
        <Route exact path="/currency" component={CurrencyDetails} />
        <Route exact path="/addCurrency" component={AddCurrency} />
        <Route exact path="/enquiry" component={EnquiryDetails} />
        <Route exact path="/addEnquiry" component={AddEnquiry} />
        <Route exact path="/license" component={LicenseDetails} />
        <Route exact path="/addLicense" component={AddLicense} />
        <Route exact path="/jobs" component={JobsDetails} />
        <Route exact path="/addJobs" component={AddJobs} />
        <Route exact path="/scheme" component={SchemeDetails} />
        <Route exact path="/addScheme" component={AddScheme} />
        <Route exact path="/cost" component={CostDetails} />
        <Route exact path="/addCost" component={AddCost} />
        <Route exact path="/quote" component={QuoteDetails} />
        <Route exact path="/addQuote" component={AddQuote} />
        <Route exact path="/Vehicle" component={VehicleDetails} />
        <Route exact path="/addVehicle" component={AddVehicle} />
        <Route exact path="/lead" component={LeadDetails} />
        <Route exact path="/addLead" component={AddLead} />
        <Route exact path="/sales" component={SalesDetails} />
        <Route exact path="/addSales" component={AddSales} />
        <Route exact path="/shipper" component={ShipperDetails} />
        <Route exact path="/addShipper" component={AddShipper} />      
        <Route exact path="/consignee" component={ConsigneeDetails} />
        <Route exact path="/addConsignee" component={AddConsignee} />
        <Route exact path="/business" component={BusinessDetails} />
        <Route exact path="/addBusiness" component={AddBusiness} />
        <Route exact path="/customerBusiness" component={CustomerBusinessDetails} />
        <Route exact path="/addCustomerBusiness" component={AddCustomerBusiness} />
        <Route exact path="/vendorBusiness" component={VendorBusinessDetails} />
        <Route exact path="/addVendorBusiness" component={AddVendorBusiness} />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
