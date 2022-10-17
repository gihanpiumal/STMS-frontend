import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/student-subject/";

//Action Creators
export const getStudentSubjects = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({
      type: actionTypes.get_all_student_subjects,
      payload: data.details,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addStudentSubjects = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_student_subject, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudentSubjects = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_student_subject, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// export const deleteUser = (id) => async (dispatch) => {
//   console.log("1st");
//   try {
//     console.log(id);
//     const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
//     console.log(data);
//     dispatch({ type: actionTypes.delete_user, payload: id });
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
