import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

import { Input, Select, Space, Table, Modal, DatePicker } from "antd";
import Button from "@mui/material/Button";

import "./addstudent.scss";

import { getStudents } from "../../../../services/actions/studentAction";
import { RoutesConstant } from "../../../../assets/constants";

const { Option } = Select;

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

const AddStudent = () => {
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
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

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

  const submit = async () => {
    console.log(form);
  };

  const goBack = () => {
    navigate(RoutesConstant.studentRegistration, {
      // navigate to loogin page
      replace: true,
    });
  };

  return (
    <div className="add-student">
      <div className="add-student-wrapper">
        <div className="add-student-title">Add Student</div>
        <div className="add-student-middle">
          <div className="add-student-data">
            <div className="add-student-data-left">
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Student ID</div>
                <Input
                  className="add-student-data-entity-input"
                  id="student_id"
                  value={form.student_id}
                  onChange={(e) => {
                    validateProperty("student_id", e);
                  }}
                />
                <p className="input-error">
                  {errors.student_id ? errors.student_id : ""}
                </p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">First Name</div>
                <Input
                  className="add-student-data-entity-input"
                  id="first_name"
                  value={form.first_name}
                  onChange={(e) => {
                    validateProperty("first_name", e);
                  }}
                />
                <p className="input-error">
                  {errors.first_name ? errors.first_name : ""}
                </p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Last Name</div>
                <Input
                  className="add-student-data-entity-input"
                  id="last_name"
                  value={form.last_name}
                  onChange={(e) => {
                    validateProperty("last_name", e);
                  }}
                />
                <p className="input-error">
                  {errors.last_name ? errors.last_name : ""}
                </p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Birthday</div>
                <DatePicker
                  className="add-student-data-entity-input"
                  id="DOB"
                  onChange={(e) => {
                    validateProperty("DOB", e);
                  }}
                />
                <p className="input-error">{errors.DOB ? errors.DOB : ""}</p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Subjects</div>
                <Select
                  className="add-student-data-entity-input"
                  mode="multiple"
                  defaultValue="lucy"
                  showArrow={true}
                  //   onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <p className="input-error">{errors.NIC ? errors.NIC : ""}</p>
              </div>
            </div>
            <div className="add-student-data-right">
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Phone No</div>
                <Input
                  className="add-student-data-entity-input"
                  id="phone"
                  value={form.phone}
                  onChange={(e) => {
                    validateProperty("phone", e);
                  }}
                />
                <p className="input-error">
                  {errors.phone ? errors.phone : ""}
                </p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Email</div>
                <Input
                  className="add-student-data-entity-input"
                  id="email"
                  value={form.email}
                  onChange={(e) => {
                    validateProperty("email", e);
                  }}
                />
                <p className="input-error">
                  {errors.email ? errors.email : ""}
                </p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">NIC</div>
                <Input
                  className="add-student-data-entity-input"
                  id="NIC"
                  value={form.NIC}
                  onChange={(e) => {
                    validateProperty("NIC", e);
                  }}
                />
                <p className="input-error">{errors.NIC ? errors.NIC : ""}</p>
              </div>
              <div className="add-student-data-entity">
                <div className="add-student-data-entity-lable">Study Level</div>
                <Select
                  className="add-student-data-entity-input"
                  defaultValue="lucy"
                  //   onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <p className="input-error">{errors.NIC ? errors.NIC : ""}</p>
              </div>
            </div>
          </div>
          <div className="add-student-buttons">
            <Button className="save-btn" variant="contained" onClick={submit}>
              Save
            </Button>
            <Button className="cancel-btn" variant="contained" onClick={goBack}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
