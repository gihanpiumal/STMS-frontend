import actionTypes from "../actions/actionTypes";

export default (categories = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_categories:
      return action.payload;
    case actionTypes.add_category:
      return [...categories, action.payload];
    case actionTypes.update_category:
      return categories.map((category) =>
        category._id === action.payload._id ? action.payload : category
      );
    case actionTypes.delete_category:
      return categories.filter((category) => category._id !== action.payload);
    default:
      return categories;
  }
};