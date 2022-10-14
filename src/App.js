import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.scss";

import {
  Login,
  ResetPassword,
  EmailVerification,
  ResetPasswordVerification,
  Home,
} from "./pages";
import { RoutesConstant } from "./assets/constants";
import { Layout } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Routes>
          <Route path="*" element={<Navigate to={RoutesConstant.login} />} />
          <Route
            path={RoutesConstant.login}
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path={RoutesConstant.home}
            element={
              <>
                <Layout component={<Home />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.resetPassword}
            element={<ResetPassword />}
          />
          <Route
            path={RoutesConstant.emailVerification}
            element={<EmailVerification />}
          />
          <Route
            path={RoutesConstant.resetPasswordVerification}
            element={<ResetPasswordVerification />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
