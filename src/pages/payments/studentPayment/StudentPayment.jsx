import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import jwt_decode from "jwt-decode";

import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Button from "@mui/material/Button";
import {
  Input,
  Select,
  Space,
  Table,
  Modal,
  message,
  Switch,
  Checkbox,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

import "./studentpayement.scss";

import {
  getStudentPayments,
  updateStudentPayment,
  addStudentPayment,
} from "../../../services/actions/studentPaymentActions";
import { getStudentSubjects } from "../../../services/actions/studentSubjectAction";
import { RoutesConstant, StringConstant } from "../../../assets/constants";
import { getAccessToken } from "../../../config/LocalStorage";

const { Option } = Select;

const StudentPayment = () => {
  // states difine
  const [filter, setFilter] = useState("block");
  const [addNewModalOpen, setAddNewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [recordDetails, setRecordDetails] = useState();
  const [EditModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate(); // use to navigate between links
  let dateObj = new Date();
  const [form, setForm] = useState({
    student_id: "",
    subject_id: "",
    staff_member_id: "",
    year: dateObj.getUTCFullYear().toString(),
    month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date()
    ),
    payment_state: null,
  });
  const [month, setMonth] = useState("");

  let studentSubjectObj = {
    student_id: "",
    subject_id: "",
    admition: null,
    studentAccess: "",
  };

  useEffect(() => {
    dispatch(getStudentPayments(form)); // load syudent payment data to redux store
    dispatch(getStudentSubjects(studentSubjectObj)); // load student subject data to redux store
  }, [dispatch]);

  const dataStudentPayments = useSelector((state) => state.STUDENT_PAYMENT); // get current student payment details from redux store

  const studentSubjectData = useSelector((state) => state.STUDENT_SUBJECTS); // get current student subjects details from redux store
  const search = () => {
    console.log(dataStudentPayments);
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

  const showaddNewModal = () => {
    setAddNewModalOpen(true);
  };

  const handleCancelAddNewModal = () => {
    setAddNewModalOpen(false);
  };

  const editSubmit = async (editForm, id) => {
    let data = await dispatch(updateStudentPayment(id, editForm)); // save new student-payment data
    if (data) {
      message.success({
        content: "Student Payment Edited Successfully",
        style: {
          marginTop: "10vh",
        },
      });
    }
    dispatch(getStudentPayments(form)); // load syudent payment data to redux store
  };
  const onChangePayment = (status, record) => {
    let id = record._id;
    let paymentDate = "";

    if (status) {
      paymentDate = moment().format("YYYY-MM-DD");
    } else {
      paymentDate = "";
    }

    let editStudent = {
      PaymentDate: paymentDate,
      payment_state: status,
    };
    console.log(editStudent);
    editSubmit(editStudent, id);
  };

  const filterHandle = async () => {
    dispatch(getStudentPayments(form)); // load syudent payment data to redux store
  };

  const getAllData = (e) => {
    if (e.target.checked) {
      setForm({ ...form, ["year"]: "", ["month"]: "" }); // load syudent payment data to redux store
      let yearFiter = {
        student_id: "",
        subject_id: "",
        staff_member_id: "",
        year: "",
        month: "",
        payment_state: null,
      };
      dispatch(getStudentPayments(yearFiter)); // load syudent payment data to redux store
    } else {
      setForm({
        ...form,
        ["year"]: dateObj.getUTCFullYear().toString(),
        ["month"]: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
          new Date()
        ),
      }); // load syudent payment data to redux store
      let yearFiter = {
        student_id: "",
        subject_id: "",
        staff_member_id: "",
        year: dateObj.getUTCFullYear().toString(),
        month: "",
        payment_state: null,
      };
      dispatch(getStudentPayments(yearFiter)); // load syudent payment data to redux store
    }
  };

  const changeFilter = () => {
    console.log(form);
    dispatch(getStudentPayments(form)); // load syudent payment data to redux store
  };
  const resetFilter = () => {
    setForm({
      ...form,
      ["student_id"]: "",
      ["subject_id"]: "",
      ["staff_member_id"]: "",
      ["year"]: dateObj.getUTCFullYear().toString(),
      ["month"]: new Intl.DateTimeFormat("en-US", { month: "long" }).format(
        new Date()
      ),
      ["payment_state"]: null,
    });
  };

  const showActions = (data, record) => {
    return (
      <Space size="middle">
        <Switch
          defaultChecked={data}
          onClick={(e) => {
            onChangePayment(e, record);
          }}
        />
      </Space>
    );
  };

  const handleChangeSelect = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const addNewMonthData = async () => {
    let decodedToken = jwt_decode(getAccessToken());
    let subjectFees = 0;

    studentSubjectData.map((val) => {
      val.subject_details.map((fees) => {
        subjectFees = fees.fees;
      });
      let studentPaymentForm = {
        student_id: val.student_id,
        subject_id: val.subject_id,
        staff_member_id: decodedToken._id,
        year: dateObj.getUTCFullYear().toString(),
        month: month.value,
        PaymentDate: "",
        amount: subjectFees,
        payment_state: false,
      };
      console.log(studentPaymentForm);
      let data = dispatch(addStudentPayment(studentPaymentForm)); // save new student-subject data
    });
    setAddNewModalOpen(false)
  };

  const columns = [
    {
      title: "Student Id",
      dataIndex: "student_details",
      key: "student_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.student_id;
          });
        }
      },
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
      title: "Subject Fees",
      dataIndex: "subject_details",
      key: "subject_details",
      render: (data, record) => {
        if (!data) {
          return "";
        } else {
          return data.map((val, index) => {
            return val.fees;
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
      render: (data, record) => {
        let date = moment(data).format("YYYY-MM-DD");
        if (data == null) {
          return "";
        } else {
          return date;
        }
      },
    },
    {
      title: "Payment Status",
      dataIndex: "payment_state",
      key: "action",
      width: "10%",
      render: (data, record) => {
        return showActions(data, record);
      },
    },
  ];
  return (
    <div className="student-payment">
      <div className="student-payment-wrapper">
        <Modal
          title="Add new month to student payments"
          open={addNewModalOpen}
          onCancel={handleCancelAddNewModal}
          footer={null}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <p style={{ fontSize: 16 }}>Select month :</p>
            <Select
              style={{ width: 200 }}
              className="status-input"
              value={month}
              onChange={(value) => {
                setMonth({ value });
              }}
            >
              {StringConstant.months.map((prop, index) => (
                <Select.Option key={index} value={prop}>
                  {prop}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 30,
            }}
          >
            <Button
              style={{ marginRight: 20 }}
              className="filter-btn"
              variant="contained"
              onClick={addNewMonthData}
            >
              Add
            </Button>
            <Button
              className="cancel-btn"
              variant="contained"
              onClick={handleCancelAddNewModal}
            >
              Cancel
            </Button>
          </div>
        </Modal>
        <div className="student-payment-top">
          <div className="student-payment-top-search">
            <AddBoxIcon
              className="registration-add-Icon"
              onClick={showaddNewModal}
            />
            <Input
              className="registration-search-input"
              placeholder="Search by name"
            />
            <SearchIcon className="registration-search-Icon" onClick={search} />
            <FilterAltIcon
              disabled={true}
              className="registration-filter-Icon"
              onClick={handleFilter}
            />
          </div>
          <div className={"student-payment-top-filter" + filter}>
            <div className="student-payment-top-filter-email">
              <div className="email-lablle">Year</div>
              <Select
                className="email-input"
                value={form.year}
                onChange={(value) => {
                  handleChangeSelect("year", value);
                }}
              >
                {StringConstant.years.map((prop, index) => (
                  <Select.Option key={index} value={prop}>
                    {prop}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="student-payment-top-filter-status">
              <div className="status-lablle">Month</div>
              <Select
                className="status-input"
                value={form.month}
                onChange={(value) => {
                  handleChangeSelect("month", value);
                }}
              >
                {StringConstant.months.map((prop, index) => (
                  <Select.Option key={index} value={prop}>
                    {prop}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="student-payment-top-filter-status">
              <div className="status-lablle">Payment State</div>
              <Select
                className="status-input"
                value={form.payment_state}
                onChange={(value) => {
                  handleChangeSelect("payment_state", value);
                }}
              >
                {StringConstant.payment_state.map((prop, index) => (
                  <Select.Option key={index} value={prop["value"]}>
                    {prop["lable"]}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="student-payment-top-filter-buttons">
              <Button
                className="filter-btn"
                variant="contained"
                onClick={changeFilter}
              >
                Filter
              </Button>
              <Button
                className="cancel-btn"
                variant="contained"
                onClick={resetFilter}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="student-payment-middle">
          <div className="student-payment-middle-middle">
            <div className="student-payment-tbl-title">
              Student Payment Table
            </div>
            <Checkbox
              className="check-box-year"
              onChange={(e) => getAllData(e)}
            >
              Get All
            </Checkbox>
          </div>
          <Table
            className="student-payment-tbl"
            columns={columns}
            dataSource={dataStudentPayments}
            pagination={false}
            size={"small"}
          />
        </div>
        <div className="student-payment-bottom"></div>
      </div>
    </div>
  );
};

export default StudentPayment;
