import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import moment from "moment";

import { Input, Select, DatePicker, message, TimePicker } from "antd";
import Button from "@mui/material/Button";

import "./extraclasseditmodal.scss";

import { getHalls } from "../../services/actions/hallActions";
import { getSubjects } from "../../services/actions/subjectAction";

// schema for validation

const schema = Joi.object({
  subject_id: Joi.string().required().label("Subject ID"),
  hall_id: Joi.string().required().label("Hall ID"),
  date: Joi.date().raw().required().label("Date"),
  startTime: Joi.string().required().label("Start Time"),
  endTime: Joi.string().required().label("End Time"),
  requestStatus: Joi.string().required().label("End Time"),
});

const { Option } = Select;

const ExtraClassEditModal = ({ details, editedData }) => {
  // states difine
  const [form, setForm] = useState({
    subject_id: details.subject_id,
    hall_id: details.hall_id,
    date: details.date,
    startTime: details.startTime,
    endTime: details.endTime,
    requestStatus: details.requestStatus,
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  let hallObj = {
    hall_name: "",
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
    dispatch(getHalls(hallObj)); // load halls data to redux store
    dispatch(getSubjects(subjectObj)); // load subject data to redux store
  }, [dispatch]);

  let subjetData = useSelector((state) => state.SUBJECTS); // get teachers details from redux store
  let hallsData = useSelector((state) => state.HALLS); // get halls details from redux store

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
    setForm({ ...form, ["date"]: dateString });
  };

  const handleChangeSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const onChangeTime = (time) => {
    setForm({ ...form, ["startTime"]: time[0], ["endTime"]: time[1] });
  };

  const submit = async () => {
    console.log(form);
    if (validate()) {
      return;
    }

    return editedData(form);
  };
  
  const goBack = () => {};

  return (
    <div className="extra-edit-modal">
      <div className="extra-edit-modal-wrapper">
        <div className="extra-edit-modal-title">
          Edit Extra Class Request
        </div>
        <div className="extra-edit-modal-middle">
          <div className="add-extra-data-entity">
            <div className="add-extra-data-entity-lable">Subject Name</div>
            <div className="add-extra-data-entity-lable-data">
              <Select
                className="add-extra-data-entity-select"
                value={form.subject_id}
                onChange={(value) => {
                  handleChangeSelect("subject_id", value);
                }}
              >
                {subjetData.map((prop, index) => (
                  <Select.Option key={index} value={prop._id}>
                    {prop.subject_name}
                  </Select.Option>
                ))}
              </Select>
              <p className="input-error">
                {errors.subject_id ? errors.subject_id : ""}
              </p>
            </div>
          </div>
          <div className="add-extra-data-entity">
            <div className="add-extra-data-entity-lable">Hall Name</div>
            <div className="add-extra-data-entity-lable-data">
              <Select
                className="add-extra-data-entity-select"
                value={form.hall_id}
                onChange={(value) => {
                  handleChangeSelect("hall_id", value);
                }}
              >
                {hallsData.map((prop, index) => (
                  <Select.Option key={index} value={prop._id}>
                    {prop.hall_name}
                  </Select.Option>
                ))}
              </Select>
              <p className="input-error">
                {errors.hall_id ? errors.hall_id : ""}
              </p>
            </div>
          </div>
          <div className="add-extra-data-entity">
            <div className="add-extra-data-entity-lable">Date</div>
            <div className="add-extra-data-entity-lable-data">
              <DatePicker
                className="add-extra-data-entity-select"
                defaultValue={moment(form.date, "YYYY-MM-DD")}
                id="date"
                onChange={setDate}
              />
              <p className="input-error">{errors.date ? errors.date : ""}</p>
            </div>
          </div>
          <div className="add-extra-data-entity">
            <div className="add-extra-data-entity-lable">Date</div>
            <div className="add-extra-data-entity-lable-data">
              <TimePicker.RangePicker
                defaultValue={[
                  moment(form.startTime, "HH:mm:ss"),
                  moment(form.endTime, "HH:mm:ss"),
                ]}
                onChange={(time, timeString) => {
                  onChangeTime(timeString);
                }}
              />
              <p className="input-error">
                {errors.startTime
                  ? errors.startTime
                  : "" || errors.endTime
                  ? errors.endTime
                  : ""}
              </p>
            </div>
          </div>
          <div className="add-extra-buttons">
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

export default ExtraClassEditModal;
