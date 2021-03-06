import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { Menu } from '@mui/icons-material';
import DashboardShow from './pages/Dashboard';
import Reports from './pages/Reports';
import HeaderView from './pages/Header';
import CustomerClient from "./pages/CustomerClient"
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

const drawerWidth = 260;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar style={{ width: "100%", background: "#155a6e" }}
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <div className='drawerMenu'> <Menu /></div>
                    </IconButton>
                    <HeaderView />

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, paddingTop: "65px" },
                    }}
                >
                    {/* {drawer} */}
                    <SiderMenu />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {/* {drawer} */}

                    <SiderMenu />
                </Drawer>
            </Box>
            <Box
                style={{ background: "#f9f9f9", height: '100vh' }}
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
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

export default ResponsiveDrawer;
