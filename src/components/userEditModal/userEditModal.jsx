import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import moment from "moment";

import { Input, Select, DatePicker, message, Modal } from "antd";
import Button from "@mui/material/Button";

import "./usereditmodal.scss";

// schema for validation

const schema = Joi.object({
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
});

const StudentEditModal = ({ details, title, editedData }) => {
  console.log(details);
  // states difine
  const [form, setForm] = useState({
    first_name: details.first_name,
    last_name: details.last_name,
    DOB: moment(details.DOB).format("YYYY-MM-DD"),
    NIC: details.NIC,
    phone: details.phone,
    email: details.email,
    avatar: details.avatar,
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

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

    return editedData(form);
  };

  const goBack = () => {};

  return (
    <div className="student-edit-modal">
      <div className="student-edit-modal-wrapper">
        <div className="student-edit-modal-title">{title}</div>
        <div className="student-edit-modal-middle">
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">First Name</div>
            <div className="add-student-data-entity-lable-data">
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
          </div>
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">Last Name</div>
            <div className="add-student-data-entity-lable-data">
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
          </div>
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">Birthday</div>
            <div className="add-student-data-entity-lable-data">
              <DatePicker
                className="add-student-data-entity-input"
                // defaultValue={form.DOB}
                defaultValue={moment(form.DOB, "YYYY-MM-DD")}
                id="DOB"
                onChange={setDate}
              />
              <p className="input-error">{errors.DOB ? errors.DOB : ""}</p>
            </div>
          </div>
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">NIC</div>
            <div className="add-student-data-entity-lable-data">
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
          </div>
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">Phone No</div>
            <div className="add-student-data-entity-lable-data">
              <Input
                className="add-student-data-entity-input"
                id="phone"
                value={form.phone}
                onChange={(e) => {
                  validateProperty("phone", e);
                }}
              />
              <p className="input-error">{errors.phone ? errors.phone : ""}</p>
            </div>
          </div>
          <div className="add-student-data-entity">
            <div className="add-student-data-entity-lable">Email</div>
            <div className="add-student-data-entity-lable-data">
              <Input
                className="add-student-data-entity-input"
                id="email"
                value={form.email}
                onChange={(e) => {
                  validateProperty("email", e);
                }}
              />
              <p className="input-error">{errors.email ? errors.email : ""}</p>
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
  );
};

export default StudentEditModal;
