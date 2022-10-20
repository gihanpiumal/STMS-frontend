import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Input,
  Select,
  DatePicker,
  message,
  Modal,
  Radio,
  TimePicker,
} from "antd";
import Button from "@mui/material/Button";

import "./addsubject.scss";

import { getHalls } from "../../../services/actions/hallActions";
import {
  getSubjects,
  addSubject,
} from "../../../services/actions/subjectAction";
import { getCategories } from "../../../services/actions/categoriesAction";
import { getTeachers } from "../../../services/actions/teacherAction";
import { RoutesConstant, StringConstant } from "../../../assets/constants";

const { Option } = Select;

// schema for validation

const schema = Joi.object({
  subject_id: Joi.string().required().label("Subject ID"),
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
  startTime: Joi.string().required().label("Start Time"),
  endTime: Joi.string().required().label("End Time"),
});

// import "./addsubject.scss";

const AddSubject = () => {
  // states difine
  const [form, setForm] = useState({
    subject_id: "",
    subject_name: "",
    isAdmition: false,
    admition: "",
    fees: "",
    category_id: "",
    teacher_id: "",
    hall_id: "",
    classDate: "",
    startTime: "",
    endTime: "",
  });
  const [errors, setErrors] = useState([]);
  const [isNavigateModalOpen, setNavigateIsModalOpen] = useState(false);
  const [categoryId, setCattegoryId] = useState([]);
  const [subjectIdDataList, setSubjectIdDataList] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [studentCategoryId, setStudentCategoryId] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

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
  let subjectDataObj = [];

  // modal controllers

  const showNavigateModal = () => {
    setNavigateIsModalOpen(true);
  };

  const handleCancelNavigateModal = () => {
    setNavigateIsModalOpen(false);
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

  const setDate = (date, dateString) => {
    setForm({ ...form, ["DOB"]: dateString });
  };

  const submit = async () => {
    console.log(form);
    if (validate()) {
      return;
    }

    // let data = await dispatch(addSubject(form)); // save new student data
    // if (data) {
    //   message.success({
    //     content: "Student Added Successfully",
    //     style: {
    //       marginTop: "10vh",
    //     },
    //   });
    //   setStudentId(data.details._id);
    //   setStudentCategoryId(data.details.category_id);
    //   showNavigateModal();
    // }
    // setErrors([]);
    console.log(form);
  };

  const goBack = () => {
    navigate(RoutesConstant.subjects, {
      // navigate to loogin page
      replace: true,
    });
  };

  const addSubjects = () => {
    // navigate(
    //   RoutesConstant.addStudentSubject +
    //     "?id=" +
    //     studentId +
    //     "&cat-id=" +
    //     studentCategoryId,
    //   {
    //     // navigate to add student subject page
    //     replace: true,
    //   }
    // );
  };

  const handleChangeSelect = (name, value) => {
    // setCattegoryId(value);
    setForm({ ...form, [name]: value });
    // {
    //   subjectList.map((val) => {
    //     if (val.category_id === value) {
    //       subjectDataObj.push(val);
    //     }
    //   });
    // }

    // setSubjectIdDataList(subjectDataObj);
  };

  const changeRadio = (e) => {
    setForm({ ...form, ["isAdmition"]: e.target.value });
  };

  return (
    <div className="add-subject">
      <div className="add-subject-wrapper">
        <div className="add-subject-title">Add Subject</div>
        <div className="add-subject-middle">
          <div className="add-subject-data">
            <div className="add-subject-data-left">
              <div className="add-subject-data-entity">
                <div className="add-subject-data-entity-lable">Subject ID</div>
                <div className="add-subject-data-entity-lable-data">
                  <Input
                    className="add-subject-data-entity-input"
                    id="subject_id"
                    value={form.subject_id}
                    onChange={(e) => {
                      validateProperty("subject_id", e);
                    }}
                  />
                  <p className="input-error">
                    {errors.subject_id ? errors.subject_id : ""}
                  </p>
                </div>
              </div>
              <div className="add-subject-data-entity">
                <div className="add-subject-data-entity-lable">
                  Subject Name
                </div>
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
                  <div className="add-subject-data-entity-lable">
                    Admission Amount
                  </div>
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
                <div className="add-subject-data-entity-lable">Fees Amount</div>
                <div className="add-subject-data-entity-lable-data">
                  <Input
                    className="add-subject-data-entity-input"
                    id="fees"
                    value={form.fees}
                    onChange={(e) => {
                      validateProperty("fees", e);
                    }}
                  />
                  <p className="input-error">
                    {errors.fees ? errors.fees : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="add-subject-data-right">
              <div className="add-subject-data-entity">
                <div className="add-subject-data-entity-lable">
                  Category Name
                </div>
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
                <div className="add-subject-data-entity-lable">
                  Teacher Name
                </div>
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
    </div>
  );
};

export default AddSubject;
