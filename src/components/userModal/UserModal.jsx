import React from "react";
import moment from "moment";

import "./UserModal.scss";

const UserModal = ({ details }) => {
  return (
    <div className="user-modal">
      <div className="user-modal-wrapper">
        <div className="user-modal-title">User Details</div>
        <div className="user-modal-img">IMAGE</div>
        <div className="user-modal-details">
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Name : </p>
            <p className="user-modal-value">
              {details.first_name + " " + details.last_name}
            </p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Registeration No : </p>
            <p className="user-modal-value">{details.student_id}</p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Date of birth : </p>
            <p className="user-modal-value">
              {moment(details.DOB).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">NIC : </p>
            <p className="user-modal-value">{details.NIC}</p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Phone No : </p>
            <p className="user-modal-value">{details.phone}</p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Email : </p>
            <p className="user-modal-value">{details.email}</p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Access : </p>
            <p className="user-modal-value">{details.access_status}</p>
          </div>
          <div className="user-modal-details-detail">
            <p className="user-modal-topic">Registered Date : </p>
            <p className="user-modal-value">
              {moment(details.registeredDate).format("YYYY-MM-DD")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
