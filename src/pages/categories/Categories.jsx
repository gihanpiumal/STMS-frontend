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

import "./categories.scss";

import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../services/actions/categoriesAction";
import { RoutesConstant } from "../../assets/constants";
import { UserModal, UserEditModal } from "../../components";
import { updateLocale } from "moment";

// schema for validatioon

const schema = Joi.object({
  category_name: Joi.string().required().label("Category Name"),
});

const Categories = () => {
  // states difine
  const [form, setForm] = useState({
    category_name: "",
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
    category_name: "",
  };

  useEffect(() => {
    dispatch(getCategories(searchObj)); // load user data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.CATEGORIES); // get current user details from redux store

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

    let data = await dispatch(addCategory(form)); // save new staff member data
    if (data) {
      message.success({
        content: "Category Added Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setErrors([]);
    setForm({ ...form, ["category_name"]: "" });
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
    setForm({ ...form, ["category_name"]: record.category_name });
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
    let data = await dispatch(deleteCategory(documentId)); // delete teacher data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Category deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const addStaff = () => {
    // navigate(RoutesConstant.addStaff, {
    //   // navigate to loogin page
    //   replace: true,
    // });
  };

  const editSubmit = async (editForm) => {
    let data = await dispatch(updateCategory(recordDetails._id, form)); // save new student data
    if (data) {
      message.success({
        content: "Category Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    setEditModal(false);
    dispatch(getCategories(searchObj)); // load user data to redux store
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
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
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
    <div className="category-reg">
      <div className="category-reg-wrapper">
        <Modal
          className="change-access-modal"
          open={EditModal}
          onCancel={handleCancelDeleteModal}
          footer={null}
        >
          <div style={{ textAlign: "center" }} className="change-access">
            <p style={{ fontSize: 18 }}>Edit Category</p>
          </div>
          <div className="category-reg-top-filter-email">
            <div className="email-lablle">Category Name</div>
            <Input
              className="email-input"
              id="categry-name"
              value={form.category_name}
              onChange={(e) => {
                validateProperty("category_name", e);
              }}
            />
            <p className="input-error">
              {errors.last_name ? errors.last_name : ""}
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
              Are you sure want to delete this Category??
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
        <div className="category-reg-top">
          <div className="category-reg-top-search">
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
          <div className={"category-reg-top-filter" + filter}>
            <div className="category-reg-top-filter-email">
              <div className="email-lablle">Category Name</div>
              <Input
                className="email-input"
                id="categry-name"
                value={form.category_name}
                onChange={(e) => {
                  validateProperty("category_name", e);
                }}
              />
              <p className="input-error">
                {errors.last_name ? errors.last_name : ""}
              </p>
            </div>
            <div className="category-reg-top-filter-buttons">
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
        <div className="category-reg-middle">
          <div className="category-tbl-title">Student Table</div>
          <Table
            className="category-registration-tbl"
            columns={columns}
            dataSource={dataUser}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="category-reg-bottom"></div>
      </div>
    </div>
  );
};

export default Categories;
