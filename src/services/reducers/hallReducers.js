import actionTypes from "../actions/actionTypes";

export default (halls = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_halls:
      return action.payload;
    case actionTypes.add_hall:
      return [...halls, action.payload];
    case actionTypes.update_hall:
      return halls.map((hall) =>
        hall._id === action.payload._id ? action.payload : hall
      );
    case actionTypes.delete_hall:
      return halls.filter((hall) => hall._id !== action.payload);
    default:
      return halls;
  }
};
