import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/teacher/";

//Action Creators
export const getTeachers = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_teachers, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addTeacher = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_teacher, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTeacher = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_teacher, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTeacher = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_teacher, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
