import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Input, Select, DatePicker, message, Modal } from "antd";
import Button from "@mui/material/Button";

import "./addteacher.scss";

import {
  getTeachers,
  addTeacher,
} from "../../../../services/actions/teacherAction";
import { RoutesConstant } from "../../../../assets/constants";

// schema for validation
const schema = Joi.object({
  teacher_id: Joi.string().required().label("Staff ID"),
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
  password: Joi.string().empty("").label("Password"),
  registeredDate: Joi.date().raw().required().label("Registered Date"),
  access_level: Joi.string().required().label("Access Level"),
  access_status: Joi.string().required().label("Access Status"),
  isVerified: Joi.boolean().required().label("Verified"),
  OTPCode: Joi.number().optional().label("OTP"),
});

const AddTeacher = () => {
  // states difine
  const [form, setForm] = useState({
    teacher_id: "",
    first_name: "",
    last_name: "",
    DOB: "",
    NIC: "",
    phone: "",
    password: "",
    registeredDate: moment().format("YYYY-MM-DD"),
    email: "",
    avatar: "",
    access_level: "011",
    access_status: "pending",
    isVerified: false,
    OTPCode: 0,
  });
  const [errors, setErrors] = useState([]);
  const [isNavigateModalOpen, setNavigateIsModalOpen] = useState(false);
  const [categoryId, setCattegoryId] = useState([]);
  const [subjectIdDataList, setSubjectIdDataList] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentCategoryId, setStudentCategoryId] = useState("");

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

  const setDate = (date, dateString) => {
    setForm({ ...form, ["DOB"]: dateString });
  };

  const submit = async () => {
    if (validate()) {
      return;
    }

    let data = await dispatch(addTeacher(form)); // save new teacher data
    if (data) {
      message.success({
        content: "Teacher Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setErrors([]);
    goBack();
  };

  const goBack = () => {
    navigate(RoutesConstant.teacherRegistration, {
      // navigate to loogin page
      replace: true,
    });
  };

  return (
    <div className="add-teacher">
      <div className="add-teacher-wrapper">
        <div className="add-teacher-title">Add Teacher</div>
        <div className="add-teacher-middle">
          <div className="add-teacher-data">
            <div className="add-teacher-data-left">
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">Teacher ID</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
                    id="teacher_id"
                    value={form.teacher_id}
                    onChange={(e) => {
                      validateProperty("teacher_id", e);
                    }}
                  />
                  <p className="input-error">
                    {errors.teacher_id ? errors.teacher_id : ""}
                  </p>
                </div>
              </div>
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">First Name</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
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
              </div>
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">Last Name</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
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
              </div>
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">Birthday</div>
                <div className="add-teacher-data-entity-lable-data">
                  <DatePicker
                    className="add-teacher-data-entity-input"
                    id="DOB"
                    onChange={setDate}
                  />
                  <p className="input-error">{errors.DOB ? errors.DOB : ""}</p>
                </div>
              </div>
            </div>
            <div className="add-teacher-data-right">
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">Phone No</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
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
              </div>
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">Email</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
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
              </div>
              <div className="add-teacher-data-entity">
                <div className="add-teacher-data-entity-lable">NIC</div>
                <div className="add-teacher-data-entity-lable-data">
                  <Input
                    className="add-teacher-data-entity-input"
                    id="NIC"
                    value={form.NIC}
                    onChange={(e) => {
                      validateProperty("NIC", e);
                    }}
                  />
                  <p className="input-error">{errors.NIC ? errors.NIC : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="add-teacher-buttons">
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

export default AddTeacher;
