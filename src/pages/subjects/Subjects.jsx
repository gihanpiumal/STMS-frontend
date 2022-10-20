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

import "./subjects.scss";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../../services/actions/subjectAction";
import { RoutesConstant } from "../../assets/constants";
import { UserModal, UserEditModal } from "../../components";

const { Option } = Select;

const Subjects = () => {
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
    subject_name: "",
    category_id: "",
    teacher_id: "",
    classDate: "",
    isAdmition: true,
    hall_id: "",
  };

  useEffect(() => {
    dispatch(getSubjects(searchObj)); // load subject data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.SUBJECTS); // get current subject details from redux store

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
    let data = await dispatch(deleteSubject(documentId)); // delete subject data
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

  const addSubject = () => {
    navigate(RoutesConstant.addSubject, {
      // navigate to add subject page
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
    let data = await dispatch(updateSubject(recordDetails._id, editForm)); // save new student data
    if (data) {
      message.success({
        content: "Subject Edited Successfully",
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
      title: "Subject Name",
      dataIndex: "subject_name",
      key: "subject_name",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacher_details",
      key: "teacher_details",
      render: (data, record) => {
        return data.map((val, index) => {
          return val.first_name + " " + val.last_name;
        });
      },
    },
    {
      title: "Category Name",
      dataIndex: "category_details",
      key: "category_details",
      responsive: ["sm"],
      render: (data, record) => {
        return data.map((val, index) => {
          return val.category_name;
        });
      },
    },
    {
      title: "Hall Name",
      dataIndex: "hall_details",
      key: "hall_details",
      responsive: ["sm"],
      render: (data, record) => {
        return data.map((val, index) => {
          return val.hall_name;
        });
      },
    },
    {
      title: "Class Date",
      dataIndex: "classDate",
      key: "classDate",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      responsive: ["sm"],
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
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
    <div className="subject-reg">
      <div className="subject-reg-wrapper">
        <Modal
          className="change-access-modal"
          open={EditModal}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <UserEditModal details={recordDetails} title={"Edit Subject"} editedData={editSubmit} />
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
              Are you sure want to delete this Subject??
            </p>
          </div>
          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
            className="add-subject-buttons"
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
        <div className="subject-reg-top">
          <div className="subject-reg-top-search">
            <AddBoxIcon
              className="subject-add-Icon"
              onClick={addSubject}
            />
            <Input
              className="subject-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="subject-search-Icon" />
            <FilterAltIcon
              disabled ={true}
              className="subject-filter-Icon"
              // onClick={handleFilter}
            />
          </div>
          <div className={"subject-reg-top-filter" + filter}>
            <div className="subject-reg-top-filter-email">
              <div className="email-lablle">Email</div>
              <Input className="email-input" />
            </div>
            <div className="subject-reg-top-filter-status">
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
            <div className="subject-reg-top-filter-buttons">
              <Button className="filter-btn" variant="contained">
                Filter
              </Button>
              <Button className="cancel-btn" variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="subject-reg-middle">
          <div className="subject-tbl-title">Subject Table</div>
          <Table
            className="subject-registration-tbl"
            columns={columns}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="subject-reg-bottom"></div>
      </div>
    </div>
  );
};

export default Subjects;
