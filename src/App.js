import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./app.scss";

import {
  Login,
  ResetPassword,
  EmailVerification,
  ResetPasswordVerification,
  Home,
  Dashboard,
  Subjects,
  StaffRegistration,
  StudentRegistration,
  TeacherRegistration,
  SttaffPayment,
  TeacherPayement,
  StudentPayment,
  OtherPayment,
  Classes,
  ExtraClasses,
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
            path={RoutesConstant.dashboard}
            element={
              <>
                <Layout component={<Dashboard />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.subjects}
            element={
              <>
                <Layout component={<Subjects />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.studentRegistration}
            element={
              <>
                <Layout component={<StudentRegistration />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.teacherRegistration}
            element={
              <>
                <Layout component={<TeacherRegistration />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.staffRegistration}
            element={
              <>
                <Layout component={<StaffRegistration />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.studentPayment}
            element={
              <>
                <Layout component={<StudentPayment />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.teacherPayment}
            element={
              <>
                <Layout component={<TeacherPayement />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.staffPayment}
            element={
              <>
                <Layout component={<SttaffPayment />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.otherPayment}
            element={
              <>
                <Layout component={<OtherPayment />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.classes}
            element={
              <>
                <Layout component={<Classes />} />
              </>
            }
          />
          <Route
            path={RoutesConstant.extraClasses}
            element={
              <>
                <Layout component={<ExtraClasses />} />
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
