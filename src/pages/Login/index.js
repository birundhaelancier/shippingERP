import React from "react";
import { Divider, Grid } from "@mui/material";
import LabelBoxes from "../../components/labelbox/labelbox";
import { Checkbox } from "antd";
import CustomButton from "../../components/Button";
// import HeaderView from "./Header";
import { useHistory } from "react-router-dom";
import logo from '../../Images/logologo.png';

import "./login.css";
const image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
export default function Login() {
    let history = useHistory();
    return (
        <div className="masterContainer">
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container className="subContainer">
                <Grid item xs={6} md={6} sx={6} sm={6} direction="row" alignItems={'center'} justifyContent={'flex-end'} container className='left_Container'>
                    <Grid item xs={9} md={9} sx={9} sm={9} className="lg_sec_par">
                        <div style={{ width: "20rem" }}>
                            <div className="lg_div_in">
                                <img
                                    src={logo}
                                    style={{ width: "50%" }}
                                />
                            </div>
                            <div className="inner_child">
                                <LabelBoxes type="text" labelname="User Name" />
                                <LabelBoxes type="text" labelname="Password" />
                                <CustomButton
                                    btnName="Log In"
                                    custombtnCSS="Primary"
                                    onBtnClick={() => history.push("/dashboard")}
                                />

                                <div className="for_drm">
                                    <Checkbox>Remember me</Checkbox>
                                    <label style={{ color: "#0098f5", fontWeight: "500" }}>
                                        Forgot Password?
                                    </label>
                                </div>
                            </div>
                            <div className='pos_abs'>
                                © 2018 LOGI NETICS,inc, All rights reserved. I <span style={{ textDecoration: "underline", fontSize: "11px", marginBottom: "5px" }}>Privacy Policy</span>
                            </div>
                        </div>

                    </Grid>
                </Grid>
                <Grid item xs={6} md={6} sx={6} sm={6} className='right_Container' alignItems={'center'} justifyContent={'flex-start'} container>
                    <Grid item xs={9} md={9} sx={9} sm={9} direction="row" alignItems={'center'} justifyContent={'center'} className="login2_le" container>
                        <Grid item xs={12} md={12} sx={12} sm={12} className='backImage' direction="row" alignItems={'center'} justifyContent={'center'} container  >
                            <div className="inside_box">
                                <div className="wel_child_d">
                                    Welcome to <span className="ship_tile">LOGI NETICS</span>
                                </div>
                               <p style={{ fontSize: "13px" }}>
                                    <ul>
                                        <li>
                                            Discover the ERP Built for Intergrated Logistics Solutions and Futuristic Digital Platform Built for Logistics Service Providers.<br />
                                        </li>
                                        <li>
                                            Integrated Business Solution for Seamless Movement of Goods, Covers first Mile.
                                        </li>
                                        <li>
                                            Middle and Last Mile Delivery
                                            SaaS Platform , Fully Customizable Solution  and Real-time Tracking
                                        </li>
                                    </ul>
                                </p> 
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}
