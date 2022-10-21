import actionTypes from "../actions/actionTypes";

export default (teachers = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_teachers:
      return action.payload;
    case actionTypes.add_teacher:
      return [...teachers, action.payload];
    case actionTypes.update_teacher:
      return teachers.map((teacher) =>
      teacher._id === action.payload._id ? action.payload : teacher
      );
    case actionTypes.delete_teacher:
      return teachers.filter((teacher) => teacher._id !== action.payload);
    default:
      return teachers;
  }
};