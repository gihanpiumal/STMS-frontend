import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/student/";

//Action Creators
export const getStudents = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_students, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addStudent = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_subject, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudent = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_student, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStudent = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_student, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
