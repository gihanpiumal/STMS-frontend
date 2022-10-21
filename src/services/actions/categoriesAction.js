import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/category/";

//Action Creators
export const getCategories = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_categories, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addCategory = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL +"new/add", obj);
    dispatch({ type: actionTypes.add_category, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCategory = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_category, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);

    dispatch({ type: actionTypes.delete_category, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
