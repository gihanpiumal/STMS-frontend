import { combineReducers } from "redux";

import students from "./studentReducers";
import subjects from "./subjectReducers";
import categories from "./categoriesReducers";
import studentSubjects from "./studentSubjectReducer";
import teachers from "./teacherReducers";
import staffs from "./staffReducers";
import halls from "./hallReducers";
import extraClasses from "./extraClassesReducers";
import studentPayments from "./studentPaymentReducers";

export default combineReducers({
  STUDENTS: students,
  SUBJECTS: subjects,
  CATEGORIES: categories,
  STUDENT_SUBJECTS: studentSubjects,
  TEACHERS: teachers,
  STAFFS: staffs,
  HALLS: halls,
  EXTRA_CLASSES: extraClasses,
  STUDENT_PAYMENT: studentPayments,
});
