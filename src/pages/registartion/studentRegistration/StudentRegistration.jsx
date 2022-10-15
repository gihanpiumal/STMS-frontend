import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./studentregistration.scss";

import { getStudents } from "../../../services/actions/studentAction";

const StudentRegistration = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject_id: "",
    access_status: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents(form)); // load user data to redux store
  }, [dispatch]);

  const dataUser = useSelector((state) => state.STUDENTS); // get current user details from redux store
  console.log(dataUser);

  return <div>StudentRegistration</div>;
};

export default StudentRegistration;
