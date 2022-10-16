import actionTypes from "../actions/actionTypes";

export default (subjects = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_subjects:
      return action.payload;
    case actionTypes.add_subject:
      return [...subjects, action.payload];
    case actionTypes.update_subject:
      return subjects.map((subject) =>
        subject._id === action.payload._id ? action.payload : subject
      );
    case actionTypes.delete_subject:
      return subjects.filter((subject) => subject._id !== action.payload);
    default:
      return subjects;
  }
};