import React from "react";
import { Divider, Grid } from "@mui/material";
import Labelbox from "../helpers/labelbox/labelbox";
import { Checkbox } from "antd";
import CustomButton from "../components/Button";
import HeaderView from "./Header";
import { useHistory } from "react-router-dom";
const image =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-UQvi_u2uUPPs0QmfbVKpdr7rIXZJcgw4g&usqp=CAU";
export default function Login() {
  let history = useHistory();
  return (
    <div className="log_par_div">
      {/* <Grid container className='lg_bg_pos'> */}
      {/* <Grid item xs={12} md={5} sx={12} sm={12} className="lg_sec_par">
          </Grid> */}
      <div item xs={12} md={7} sx={12} sm={12} className="login_le_pd">
        {/* <div className='wel_div'><div className='wel_child_d'>Welcome to <span className='ship_tile'>Shipping ERP</span></div>
            <p>The welcome page contains instructions and any important information you would like to convey to your customers each time they log in to use the system.</p>
            </div> */}
        {/* </Grid>
          </Grid> */}
      </div>

      <div className="log_child__par">
        <Grid container className="grid_sect">
          <Grid item xs={12} md={6} sx={12} sm={12} className="lg_sec_par">
            <div style={{ width: "60%" }} className="log_sec_par">
              <div className="lg_div_in">
                <img
                  src={image}
                  style={{ width: "60px", borderRadius: "40px" }}
                />
                <div style={{ color: "#027eba", fontWeight: "bold" }}>
                  Shipping ERP
                </div>
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
                <Divider />
                <div
                  style={{
                    color: "#0098f5",
                    fontWeight: "500",
                    textAlign: "center",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  Register Now User?
                </div>
              </div>
            </div>
            <p className='pos_ab'>© 2018 Shipping ERP,inc, All rights reserved. I <span style={{textDecoration:"underline",fontSize:"11px",marginBottom:"5px"}}>Privacy Policy</span></p>
          </Grid>
          <Grid item xs={12} md={6} sx={12} sm={12} className="login2_le_pd">
            <div className="wel_div">
              <div className="wel_child_d">
                Welcome to <span className="ship_tile">Shipping ERP</span>
              </div>
              <p style={{ fontSize: "13px" }}>
                The welcome page contains instructions and any important
                information you would like to convey to your customers each time
                they log in to use the system.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
