import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Input, Select, Space, Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import "./studentregistration.scss";

import { getStudents } from "../../../services/actions/studentAction";

const { Option } = Select;

const StudentRegistration = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject_id: "",
    access_status: "",
  });
  const [filter, setFilter] = useState("block");
  const [dataList, setDataList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents(form)); // load user data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.STUDENTS); // get current user details from redux store

  console.log(dataUser);
  const handleFilter = () => {
    let styleName = "";
    switch (filter) {
      case "":
        styleName = "block";
        break;
      case "block":
        styleName = "";
        break;
    }
    setFilter(styleName);
  };

  const showActions = (record) => {
    return (
      <Space size="middle">
        <EyeOutlined
          className="action-icons"
          // onClick={() => this.showEditModal(record)}
        />

        <DeleteOutlined
          className="action-icons delete-icon"
          // onClick={() => this.showDeleteModal(record)}
        />
      </Space>
    );
  };

  const columns = [
    {
      title: "Student ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => showActions(record),
    },
  ];

  return (
    <div className="student-reg">
      <div className="student-reg-wrapper">
        <div className="student-reg-top">
          <div className="student-reg-top-search">
            <AddBoxIcon className="registration-add-Icon" />
            <Input
              className="registration-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="registration-search-Icon" />
            <FilterAltIcon
              className="registration-filter-Icon"
              onClick={handleFilter}
            />
          </div>
          <div className={"student-reg-top-filter" + filter}>
            <div className="student-reg-top-filter-email">
              <div className="email-lablle">Email</div>
              <Input className="email-input" />
            </div>
            <div className="student-reg-top-filter-status">
              <div className="status-lablle">Status</div>
              <Select defaultValue="lucy" className="status-input">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="student-reg-top-filter-buttons">
              <Button className="filter-btn" variant="contained">
                Filter
              </Button>
              <Button className="cancel-btn" variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="student-reg-middle">
          <div className="student-tbl-title">Student Table</div>
          {/* <div className="student-registration-tbl"> */}
          <Table
            className="student-registration-tbl"
            columns={columns}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
          {/* </div> */}
        </div>
        <div className="student-reg-bottom"></div>
      </div>
    </div>
  );
};

export default StudentRegistration;
