import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Input, Select, Space, Table, Modal, message } from "antd";

import "./dashboard.scss";

import { getExtraClasses } from "../../services/actions/extraClassesActions";
import { getSubjects } from "../../services/actions/subjectAction";
import { RoutesConstant } from "../../assets/constants";
import { ExtraClassAddModal, ExtraClassEditModal } from "../../components";

const Dashboard = () => {
  const dispatch = useDispatch();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let searchObj = {
    subject_id: "",
    hall_id: "",
    date: "",
    requestStatus: "",
  };

  let subjectObj = {
    subject_name: "",
    category_id: "",
    teacher_id: "",
    classDate: "",
    isAdmition: null,
    hall_id: "",
  };

  useEffect(() => {
    dispatch(getExtraClasses(searchObj)); // load extra class request data to redux store
    dispatch(getSubjects(subjectObj)); // load subject data to redux store
  }, [dispatch]);

  const dataExtraClasses = useSelector((state) => state.EXTRA_CLASSES); // get current extra class request details from redux store

  const dataUser = useSelector((state) => state.SUBJECTS); // get current subject details from redux store

  let todayClasses = [];
  var d = new Date();
  var dayName = days[d.getDay()];
  dataUser.map((val) => {
    if (val.classDate == dayName) {
      todayClasses.push(val);
    }
  });

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "subject_details",
      key: "subject_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.subject_name;
          });
        }
      },
    },
    {
      title: "Hall Name",
      dataIndex: "Hall_details",
      key: "Hall_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.hall_name;
          });
        }
      },
    },
    {
      title: "Class Date",
      dataIndex: "date",
      key: "date",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return moment(data).format("YYYY-MM-DD");
        }
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      responsive: ["sm"],
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      responsive: ["sm"],
    },
    {
      title: "Request Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      responsive: ["sm"],
    },
  ];

  const columnsSubject = [
    {
      title: "Subject Name",
      dataIndex: "subject_name",
      key: "subject_name",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacher_details",
      key: "teacher_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.first_name + " " + val.last_name;
          });
        }
      },
    },
    {
      title: "Category Name",
      dataIndex: "category_details",
      key: "category_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.category_name;
          });
        }
      },
    },
    {
      title: "Hall Name",
      dataIndex: "hall_details",
      key: "hall_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.hall_name;
          });
        }
      },
    },
    {
      title: "Class Date",
      dataIndex: "classDate",
      key: "classDate",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      responsive: ["sm"],
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      responsive: ["sm"],
    },
  ];

  const columnsSubjectToday = [
    {
      title: "Subject Name",
      dataIndex: "subject_name",
      key: "subject_name",
    },
    {
      title: "Hall Name",
      dataIndex: "hall_details",
      key: "hall_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.hall_name;
          });
        }
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      responsive: ["sm"],
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      responsive: ["sm"],
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-wrapper">
        <div className="dashboard-top">
          <div className="dashboard-top-left">
            <div className="subject-tbl-title">Today Time Table</div>
            <Table
              className="subject-registration-tbl"
              columns={columnsSubjectToday}
              dataSource={todayClasses}
              pagination={false}
              size={"small"}
            />
          </div>
          <div className="dashboard-top-right">
            <div className="extra-class-tbl-title">New Extra Class Request</div>
            <Table
              className="extra-class-registration-tbl"
              columns={columns}
              dataSource={dataExtraClasses}
              pagination={false}
              size={"small"}
            />
          </div>
        </div>
        <div className="dashboard-middle">
          <div className="subject-tbl-title">Subject Time Table</div>
          <Table
            className="subject-registration-tbl"
            columns={columnsSubject}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
