
import React from "react";
import { Menu, Send, Dashboard, Attractions, AccountBox, BackupTable, Api, ArrowForward, ReportGmailerrorred, Description, AccountBalance, AutoFixHigh, Sell, LocalLaundryService } from '@mui/icons-material';

export const menu = [
    { title: "Dashboard", items: [], path: "/dashboard", icon: <Dashboard /> },
    {
        title: "Master",
        items: [
            { title: "Customer", path: "/customer", icon: <ArrowForward /> },
            { title: "Vendor", path: "/vendor", icon: <ArrowForward /> },
            { title: "Currency", path: "/currency", icon: <ArrowForward /> },
            { title: "Country Code", path: "/country", icon: <ArrowForward /> },
            { title: "HSN Code", path: "/hsn", icon: <ArrowForward /> },
            { title: "Sea Ports", path: "/seaport", icon: <ArrowForward /> },
            { title: "Air Ports", path:`/airport?type=${"AP"}`, icon: <ArrowForward /> },
            { title: "Quote", path: "/home", icon: <ArrowForward /> },
            { title: "Location", path: "/home", icon: <ArrowForward /> },
            // { title: "CHA", path: "/home", icon: <ArrowForward /> },
            // { title: "Freight Forwarders", path: "/home", icon: <ArrowForward /> },
            // { title: "Transport", path: "/home", icon: <ArrowForward /> },
            // { title: "Liner / Consol Agents", path: "/home", icon: <ArrowForward /> },
            { title: "Licence", path: "/home", icon: <ArrowForward /> },
            { title: "Scheme", path: "/home", icon: <ArrowForward /> },
            { title: "Shipment Type", path: "/shipment", icon: <ArrowForward /> },
            { title: "Cargo Type", path: "/cargo", icon: <ArrowForward /> },
            { title: "Dimension Type", path: "/dimension", icon: <ArrowForward /> },
            { title: "Reason Master", path: "/reason", icon: <ArrowForward /> },
            { title: "Exchange Rate", path: "/exchangerate", icon: <ArrowForward /> },

        ],
        icon: <Attractions />
    },
    {
        title: "Shipments", items: [
            { title: "Enquiry", path: "/test", icon: <ArrowForward /> },
            { title: "Job", path: "/test", icon: <ArrowForward /> },
            { title: "Reports", path: "/test", icon: <ArrowForward /> },
        ], path: "/home",
        icon: <Api />
    },
    { title: "Reports", items: [], path: "/report", icon: <ReportGmailerrorred /> },
    { title: "Documents ", items: [], path: "/home", icon: <Description /> },
    { title: "Accounts", items: [], path: "/test", icon: <AccountBalance /> },
    { title: "Utility", items: [], path: "/test", icon: <AutoFixHigh /> },
    { title: "Sales ", items: [], path: "/home", icon: <Sell /> },
    { title: "Other Services", items: [], path: "/test", icon: <LocalLaundryService /> },
]