import actionTypes from "../actions/actionTypes";

export default (students = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_students:
      return action.payload;
    case actionTypes.add_student:
      return [...students, action.payload];
    case actionTypes.update_student:
      return students.map((student) =>
        student._id === action.payload._id ? action.payload : student
      );
    case actionTypes.delete_student:
      return students.filter((student) => student._id !== action.payload);
    default:
      return students;
  }
};