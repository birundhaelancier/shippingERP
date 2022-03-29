import * as React from "react";
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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from 'prop-types';
import DashboardShow from "./pages/Dashboard";
import Reports from "./pages/Reports";
import HeaderView from "./pages/Header";
import CustomerClient from "./pages/CustomerClient";
import SiderMenu from "./components/Sider/index";
import VendorDetails from "./pages/Vendor";
import CurrencyDetails from "./pages/Currency";
import CountryDetails from "./pages/Country";
import HSNDetails from "./pages/HSN";
import SeaportDetails from "./pages/Seaport";
import ShipmentDetails from "./pages/MasterType/shipment";
import CargoDetails from "./pages/MasterType/cargo";
import DimensionDetails from "./pages/MasterType/dimension";
import ReasonDetails from "./pages/MasterType/reason";
import ExchangeRateDetails from "./pages/ExchangeRate";
import Login from "./pages/Login";
import AddCustomer from "./pages/CustomerClient/customerAdd";
import AddVendor from "./pages/Vendor/vendorAdd";
import AddCurrency from "./pages/Currency/currencyadd";
import AddCountry from "./pages/Country/countryadd";
import AddHSN from "./pages/HSN/hsnadd";
import AddSeaport from "./pages/Seaport/seaportadd";
import AddShipment from "./pages/MasterType/addTypes/shipmentadd";
import AddCargo from "./pages/MasterType/addTypes/cargoadd";
import AddDimension from "./pages/MasterType/addTypes/dimentionadd";
import AddReason from "./pages/MasterType/addTypes/reasonadd";
import AddExchangeRate from "./pages/ExchangeRate/exchangerateadd";
import { Route } from "react-router-dom";
import AccountPopover from "./pages/layouts/dashboard/AccountPopover";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
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
    const container = window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
      // alert("hj")
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }} className="dashb_par">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
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
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              display: { sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            className="stackContent"
            direction="row"
            alignItems="end"
            style={{alignItems:"center"}}
            spacing={{ xs: 0.5, sm: 1.5 }}
          >
            <i class="fa fa-bell-o" aria-hidden="true" style={{
                  color: "#141d56",
                  fontSize:"20px",
                  paddingRight:"15px"
            }}></i>
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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            //   ...(open && { display: 'none' }),
            display: { sm: "none", xs:"block" },
          }}
        >
          <MenuIcon  className="dash_menu"/>
        </IconButton>
        {/* <Toolbar /> */}

        <Divider />
        <SiderMenu />
      </MuiDrawer>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          // '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 0,background:"#151e57" },
        }}
      >
        <DrawerHeader
          sx={{
            justifyContent: open ? "flex-end" : "center",
          }}
        >
            {open&&<HeaderView/>}
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
            {/* <MenuIcon /> */}
            <i class="fa fa-bars" style={{fontSize:"18px"}} aria-hidden="true"></i>
          </IconButton>
        </DrawerHeader>

        <SiderMenu />
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
        <Route exact path="/currency" component={CurrencyDetails} />
        <Route exact path="/country" component={CountryDetails} />
        <Route exact path="/hsn" component={HSNDetails} />
        <Route exact path="/seaport" component={SeaportDetails} />
        <Route exact path="/airport" component={SeaportDetails} />
        <Route exact path="/shipment" component={ShipmentDetails} />
        <Route exact path="/cargo" component={CargoDetails} />
        <Route exact path="/dimension" component={DimensionDetails} />
        <Route exact path="/reason" component={ReasonDetails} />
        <Route exact path="/exchangerate" component={ExchangeRateDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/addCustomer" component={AddCustomer} />
        <Route exact path="/addVendor" component={AddVendor} />
        <Route exact path="/addCurrency" component={AddCurrency} />
        <Route exact path="/addCountry" component={AddCountry} />
        <Route exact path="/addHsn" component={AddHSN} />
        <Route exact path="/addSeaport" component={AddSeaport} />
        <Route exact path="/addShipment" component={AddShipment} />
        <Route exact path="/addCargo" component={AddCargo} />
        <Route exact path="/addDimension" component={AddDimension} />
        <Route exact path="/addReason" component={AddReason} />
        <Route exact path="/addExchangerate" component={AddExchangeRate} />
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
