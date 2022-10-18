import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Input, Select, Space, Table, Modal, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import "./studentregistration.scss";

import {
  getStudents,
  deleteStudent,
  updateStudent,
} from "../../../services/actions/studentAction";
import { RoutesConstant } from "../../../assets/constants";
import { UserModal, StudentEditModal } from "../../../components";

const { Option } = Select;

const StudentRegistration = () => {
  // states difine
  const [filter, setFilter] = useState("block");
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [recordDetails, setRecordDetails] = useState();
  const [EditModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let searchObj = {
    first_name: "",
    last_name: "",
    email: "",
    student_id: "",
    access_status: "",
  };

  useEffect(() => {
    dispatch(getStudents(searchObj)); // load user data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.STUDENTS); // get current user details from redux store

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
  const showdeleteModal = (record) => {
    setDocumentId(record._id);
    setIsDeleteModalOpen(true);
  };

  const showEditModal = (record) => {
    setRecordDetails(record);
    setEditModal(true);
  };

  const showUserModal = (record) => {
    setDocumentId(record._id);
    setRecordDetails(record);
    setUserModalOpen(true);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelUserModal = () => {
    setUserModalOpen(false);
  };

  const handleCancelEditModal = () => {
    setEditModal(false);
  };

  const handleDelete = async () => {
    let data = await dispatch(deleteStudent(documentId)); // delete student-subject data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Student deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const addStudent = () => {
    navigate(RoutesConstant.addStudent, {
      // navigate to loogin page
      replace: true,
    });
  };

  const navigateToAddSubject = (record) => {
    navigate(
      RoutesConstant.addStudentSubject +
        "?id=" +
        record._id +
        "&cat-id=" +
        record.category_id,
      {
        // navigate to add student subject page
        replace: true,
      }
    );
  };

  const editSubmit = async (editForm) => {
    let data = await dispatch(updateStudent(recordDetails._id, editForm)); // save new student data
    if (data) {
      message.success({
        content: "Student Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setEditModal(false);
  };

  const showActions = (record) => {
    return (
      <Space size="middle">
        <FileAddOutlined
          className="action-icons"
          onClick={() => navigateToAddSubject(record)}
        />
        <EyeOutlined
          className="action-icons"
          onClick={() => showUserModal(record)}
        />

        <EditOutlined
          className="action-icons"
          onClick={() => showEditModal(record)}
        />

        <DeleteOutlined
          className="action-icons delete-icon"
          onClick={() => showdeleteModal(record)}
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
        <Modal
          className="change-access-modal"
          open={EditModal}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <StudentEditModal details={recordDetails} editedData={editSubmit} />
        </Modal>
        <Modal
          className="change-access-modal"
          open={userModalOpen}
          onCancel={handleCancelUserModal}
          footer={null}
        >
          <UserModal details={recordDetails} />
        </Modal>
        <Modal
          className="change-access-modal"
          open={isDeleteModalOpen}
          onCancel={handleCancelDeleteModal}
          footer={null}
        >
          <div style={{}} className="change-access">
            <p style={{ fontSize: 18 }}>
              Are you sure want to delete this Student??
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
        <div className="student-reg-top">
          <div className="student-reg-top-search">
            <AddBoxIcon
              className="registration-add-Icon"
              onClick={addStudent}
            />
            <Input
              className="registration-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="registration-search-Icon" />
            <FilterAltIcon
              disabled ={true}
              className="registration-filter-Icon"
              // onClick={handleFilter}
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
