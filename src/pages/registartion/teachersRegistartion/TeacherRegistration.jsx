import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import { Input, Select, Space, Table, Modal, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import "./teacherregistration.scss";

import {
  getTeachers,
  deleteTeacher,
  updateTeacher,
} from "../../../services/actions/teacherAction";
import { RoutesConstant } from "../../../assets/constants";
import { UserModal, UserEditModal } from "../../../components";

const { Option } = Select;

const TeacherRegistration = () => {
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
    _id: "",
    access_status: "",
  };

  useEffect(() => {
    dispatch(getTeachers(searchObj)); // load user data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.TEACHERS); // get current user details from redux store
  

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
    let data = await dispatch(deleteTeacher(documentId)); // delete teacher data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Teacher deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const addTeacher = () => {
    navigate(RoutesConstant.addTeacher, {
      // navigate to loogin page
      replace: true,
    });
  };

  // const navigateToAddSubject = (record) => {
  //   navigate(
  //     RoutesConstant.addStudentSubject +
  //       "?id=" +
  //       record._id +
  //       "&cat-id=" +
  //       record.category_id,
  //     {
  //       // navigate to add student subject page
  //       replace: true,
  //     }
  //   );
  // };

  const editSubmit = async (editForm) => {
    let data = await dispatch(updateTeacher(recordDetails._id, editForm)); // save new student data
    if (data) {
      message.success({
        content: "Teacher Edited Successfully",
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
        {/* <FileAddOutlined
          className="action-icons"
          onClick={() => navigateToAddSubject(record)}
        /> */}
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
      title: "Teacher ID",
      dataIndex: "teacher_id",
      key: "teacher_id",
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
    <div className="teacher-reg">
      <div className="teacher-reg-wrapper">
        <Modal
          className="change-access-modal"
          open={EditModal}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <UserEditModal details={recordDetails} title={"Edit Teacher"} editedData={editSubmit} />
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
        <div className="teacher-reg-top">
          <div className="teacher-reg-top-search">
            <AddBoxIcon
              className="registration-add-Icon"
              onClick={addTeacher}
            />
            <Input
              className="registration-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="registration-search-Icon" />
            <FilterAltIcon
              disabled={true}
              className="registration-filter-Icon"
              // onClick={handleFilter}
            />
          </div>
          <div className={"teacher-reg-top-filter" + filter}>
            <div className="teacher-reg-top-filter-email">
              <div className="email-lablle">Email</div>
              <Input className="email-input" />
            </div>
            <div className="teacher-reg-top-filter-status">
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
            <div className="teacher-reg-top-filter-buttons">
              <Button className="filter-btn" variant="contained">
                Filter
              </Button>
              <Button className="cancel-btn" variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="teacher-reg-middle">
          <div className="teacher-tbl-title">Student Table</div>
          <Table
            className="teacher-registration-tbl"
            columns={columns}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="teacher-reg-bottom"></div>
      </div>
    </div>
  );
};

export default TeacherRegistration;
