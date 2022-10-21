import actionTypes from "../actions/actionTypes";

export default (staffs = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_staffs:
      return action.payload;
    case actionTypes.add_staff:
      return [...staffs, action.payload];
    case actionTypes.update_staff:
      return staffs.map((staff) =>
        staff._id === action.payload._id ? action.payload : staff
      );
    case actionTypes.delete_staff:
      return staffs.filter((staff) => staff._id !== action.payload);
    default:
      return staffs;
  }
};
