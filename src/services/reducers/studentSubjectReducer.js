import actionTypes from "../actions/actionTypes";

export default (studentSubjects = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_student_subjects:
      return action.payload;
    case actionTypes.add_student_subject:
      return [...studentSubjects, action.payload];
    case actionTypes.update_student_subject:
      return studentSubjects.map((studentStbject) =>
        studentStbject._id === action.payload._id
          ? action.payload
          : studentStbject
      );
    case actionTypes.delete_student_subject:
      return studentSubjects.filter(
        (studentStbject) => studentStbject._id !== action.payload
      );
    default:
      return studentSubjects;
  }
};
