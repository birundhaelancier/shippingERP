import React, { useState } from "react";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Checkbox, notification } from "antd";
import axios from 'axios';
import LabelBoxes from "../../components/labelbox/labelbox";
import ValidationLibrary from '../../helpers/validationfunction';
import CustomButton from "../../components/Button";
import logo from '../../Images/logologo.png';
import { apiurl } from '../../Redux/Utils/baseurl';

import "./login.scss";


export default function Login() {
    let history = useHistory();
    const [Refresh, setRefresh] = useState(false)

    const [useLogin, setUserLogin] = useState({
        email: {
            value: "", validation: [{ name: "required" }], error: false, errmsg: false,
        },
        password: {
            value: "", validation: [{ name: "required" }], error: false, errmsg: false,
        },
    })

    const Validation = (data, key, list) => {
        var errorcheck = ValidationLibrary.checkValidation(
            data,
            useLogin[key].validation
        );
        let dynObj = {
            value: data,
            error: !errorcheck.state,
            errmsg: errorcheck.msg,
            validation: useLogin[key].validation,
        };
        setUserLogin(prevState => ({
            ...prevState,
            [key]: dynObj,

        }));
    }

    const onsubmit = () => {
        var mainvalue = {};
        var targetkeys = Object.keys(useLogin);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                useLogin[targetkeys[i]].value,
                useLogin[targetkeys[i]].validation
            );
            useLogin[targetkeys[i]].error = !errorcheck.state;
            useLogin[targetkeys[i]].errmsg = errorcheck.msg;
            mainvalue[targetkeys[i]] = useLogin[targetkeys[i]].value;
        }
        var filtererr = targetkeys.filter((obj) => useLogin[obj].error == true);

        if (filtererr.length > 0) {
            setRefresh(!Refresh)
        } else {
            axios({
                method: 'POST',
                url: apiurl + 'login',
                data: {
                    "email": useLogin.email.value,
                    "password": useLogin.password.value
                }
            })
                .then((response) => {
                    if (response.data.Status === 'Success') {
                        notification.success({
                            message: response.data.Message
                        });
                        axios({
                            method: 'POST',
                            url: apiurl + 'get_user',
                            headers: {
                                Authorization: 'Bearer' + response.data.Response.token,
                            }
                        })
                            .then((res) => {
                                localStorage.setItem("Token", JSON.stringify(response.data.Response.token));
                                localStorage.setItem("email", JSON.stringify(res.data.Response[0].email));
                                localStorage.setItem("password", JSON.stringify(res.data.Response[0].password));
                                localStorage.setItem("name", JSON.stringify(res.data.Response[0].name));
                                localStorage.setItem("user_id", JSON.stringify(res.data.Response[0].role_id));
                            })

                        history.push('/dashboard');
                    } else {
                        notification.error({
                            message: response.data.Message
                        });
                    }

                })
        }
    }


    return (
        <div className="masterContainer">
            <Grid item xs={12} spacing={2} direction="row" justifyContent={'center'} container className="subContainer">
                <Grid item xs={12} md={6} sx={6} sm={12} direction="row" alignItems={'center'} justifyContent={'flex-end'} container className='left_Container'>
                    <Grid item xs={12} md={9} sx={9} sm={12} className="lg_sec_par">
                        <div style={{ width: "20rem" }} className="lg_sec_child">
                            <div className="lg_div_in">
                                <img
                                    src={logo}
                                    style={{ width: "50%" }}
                                />
                            </div>
                            <div className="inner_child">
                                <LabelBoxes type="text"
                                    labelname="User Name"
                                    changeData={(data) => Validation(data, "email")}
                                    value={useLogin.email.value}
                                    error={useLogin.email.error}
                                    errmsg={useLogin.email.errmsg}
                                />
                                <LabelBoxes type="password" labelname="Password"
                                    changeData={(data) => Validation(data, "password")}
                                    value={useLogin.password.value}
                                    error={useLogin.password.error}
                                    errmsg={useLogin.password.errmsg}
                                />
                                <CustomButton
                                    btnName="Log In"
                                    custombtnCSS="Primary"
                                    onBtnClick={onsubmit}
                                />

                                <div className="for_drm">
                                    <Checkbox>Remember me</Checkbox>
                                    <label style={{ color: "#0098f5", fontWeight: "500", fontSize: '13px' }}>
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
                <Grid item xs={12} md={6} sx={6} sm={12} className='right_Container' alignItems={'center'} justifyContent={'flex-start'} container>
                    <Grid item xs={12} md={9} sx={9} sm={12} direction="row" alignItems={'center'} justifyContent={'center'} className="login2_le" container>
                        <Grid item xs={12} md={12} sx={12} sm={12} className='backImage' direction="row" alignItems={'center'} justifyContent={'center'} container  >
                            <div className="inside_box">
                                <div className="wel_child_d">
                                    Welcome to <span className="ship_tile">LOGINETICS</span>
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
                </Grid>
            </Grid>

        </div>
    );
}
