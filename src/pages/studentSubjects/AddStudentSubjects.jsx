import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Input,
  Select,
  DatePicker,
  message,
  Space,
  Table,
  Checkbox,
} from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import "./addstudentsubjects.scss";

import { getStudents, addStudent } from "../../services/actions/studentAction";
import {
  getStudentSubjects,
  addStudentSubjects,
} from "../../services/actions/studentSubjectAction";
import { getCategories } from "../../services/actions/categoriesAction";
import { getSubjects } from "../../services/actions/subjectAction";
import { RoutesConstant } from "../../assets/constants";

const AddStudentSubjects = () => {
  const location = useLocation();
  const studentID = new URLSearchParams(location.search).get("id");
  const studentSubjectCategoryID = new URLSearchParams(location.search).get(
    "cat-id"
  );
  const [form, setForm] = useState({
    student_id: studentID,
    subject_id: "",
    enrollDate: moment().format("YYYY-MM-DD"),
    tempStopDate: "",
    admition: false,
    studentAccess: "Active",
    reasonForStop: "",
  });
  const [isAdmitionWant, setIsAdmitionWant] = useState(false);
  const [admitionValuue, setAdmitionValue] = useState("");
  const [displayButtons, setDisplayButtons] = useState(false);
  const [checkBoxEror, setCheckBoxError] = useState(false);
  const [checkBoxValue, setChckBoxValue] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let studentSubjectObj = {
    student_id: studentID,
    subject_id: "",
    admition: null,
    studentAccess: "",
  };

  let subjectObj = {
    subject_name: "",
    category_id: studentSubjectCategoryID,
    teacher_id: "",
    classDate: "",
    isAdmition: null,
    hall_id: "",
  };

  useEffect(() => {
    dispatch(getStudentSubjects(studentSubjectObj)); // load student subject data to redux store
    dispatch(getSubjects(subjectObj)); // load subjects data to redux store
  }, [dispatch]);

  const studentSubjectData = useSelector((state) => state.STUDENT_SUBJECTS); // get current student subjects details from redux store
  let subjectList = useSelector((state) => state.SUBJECTS); // get current subject details from redux store

  const handleChangeSubject = (value) => {
    setForm({ ...form, ["subject_id"]: value });
    subjectList.map((val) => {
      if (val._id == value) {
        if (val.isAdmition) {
          setIsAdmitionWant(true);
          setAdmitionValue(val.admition);
        } else {
          setIsAdmitionWant(false);
        }
        {
          !form.admition && setDisplayButtons(true);
        }
      }
    });
  };

  const setAdmission = (e) => {
    setForm({ ...form, ["admition"]: e.target.checked });
    setCheckBoxError(false);
  };

  const submit = async () => {
    if (isAdmitionWant && !form.admition) {
      setCheckBoxError(true);
      return;
    }

    let selectSubjectId = false;
    studentSubjectData.map((val) => {
      if (val.subject_id == form.subject_id) {
        selectSubjectId = true;
      }
    });

    if (selectSubjectId) {
      message.error({
        content: "Subject Already Added",
        style: {
          marginTop: "10vh",
        },
      });
      return;
    }

    let data = await dispatch(addStudentSubjects(form)); // save new student-subject data
    if (data) {
      message.success({
        content: "Subject Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });

      setIsAdmitionWant(false);
      setDisplayButtons(false);
      setForm({ ...form, ["subject_id"]: "", ["admition"]: false });
      // goBack();
    }
  };

  const onCancel = () => {
    setIsAdmitionWant(false);
    setDisplayButtons(false);
    setForm({ ...form, ["subject_id"]: "", ["admition"]: false });
  };

  const goBack = () => {
    navigate(RoutesConstant.studentRegistration, {
      // navigate to loogin page
      replace: true,
    });
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

  const getSubjectName = (data) => {
    return subjectList.map((val) => {
      if (val._id === data) {
        return val.subject_name;
      }
    });
  };

  const columns = [
    {
      title: "Subject Name",
      dataIndex: "subject_id",
      key: "subject_id",
      render: (data, record) => getSubjectName(data),
    },
    {
      title: "Enrall Date",
      dataIndex: "enrollDate",
      key: "enrollDate",
      render: (date, record) => {
        return moment(date).format("YYYY-MM-DD");
      },
    },
    {
      title: "Addmition",
      dataIndex: "admition",
      key: "admition",
      render: (data, record) => {
        let status = "";
        {
          data == true ? (status = "Done") : (status = "No need");
        }
        return status;
      },
    },
    {
      title: "Student Access",
      dataIndex: "studentAccess",
      key: "studentAccess",
    },
    {
      title: "Tempory Stop Date",
      dataIndex: "tempStopDate",
      key: "tempStopDate",
      responsive: ["sm"],
    },
    {
      title: "Reason For Stop",
      dataIndex: "reasonForStop",
      key: "reasonForStop",
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
    <div className="add-student-subject">
      <div className="add-student-subject-wrapper">
        <div className="add-student-subject-top">
          <div className="add-student-subject-top-select-box">
            <div className="top-bar-line-left">
              <div className="title">Add Subject</div>
              <div className="select-box">
                <Select
                  value={form.subject_id}
                  className="add-student-data-entity-select"
                  onChange={(value) => handleChangeSubject(value)}
                >
                  {subjectList.map((prop, index) => (
                    <Select.Option key={index} value={prop._id}>
                      {prop.subject_name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="top-bar-line-right">
              <Button className="back-btn" variant="contained" onClick={goBack}>
                Back
              </Button>
            </div>
          </div>
          <div className="middle-middledata">
            {isAdmitionWant && (
              <div className="admition-data">
                <div className="admition-title">Admission Fees : </div>
                <div className="admission-checkbox">
                  <Checkbox
                    className="admission-checkbox-value"
                    defaultChecked={false}
                    onChange={(e) => {
                      setAdmission(e);
                    }}
                  >
                    {admitionValuue}
                  </Checkbox>
                  {checkBoxEror && (
                    <p className="error">
                      please accept the check box for admission verification
                    </p>
                  )}
                </div>
              </div>
            )}
            {displayButtons && (
              <div className="add-student-buttons">
                <Button
                  className="save-btn"
                  variant="contained"
                  onClick={submit}
                >
                  Save
                </Button>
                <Button
                  className="cancel-btn"
                  variant="contained"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="add-student-subject-middle">
          <div className="student-tbl-title">Student Table</div>
          <Table
            className="student-registration-tbl"
            columns={columns}
            dataSource={studentSubjectData}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="add-student-subject-bottum"></div>
      </div>
    </div>
  );
};

export default AddStudentSubjects;
