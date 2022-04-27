
import React from "react";

export const menu = [

    { title: "Dashboard", items: [], path: "/dashboard", icon: <i class="fa fa-tachometer" aria-hidden="true"></i> },
    {
        title: "Master",
        items: [
            {
                title: "General", icon: "", items: [
                    { title: "Customer", path: "/customer", icon: "" },
                    { title: "Vendor", path: "/vendor", icon: "" },
                    { title: "Shipper", path: "/shipper", icon: "" },
                    { title: "Consignee", path: "/consignee", icon: "" },
                    { title: "Country", path: "/country", icon: "" },
                    { title: "State", path: "/state", icon: "" },
                    { title: "City", path: "/city", icon: "" },
                    { title: "Business Nature", path: "/customerBusiness", icon: "" },
                ]
            },
            {
                title: "Enquiry", icon: "", items: [
                    { title: "Business Scope", path: "/business", icon: "" },
                    { title: "Sea Ports", path: "/seaport", icon: "" },
                    { title: "Air Ports", path: "/airport", icon: "" },
                    { title: "HSN Code", path: "/hsn", icon: "" },
                    { title: "Licence", path: "/license", icon: "" },
                    { title: "Scheme", path: "/scheme", icon: "" },
                    { title: "Shipment", path: "/shipment", icon: "" },
                    { title: "Cargo", path: "/cargo", icon: "" },
                    { title: "Dimension", path: "/dimension", icon: "" },
                    { title: "Reason", path: "/reason", icon: "" },
                ]
            },
            {
                title: "Quote", icon: "", items: [
                    { title: "Quote", path: "/quote", icon: "" },
                    { title: "Currency", path: "/currency", icon: "" },
                    { title: "Exchange Rate", path: "/exchangerate", icon: "" },
                    { title: "Cost", path: "/cost", icon: "" },
                ]
            },
            {
                title: "Transport", icon: "", items: [
                    { title: "Vehicle", path: "/vehicle", icon: "" },
                ]
            },
            {
                title: "Sales", icon: "", items: [
                    { title: "Sales", path: "/sales", icon: "" },
                    { title: "Lead", path: "/lead", icon: "" },
                ]
            },
        ],
        icon: <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
    },
    // {
    //     title: "Master Settings", items: [
    //         { title: "Business Nature", path: "/customerBusiness", icon: "" },
    //     ], path: "",
    //     icon: <i class="fa fa-ship" aria-hidden="true"></i>
    // },
    {
        title: "Shipments", items: [
            { title: "Enquiry", path: "/enquiry", icon: "" },
            { title: "Job", path: "/jobs", icon: "" },
            { title: "Quotation", path: "/dashboard", icon: "" },
        ], path: "/home",
        icon: <i class="fa fa-ship" aria-hidden="true"></i>
    },

    { title: "Sales ", items: [], path: "", icon: <i class="fa fa-users" aria-hidden="true"></i> },
    { title: "Reports", items: [], path: "/report", icon: <i class="fa fa-check" aria-hidden="true"></i> },
    { title: "Accounts", items: [], path: "/test", icon: <i class="fa fa-user" aria-hidden="true"></i> },
    { title: "Documents ", items: [], path: "", icon: <i class="fa fa-file-o" aria-hidden="true"></i> },
    { title: "Settings ", items: [], path: "", icon: <i class="fa fa-cog" aria-hidden="true"></i> },
    { title: "Help Center ", items: [], path: "", icon: <i class="fa fa-yelp" aria-hidden="true"></i> },

]
