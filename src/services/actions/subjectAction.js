import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/subject/";

//Action Creators
export const getSubjects = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_subjects, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

  export const addSubject = (obj) => async (dispatch) => {
    try {
      const { data } = await httpCollection.postData(subURL +"new/add", obj);
      dispatch({ type: actionTypes.add_subject, payload: data.details });
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateSubject = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_subject, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSubject = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_subject, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
