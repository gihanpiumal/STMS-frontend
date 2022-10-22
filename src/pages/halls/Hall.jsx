import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

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

import "./hall.scss";

import {
  getHalls,
  addHall,
  updateHall,
  deleteHall,
} from "../../services/actions/hallActions";

// schema for validatioon

const schema = Joi.object({
  hall_name: Joi.string().required().label("Hall Name"),
});

const Hall = () => {
  // states difine
  const [form, setForm] = useState({
    hall_name: "",
  });
  const [errors, setErrors] = useState([]);
  const [filter, setFilter] = useState("block");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [recordDetails, setRecordDetails] = useState();
  const [EditModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links

  let searchObj = {
    hall_name: "",
  };

  useEffect(() => {
    dispatch(getHalls(searchObj)); // load hall data to redux store
  }, [dispatch]);

  const dataHall = useSelector((state) => state.HALLS); // get current hall details from redux store

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

  const submit = async () => {
    if (validate()) {
      return;
    }

    let data = await dispatch(addHall(form)); // save new hall  data
    if (data) {
      message.success({
        content: "Hall Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setErrors([]);
    setForm({ ...form, ["hall_name"]: "" });
    handleFilter();
  };

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
    setForm({ ...form, ["hall_name"]: record.hall_name });
    setEditModal(true);
  };

  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEditModal(false);
  };

  const handleCancelEditModal = () => {
    setEditModal(false);
  };

  const handleDelete = async () => {
    let data = await dispatch(deleteHall(documentId)); // delete hall data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Hall deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const editSubmit = async (editForm) => {
    let data = await dispatch(updateHall(recordDetails._id, form)); // save new hall data
    if (data) {
      message.success({
        content: "Hall Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setEditModal(false);
    dispatch(getHalls(searchObj)); // load hall data to redux store
  };

  const showActions = (record) => {
    return (
      <Space size="middle">
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
      title: "Hall Name",
      dataIndex: "hall_name",
      key: "hall_name",
    },
    {
      title: "Subjects",
      dataIndex: "subjects",
      key: "subjects",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            if (index == data.length - 1) {
              return `${val.subject_name}`;
            } else {
              return `${val.subject_name} ,`;
            }
          });
        }
      },
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => showActions(record),
    },
  ];
  return (
    <div className="hall-reg">
      <div className="hall-reg-wrapper">
        <Modal
          className="change-access-modal"
          open={EditModal}
          onCancel={handleCancelDeleteModal}
          footer={null}
        >
          <div style={{ textAlign: "center" }} className="change-access">
            <p style={{ fontSize: 18 }}>Edit Hall</p>
          </div>
          <div className="hall-reg-top-filter-email">
            <div className="email-lablle">Hall Name</div>
            <Input
              className="email-input"
              id="hall-name"
              value={form.hall_name}
              onChange={(e) => {
                validateProperty("hall_name", e);
              }}
            />
            <p className="input-error">
              {errors.hall_name ? errors.hall_name : ""}
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
              onClick={editSubmit}
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

        <Modal
          className="change-access-modal"
          open={isDeleteModalOpen}
          onCancel={handleCancelDeleteModal}
          footer={null}
        >
          <div style={{}} className="change-access">
            <p style={{ fontSize: 18 }}>
              Are you sure want to delete this Hall??
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
        <div className="hall-reg-top">
          <div className="hall-reg-top-search">
            <AddBoxIcon
              className="registration-add-Icon"
              onClick={handleFilter}
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
          <div className={"hall-reg-top-filter" + filter}>
            <div className="hall-reg-top-filter-email">
              <div className="email-lablle">Hall Name</div>
              <Input
                className="email-input"
                id="hall-name"
                value={form.hall_name}
                onChange={(e) => {
                  validateProperty("hall_name", e);
                }}
              />
              <p className="input-error">
                {errors.hall_name ? errors.hall_name : ""}
              </p>
            </div>
            <div className="hall-reg-top-filter-buttons">
              <Button
                className="filter-btn"
                variant="contained"
                onClick={submit}
              >
                Save
              </Button>
              <Button
                className="cancel-btn"
                variant="contained"
                onClick={handleFilter}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="hall-reg-middle">
          <div className="hall-tbl-title">Hall Table</div>
          <Table
            className="hall-registration-tbl"
            columns={columns}
            dataSource={dataHall}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="hall-reg-bottom"></div>
      </div>
    </div>
  );
};

export default Hall;
