import { combineReducers } from "redux";

import students from "./studentReducers";
import subjects from "./subjectReducers";
import categories from "./categoriesReducers";

export default combineReducers({
  STUDENTS: students,
  SUBJECTS: subjects,
  CATEGORIES: categories,
});