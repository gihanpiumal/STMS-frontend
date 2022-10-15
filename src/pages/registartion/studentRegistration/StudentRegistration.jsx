import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Input, Select, Space, Table, Modal, DatePicker } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

import "./studentregistration.scss";

import { getStudents } from "../../../services/actions/studentAction";
import { RoutesConstant } from "../../../assets/constants";

const { Option } = Select;

const StudentRegistration = () => {
  // schema for validation

  const schema = Joi.object({
    student_id: Joi.string().required().label("Staff ID"),
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    DOB: Joi.date().raw().required().label("DOB"),
    NIC: Joi.string()
      .required()
      .regex(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/)
      .label("NIC")
      .messages({ "string.pattern.base": "Invalid NIC Number" }),
    phone: Joi.string()
      .required()
      .regex(
        /^(070)\d{7}$|^(071)\d{7}$|^(072)\d{7}$|^(074)\d{7}$|^(075)\d{7}$|^(076)\d{7}$|^(077)\d{7}$|^(078)\d{7}$/,
        "07xxxxxxxx"
      )
      .label("Mobile Number"),
    email: Joi.string()
      .required()
      .empty("")
      .regex(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "xxx@xx.xx",
        ""
      )
      .label("Email"),
    avatar: Joi.string().empty("").label("Profile Picture"),
    password: Joi.string().required().label("Password"),
    subject_list: Joi.array()
      .items(
        Joi.object().keys({
          subject_id: Joi.string().required().label("Subject id"),
        })
      )
      .required()
      .label("Subject id list"),
    registeredDate: Joi.date().raw().required().label("Registered Date"),
    access_level: Joi.string().required().label("Access Level"),
    access_status: Joi.string().required().label("Access Status"),
    isVerified: Joi.boolean().required().label("Verified"),
    OTPCode: Joi.number().optional().label("OTP"),
  });

  // states difine
  const [form, setForm] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    DOB: "",
    NIC: "",
    phone: "",
    password: "",
    registeredDate: "",
    email: "",
    avatar: "",
    subject_list: [],
    access_level: "001",
    access_status: "Pending",
    isVerified: false,
    OTPCode: 0,
  });
  const [errors, setErrors] = useState([]);
  const [filter, setFilter] = useState("block");
  const [addModal, setAddModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let searchObj = {
    first_name: "",
    last_name: "",
    email: "",
    subject_id: "",
    access_status: "",
  };

  useEffect(() => {
    dispatch(getStudents(searchObj)); // load user data to redux store
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

  // modal controll
  const showAddModal = () => {
    navigate(RoutesConstant.addStudent, {
      // navigate to loogin page
      replace: true,
    });
  };

  const cancelAddModal = () => {
    setAddModal(false);
  };

  // submit validation
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

  // onclick validation
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
            <AddBoxIcon
              className="registration-add-Icon"
              onClick={showAddModal}
            />
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
          <Table
            className="student-registration-tbl"
            columns={columns}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="student-reg-bottom"></div>
      </div>
    </div>
  );
};

export default StudentRegistration;
