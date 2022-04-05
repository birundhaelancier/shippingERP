
import React from "react";
import { Menu, Send, Dashboard, Attractions, AccountBox, BackupTable, Api, ArrowForward, ReportGmailerrorred, Description, AccountBalance, AutoFixHigh, Sell, LocalLaundryService } from '@mui/icons-material';

export const menu = [

    { title: "Dashboard", items: [], path: "/dashboard", icon: <i class="fa fa-tachometer" aria-hidden="true"></i> },
    {
        title: "Master",
        items: [
            { title: "Customer", path: "/customer", icon: "" },
            { title: "Vendor", path: "/vendor", icon: "" },
            { title: "Country", path: "/country", icon: "" },
            { title: "State", path: "/state", icon: "" },
            { title: "City", path: "/city", icon: "" },
            { title: "Sea Ports", path: "/seaport", icon: "" },
            { title: "Air Ports", path: "/airport", icon: "" },
            { title: "HSN Code", path: "/hsn", icon: "" },
            // { title: "Quote", path: "", icon: "" },
            // { title: "Location", path: "", icon: "" },
            // { title: "Licence", path: "/home", icon: "" },
            { title: "Currency", path: "/currency", icon: "" },
            // { title: "Scheme", path: "", icon: "" },
            { title: "Exchange Rate", path: "/exchangerate", icon: "" },
            { title: "Shipment", path: "/shipment", icon: "" },
            { title: "Cargo", path: "/cargo", icon: "" },
            { title: "Dimension", path: "/dimension", icon: "" },
            { title: "Reason", path: "/reason", icon: "" },
        ],
        icon: <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
    },
    {
        title: "Shipments", items: [
            { title: "Enquiry", path: "/enquiry", icon: "" },
            { title: "Job", path: "", icon: "" },
            { title: "Quotation", path: "", icon: "" },
        ], path: "/home",
        icon: <i class="fa fa-ship" aria-hidden="true"></i>
    },
    // { title: "Utility", items: [], path: "/test", icon: <AutoFixHigh /> },
    { title: "Sales ", items: [], path: "", icon: <i class="fa fa-users" aria-hidden="true"></i> },
    // { title: "Other Services", items: [], path: "/test", icon: <LocalLaundryService /> },
    { title: "Reports", items: [], path: "/report", icon: <i class="fa fa-check" aria-hidden="true"></i> },
    { title: "Accounts", items: [], path: "/test", icon: <i class="fa fa-user" aria-hidden="true"></i> },
    { title: "Documents ", items: [], path: "", icon: <i class="fa fa-file-o" aria-hidden="true"></i> },
    { title: "Settings ", items: [], path: "", icon: <i class="fa fa-cog" aria-hidden="true"></i> },
    { title: "Help Center ", items: [], path: "", icon: <i class="fa fa-yelp" aria-hidden="true"></i> },

]