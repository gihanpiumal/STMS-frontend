import actionTypes from "./actionTypes";
import { httpCollection } from "../http";

const subURL = "/extra-class-request/";

//Action Creators
export const getExtraClasses = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_extra_classes, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

  export const addExtraClasse = (obj) => async (dispatch) => {
    try {
      const { data } = await httpCollection.postData(subURL +"new/add", obj);
      dispatch({ type: actionTypes.add_extra_classe, payload: data.details });
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateExtraClasse = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_extra_classe, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteExtraClasse = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_extra_classe, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
