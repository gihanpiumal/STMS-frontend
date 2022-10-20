import React from "react";

import "./subjectviewmodal.scss";

const SubjetViewModal = ({ details }) => {
  console.log(details);
  let categoryName = "";
  {
    details.category_details.map((val) => {
      categoryName = val.category_name;
    });
  }

  let teacherName = "";
  {
    details.teacher_details.map((val) => {
      teacherName = val.first_name + " " + val.last_name;
    });
  }

  let hallName = "";
  {
    details.hall_details.map((val) => {
      hallName = val.hall_name;
    });
  }

  return (
    <div className="subject-modal">
      <div className="subject-modal-wrapper">
        <div className="subject-modal-title">Subject Details</div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Subject Name : </p>
            <p className="subject-modal-value">{details.subject_name}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Subject Id : </p>
            <p className="subject-modal-value">{details.subject_id}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Admission : </p>
            <p className="subject-modal-value">
              {details.admition ? "Include" : "Not Incude"}
            </p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Fees : </p>
            <p className="subject-modal-value">{details.fees}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Category Name : </p>
            <p className="subject-modal-value">{categoryName}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Teacher Name : </p>
            <p className="subject-modal-value">{teacherName}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Hall Name : </p>
            <p className="subject-modal-value">{hallName}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Class Date : </p>
            <p className="subject-modal-value">{details.classDate}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">Start Time : </p>
            <p className="subject-modal-value">{details.startTime}</p>
          </div>
        </div>
        <div className="subject-modal-details">
          <div className="subject-modal-details-detail">
            <p className="subject-modal-topic">End Time : </p>
            <p className="subject-modal-value">{details.endTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjetViewModal;
