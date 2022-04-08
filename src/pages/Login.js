import React from "react";
import { Divider, Grid } from "@mui/material";
import Labelbox from "../helpers/labelbox/labelbox";
import { Checkbox } from "antd";
import CustomButton from "../components/Button";
import HeaderView from "./Header";
import { useHistory } from "react-router-dom";
import logo from '../Images/logologo.png';
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
export default function Login() {
  let history = useHistory();
  return (
    <div className="log_par_div">
      <div item xs={12} md={7} sx={12} sm={12} className="login_le_pd">
      </div>

      <div className="log_child__par">
        <Grid container className="grid_sect">
          <Grid item xs={12} md={6} sx={12} sm={12} className="lg_sec_par">
            <div style={{ width: "60%" }} className="log_sec_par">
              <div className="lg_div_in">
                <img
                  src={logo}
                  style={{ width: "50%" }}
                />
                {/* <div style={{ color: "#027eba", fontWeight: "bold" }}>
                  Shipping ERP
                </div> */}
              </div>

              <div className="inner_child">
                <label>User Name</label>
                <Labelbox type="text" />
                <label>Password</label>
                <Labelbox type="text" />
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
                {/* <Divider /> */}
                {/* <div
                  style={{
                    color: "#0098f5",
                    fontWeight: "500",
                    textAlign: "center",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  Register New User?
                </div> */}
              </div>
            </div>
            <p className='pos_ab'>© 2018 LOGI NETICS,inc, All rights reserved. I <span style={{ textDecoration: "underline", fontSize: "11px", marginBottom: "5px" }}>Privacy Policy</span></p>
          </Grid>
          <Grid item xs={12} md={6} sx={12} sm={12} className="login2_le_pd">
            <div className="wel_div">
              <div className="wel_child_d">
                Welcome to <span className="ship_tile">LOGI NETICS</span>
              </div>
              <p style={{ fontSize: "13px" }}>
                <ul>
                  <li>
                    Discover the ERP Built for Intergrated Logistics Solutions and Futuristic Digital Platform Built for Logistics Service Providers.<br />
                  </li>
                  <li>
                    Integrated Business Solution for Seamless Movement of Goods, Covers first Mile Middle and Last Mile.
                  </li>
                  <li>
                    Delivery SaaS Platform , Fully Customizable Solution  and Real-time Tracking
                  </li>
                </ul>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
