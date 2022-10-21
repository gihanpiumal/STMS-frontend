import actionTypes from "../actions/actionTypes";

export default (extraClasses = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_extra_classes:
      return action.payload;
    case actionTypes.add_extra_classe:
      return [...extraClasses, action.payload];
    case actionTypes.update_extra_classe:
      return extraClasses.map((extraClass) =>
        extraClass._id === action.payload._id ? action.payload : extraClass
      );
    case actionTypes.delete_extra_classe:
      return extraClasses.filter(
        (extraClass) => extraClass._id !== action.payload
      );
    default:
      return extraClasses;
  }
};
