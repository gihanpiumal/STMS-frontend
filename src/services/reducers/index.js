import { combineReducers } from "redux";

import students from "./studentReducers";
import subjects from "./subjectReducers";
import categories from "./categoriesReducers";
import studentSubjects from "./studentSubjectReducer";

export default combineReducers({
  STUDENTS: students,
  SUBJECTS: subjects,
  CATEGORIES: categories,
  STUDENT_SUBJECTS: studentSubjects,
});