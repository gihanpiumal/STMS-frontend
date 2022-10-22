import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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

import "./extraclasses.scss";

import {
  addExtraClasse,
  getExtraClasses,
  updateExtraClasse,
  deleteExtraClasse,
} from "../../services/actions/extraClassesActions";
import { RoutesConstant } from "../../assets/constants";
import { ExtraClassAddModal,ExtraClassEditModal } from "../../components";

const { Option } = Select;

const ExtraClasses = () => {
  // states difine
  const [filter, setFilter] = useState("block");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [recordDetails, setRecordDetails] = useState();
  const [EditModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let searchObj = {
    subject_id: "",
    hall_id: "",
    date: "",
    requestStatus: "",
  };

  useEffect(() => {
    dispatch(getExtraClasses(searchObj)); // load extra class request data to redux store
  }, [dispatch]);

  const dataExtraClasses = useSelector((state) => state.EXTRA_CLASSES); // get current extra class request details from redux store

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

  const addModal = () => {
    setAddModalOpen(true);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCancelUserModal = () => {
    setAddModalOpen(false);
  };

  const handleCancelEditModal = () => {
    setEditModal(false);
  };

  const handleDelete = async () => {
    let data = await dispatch(deleteExtraClasse(documentId)); // delete extra classes data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Extra Class Request deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const addExtraClassRequest = async (details) => {
    let data = await dispatch(addExtraClasse(details)); // save new request data
    if (data) {
      message.success({
        content: "Extra Class Request Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setAddModalOpen(false);
    dispatch(getExtraClasses(searchObj)); // load extra class request data to redux store
  };

  const editSubmit = async (editForm) => {
    let data = await dispatch(updateExtraClasse(recordDetails._id, editForm)); // save new student data
    if (data) {
      message.success({
        content: "Extra Class Request Edited Successfully",
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
        {/* <EyeOutlined
          className="action-icons"
          onClick={() => showUserModal(record)}
        /> */}

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
      dataIndex: "subject_details",
      key: "subject_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.subject_name;
          });
        }
      },
    },
    {
      title: "Hall Name",
      dataIndex: "Hall_details",
      key: "Hall_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.hall_name;
          });
        }
      },
    },
    {
      title: "Class Date",
      dataIndex: "date",
      key: "date",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return moment(data).format("YYYY-MM-DD");
        }
      },
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
      title: "Request Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
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
    <div className="extra-class">
      <div className="extra-class-wrapper">
        <Modal
          className="extra-class-modal"
          open={EditModal}
          onCancel={handleCancelEditModal}
          footer={null}
        >
          <ExtraClassEditModal
            details={recordDetails}
            editedData={editSubmit}
          />
        </Modal>
        <Modal
          className="extra-class-modal"
          open={addModalOpen}
          onCancel={handleCancelUserModal}
          footer={null}
        >
          <ExtraClassAddModal addData={addExtraClassRequest} />
        </Modal>
        <Modal
          className="extra-class-modal"
          open={isDeleteModalOpen}
          onCancel={handleCancelDeleteModal}
          footer={null}
        >
          <div style={{}} className="change-access">
            <p style={{ fontSize: 18 }}>
              Are you sure want to delete this Extra Class Request??
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
        <div className="extra-class-top">
          <div className="extra-class-top-search">
            <AddBoxIcon className="extra-class-add-Icon" onClick={addModal} />
            <Input
              className="extra-class-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="extra-class-search-Icon" />
            <FilterAltIcon
              disabled={true}
              className="extra-class-filter-Icon"
              onClick={handleFilter}
            />
          </div>
          <div className={"extra-class-top-filter" + filter}>
            <div className="extra-class-top-filter-email">
              <div className="email-lablle">Email</div>
              <Input className="email-input" />
            </div>
            <div className="extra-class-top-filter-status">
              <div className="extra-class-lablle">Status</div>
              <Select defaultValue="lucy" className="status-input">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="extra-class-top-filter-buttons">
              <Button className="filter-btn" variant="contained">
                Filter
              </Button>
              <Button className="cancel-btn" variant="contained">
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="extra-class-reg-middle">
          <div className="extra-class-tbl-title">Extra Class Request Table</div>
          <Table
            className="extra-class-registration-tbl"
            columns={columns}
            dataSource={dataExtraClasses}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="extra-class-reg-bottom"></div>
      </div>
    </div>
  );
};

export default ExtraClasses;
