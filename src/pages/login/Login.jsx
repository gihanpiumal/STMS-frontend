import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Joi, { required } from "joi";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { message } from "antd";

import "./login.scss";

import { StaffService } from "../../services";
import { setAccessToken, removeAccessToken } from "../../config/LocalStorage";
import { RoutesConstant } from "../../assets/constants";

const Login = () => {
  // stats of form and errors

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("password");
  let navigate = useNavigate();

  const schema = Joi.object({
    email: Joi.string()
      .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/)
      .messages({ "string.pattern.base": `"Please provide valide email` })
      .required(),
    password: Joi.string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[@$!%*#?&])|(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
      .required()
      .label("Password")
      .messages({
        "string.pattern.base":
          "Password must contain at least 8 characters, at least one letter and one number.",
      }),
  });

  // validations of submit
  const validate = () => {
    const option = {
      abortEarly: false,
    };

    const { error } = schema.validate(form, option);

    if (!error) return null;
    const errorData = {};
    for (let item of error.details) {
      const name = item.path[0];
      const message = item.message;
      errorData[name] = message;
    }

    setErrors(errorData);
    return errorData;
  };

  // valiation of onclicks
  const validateProperty = (name, value) => {
    const option = {
      abortEarly: false,
    };

    form[name] = value.currentTarget.value;
    const { error } = schema.validate(form, option);

    const errorData = {};
    setErrors({ ...errors, [name]: null });
    if (error) {
      for (let item of error.details) {
        if (item.path[0] === name) {
          setErrors({ ...errors, [name]: item.message });
        }
      }
    }
  };

  // set form clear
  const clearState = () => {
    setForm({
      email: "",
      password: "",
    });
  };

  // submit the form
  const submit = async () => {
    if (validate()) {
      return;
    }
    try {
      console.log(form);
      let data = await StaffService.login(form);
      if (data) {
        clearState();
        removeAccessToken();
        setAccessToken(data.token); // set new accesstoken
        // navigate(RoutesConstant.home, {  // navigate to home page
        //   replace: true,
        // });
        console.log("done login");
      } else {
        message.error("Wrong email or password", 3);
        return;
      }
      return;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  // show to don't show the password
  const changePassword = () => {
    if (password === "password") {
      setPassword("");
    } else {
      setPassword("password");
    }
  };

  return (
    <div className="login">
      <div className="loging-image">
        <img
          src={require("../../images/green-chameleon-s9CC2SKySJM-unsplash.jpg")}
          alt=""
        />
      </div>
      <div className="login-wrapper">
        <div className="login-main-title">
          Welcome to Student Management System
        </div>
        <div className="login-logo">LOGO</div>
        <div className="login-details">
          <div className="loging-title">Login</div>
          <div className="login-inputs">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              className="login-text-input"
              value={form.email}
              name={"email"}
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email : ""}
              onChange={(e) => {
                validateProperty("email", e);
              }}
            />

            <div className="password-claass">
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type={password}
                className="registration-text-input-password-claass"
                value={form.password}
                name={"password"}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password : ""}
                onChange={(e) => {
                  validateProperty("password", e);
                }}
              />
              {password ? (
                <VisibilityIcon onClick={changePassword} />
              ) : (
                <VisibilityOffIcon onClick={changePassword} />
              )}
            </div>
          </div>
        </div>
        <div className="login-buttons">
          <div className="login-buttons-bottom">
            <Button
              variant="contained"
              className="login-button"
              onClick={submit}
            >
              Login
            </Button>
          </div>
          <Link to={RoutesConstant.resetPassword}>forgot Password?</Link>
          <p className="login-shift-text">Powered by @gihan</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
