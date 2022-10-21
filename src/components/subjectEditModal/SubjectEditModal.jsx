import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import moment from "moment";

import { Input, Select, TimePicker, message, Modal, Radio } from "antd";
import Button from "@mui/material/Button";

import "./subjecteditmodal.scss";

import { getHalls } from "../../services/actions/hallActions";
import { getSubjects, addSubject } from "../../services/actions/subjectAction";
import { getCategories } from "../../services/actions/categoriesAction";
import { getTeachers } from "../../services/actions/teacherAction";
import { RoutesConstant, StringConstant } from "../../assets/constants";

// schema for validation

const schema = Joi.object({
  subject_name: Joi.string().required().label("Subject Name"),
  isAdmition: Joi.boolean().required().label("Is Admition"),
  admition: Joi.string()
    .regex(/^(\d+(\.\d+)?)$/)
    .messages({ "string.pattern.base": `"Admition" must be a number.` })
    .required()
    .label("Admition"),
  fees: Joi.string()
    .regex(/^(\d+(\.\d+)?)$/)
    .messages({ "string.pattern.base": `"fees" must be a number.` })
    .required()
    .label("Fees"),
  category_id: Joi.string().required().label("Category ID"),
  teacher_id: Joi.string().empty("").label("Teacher ID"),
  hall_id: Joi.string().empty("").label("Hall ID"),
  classDate: Joi.string().required().label("Class Date"),
  startTime: Joi.string().required().label("Start Time and End Time"),
  endTime: Joi.string().required().label("Start Time and End Time"),
});

const SubjectEditModal = ({ details, editedData }) => {
  // states difine
  const [form, setForm] = useState({
    subject_name: details.subject_name,
    isAdmition: details.isAdmition,
    admition: details.admition.toString(),
    fees: details.fees.toString(),
    category_id: details.category_id,
    teacher_id: details.teacher_id,
    hall_id: details.hall_id,
    classDate: details.classDate,
    startTime: details.startTime,
    endTime: details.endTime,
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  let categoryObj = {
    category_name: "",
  };

  let hallObj = {
    hall_name: "",
  };

  let teacherObj = {
    first_name: "",
    last_name: "",
    email: "",
    _id: "",
    access_status: "",
  };
  useEffect(() => {
    dispatch(getCategories(categoryObj)); // load category data to redux store
    dispatch(getTeachers(teacherObj)); // load teachers data to redux store
    dispatch(getHalls(hallObj)); // load halls data to redux store
  }, [dispatch]);

  const categoryData = useSelector((state) => state.CATEGORIES); // get category details from redux store
  let teachersData = useSelector((state) => state.TEACHERS); // get teachers details from redux store
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

  const handleChangeSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const changeRadio = (e) => {
    setForm({ ...form, ["isAdmition"]: e.target.value });
    if (!e.target.value) {
      setForm({ ...form, ["admition"]: "0" });
    }
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
    <div className="subject-edit-modal">
      <div className="subject-edit-modal-wrapper">
        <div className="subject-edit-modal-title">Edit Subject</div>
        <div className="subject-edit-modal-middle">
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Subject Name</div>
            <div className="add-subject-data-entity-lable-data">
              <Input
                className="add-subject-data-entity-input"
                id="subject_name"
                value={form.subject_name}
                onChange={(e) => {
                  validateProperty("subject_name", e);
                }}
              />
              <p className="input-error">
                {errors.subject_name ? errors.subject_name : ""}
              </p>
            </div>
          </div>
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Admission</div>
            <div className="add-subject-data-entity-lable-data">
              <Radio.Group
                value={form.isAdmition}
                onChange={(e) => changeRadio(e)}
                className="add-subject-data-entity-input"
              >
                <Radio value={true}>Include</Radio>
                <Radio value={false}>Not Include</Radio>
              </Radio.Group>
              <p className="input-error">
                {errors.isAdmition ? errors.isAdmition : ""}
              </p>
            </div>
          </div>
          {form.isAdmition && (
            <div className="add-subject-data-entity">
              <div className="add-subject-data-entity-lable">Admission</div>
              <div className="add-subject-data-entity-lable-data">
                <Input
                  className="add-subject-data-entity-input"
                  id="admition"
                  value={form.admition}
                  onChange={(e) => {
                    validateProperty("admition", e);
                  }}
                />
                <p className="input-error">
                  {errors.admition ? errors.admition : ""}
                </p>
              </div>
            </div>
          )}
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Fees</div>
            <div className="add-subject-data-entity-lable-data">
              <Input
                className="add-subject-data-entity-input"
                id="fees"
                value={form.fees}
                onChange={(e) => {
                  validateProperty("fees", e);
                }}
              />
              <p className="input-error">{errors.fees ? errors.fees : ""}</p>
            </div>
          </div>
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Category Name</div>
            <div className="add-subject-data-entity-lable-data">
              <Select
                className="add-subject-data-entity-select"
                value={form.category_id}
                onChange={(value) => {
                  handleChangeSelect("category_id", value);
                }}
              >
                {categoryData.map((prop, index) => (
                  <Select.Option key={index} value={prop._id}>
                    {prop.category_name}
                  </Select.Option>
                ))}
              </Select>
              <p className="input-error">
                {errors.category_id ? errors.category_id : ""}
              </p>
            </div>
          </div>
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Teacher Name</div>
            <div className="add-subject-data-entity-lable-data">
              <Select
                className="add-subject-data-entity-select"
                value={form.teacher_id}
                onChange={(value) => {
                  handleChangeSelect("teacher_id", value);
                }}
              >
                {teachersData.map((prop, index) => (
                  <Select.Option key={index} value={prop._id}>
                    {prop.first_name + " " + prop.last_name}
                  </Select.Option>
                ))}
              </Select>
              <p className="input-error">
                {errors.teacher_id ? errors.teacher_id : ""}
              </p>
            </div>
          </div>
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Hall Name</div>
            <div className="add-subject-data-entity-lable-data">
              <Select
                className="add-subject-data-entity-select"
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
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Class Date</div>
            <div className="add-subject-data-entity-lable-data">
              <Select
                className="add-subject-data-entity-select"
                value={form.classDate}
                onChange={(value) => handleChangeSelect("classDate", value)}
              >
                {StringConstant.days.map((prop, index) => (
                  <Select.Option key={index} value={prop}>
                    {prop}
                  </Select.Option>
                ))}
              </Select>
              <p className="input-error">
                {errors.classDate ? errors.classDate : ""}
              </p>
            </div>
          </div>
          <div className="add-subject-data-entity">
            <div className="add-subject-data-entity-lable">Class Time</div>
            <div className="add-subject-data-entity-lable-data">
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
        </div>
        <div className="add-subject-buttons">
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

export default SubjectEditModal;
