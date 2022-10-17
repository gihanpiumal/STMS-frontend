import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Input,
  Select,
  message,
  Space,
  Table,
  Checkbox,
  Modal,
  Switch,
} from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import "./addstudentsubjects.scss";

import { getStudents, addStudent } from "../../services/actions/studentAction";
import {
  getStudentSubjects,
  addStudentSubjects,
  updateStudentSubjects,
  deleteStudentSubjects,
} from "../../services/actions/studentSubjectAction";
import { getCategories } from "../../services/actions/categoriesAction";
import { getSubjects } from "../../services/actions/subjectAction";
import { RoutesConstant, StringConstant } from "../../assets/constants";

const accessArray = [
  StringConstant.studentAccess.Active,
  StringConstant.studentAccess.Deactive,
];

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
    studentAccess: StringConstant.studentAccess.Active,
    reasonForStop: "",
  });
  const [editForm, setEditForm] = useState({
    tempStopDate: moment().format("YYYY-MM-DD"),
    studentAccess: "",
    reasonForStop: "",
  });
  const [isAdmitionWant, setIsAdmitionWant] = useState(false);
  const [admitionValuue, setAdmitionValue] = useState("");
  const [displayButtons, setDisplayButtons] = useState(false);
  const [checkBoxEror, setCheckBoxError] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
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

  // modal controllers
  const showEditModal = (record) => {
    setEditForm({ ...editForm, ["studentAccess"]: record.studentAccess });
    setDocumentId(record._id);
    setIsEditModalOpen(true);
  };

  const showdeleteModal = (record) => {
    setDocumentId(record._id);
    setIsDeleteModalOpen(true);
  };

  const handleChangAccess = (value) => {
    setEditForm({ ...editForm, ["studentAccess"]: value });
  };

  const handleCancelEditModal = () => {
    setIsEditModalOpen(false);
  };
  
  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = async () => {
    let data = await dispatch(updateStudentSubjects(documentId, editForm)); // save new student-subject data
    if (data) {
      handleCancelEditModal();
      message.success({
        content: "Subject Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelEditModal();
  };

  const handleDelete = async () => {
    let data = await dispatch(deleteStudentSubjects(documentId)); // save new student-subject data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Subject deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
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
        <EditOutlined
          className="action-icons"
          onClick={() => showEditModal(record)}
        />

        <DeleteOutlined
          className="action-icons"
          onClick={() => showdeleteModal(record)}
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
      title: "Tempory Stop Date",
      dataIndex: "tempStopDate",
      key: "tempStopDate",
      responsive: ["sm"],
      render: (date, record) => {
        return moment(date).format("YYYY-MM-DD");
      },
    },
    {
      title: "Student Status",
      dataIndex: "studentAccess",
      key: "studentAccess",
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
        <Modal
          className="change-access-modal"
          title="Change Student Access"
          open={isEditModalOpen}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="change-access"
          >
            <p style={{ flex: 1 }}>Change Student Access</p>
            <Select
              value={editForm.studentAccess}
              className="change-access-select"
              style={{ flex: 2 }}
              onChange={(value) => handleChangAccess(value)}
            >
              {accessArray.map((prop, index) => (
                <Select.Option key={index} value={prop}>
                  {prop}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="add-student-buttons"
          >
            <Button
              style={{ marginRight: 20 }}
              className="save-btn"
              variant="contained"
              onClick={handleEdit}
            >
              Save
            </Button>
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={handleCancelEditModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>

        <Modal
          className="change-access-modal"
          open={isDeleteModalOpen}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <div style={{}} className="change-access">
            <p style={{ fontSize: 18 }}>
              Are you sure want to delete this subject??
            </p>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="add-student-buttons"
          >
            <Button
              style={{ marginRight: 20 }}
              className="save-btn"
              variant="contained"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={handleCancelDeleteModal}
            >
              No
            </Button>
          </div>
        </Modal>
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
