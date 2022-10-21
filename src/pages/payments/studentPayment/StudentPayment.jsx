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

import "./studentpayement.scss";

import {
  getStudentPayments,
  deleteStudentPayment,
  updateStudentPayment,
  addStudentPayment,
} from "../../../services/actions/studentPaymentActions";
import { RoutesConstant } from "../../../assets/constants";
import { SubjectEditModal, SubjectViewModal } from "../../../components";

const { Option } = Select;

const StudentPayment = () => {
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
    student_id: "",
    subject_id: "",
    staff_member_id: "",
    year: "",
    month: "",
    payment_state: null,
  };

  useEffect(() => {
    dispatch(getStudentPayments(searchObj)); // load syudent payment data to redux store
  }, [dispatch]);

  const dataStudentPayments = useSelector((state) => state.STUDENT_PAYMENT); // get current student payment details from redux store

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
    let data = await dispatch(deleteStudentPayment(documentId)); // delete student subject data
    if (data) {
      handleCancelDeleteModal();
      message.success({
        content: "Student Subject deleted Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    handleCancelDeleteModal();
  };

  const addSubject = () => {
    // navigate(RoutesConstant.addSubject, {
    //   // navigate to add subject page
    //   replace: true,
    // });
  };

  const editSubmit = async (editForm) => {
    let data = await dispatch(
      updateStudentPayment(recordDetails._id, editForm)
    ); // save new student data
    if (data) {
      message.success({
        content: "Student Payment Edited Successfully",
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
      title: "Student Name",
      dataIndex: "student_details",
      key: "student_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.first_name + " " + val.last_name;
          });
        }
      },
    },
    {
      title: "Subject Name",
      dataIndex: "subject_details",
      key: "subject_details",
      responsive: ["sm"],
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
      title: "Staff Member Name",
      dataIndex: "staff_member_details",
      key: "staff_member_details",
      responsive: ["sm"],
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.first_name + " " + val.last_name;
          });
        }
      },
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      responsive: ["sm"],
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      responsive: ["sm"],
    },
    {
      title: "Payment Date",
      dataIndex: "PaymentDate",
      key: "PaymentDate",
      responsive: ["sm"],
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => showActions(record),
    },
  ];
  return <div>StudentPayment</div>;
};

export default StudentPayment;
