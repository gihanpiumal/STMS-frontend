import { combineReducers } from "redux";

import students from "./studentReducers";
// import posts from "./postReducers";

export default combineReducers({
  STUDENTS: students,
//   POSTS: posts,
});