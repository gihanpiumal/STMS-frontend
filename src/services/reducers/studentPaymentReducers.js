import actionTypes from "../actions/actionTypes";

export default (studentPayments = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_student_payments:
      return action.payload;
    case actionTypes.add_student_payment:
      return [...studentPayments, action.payload];
    case actionTypes.update_student_payment:
      return studentPayments.map((studentPayment) =>
        studentPayment._id === action.payload._id
          ? action.payload
          : studentPayment
      );
    case actionTypes.delete_student_payment:
      return studentPayments.filter(
        (studentPayment) => studentPayment._id !== action.payload
      );
    default:
      return studentPayments;
  }
};
