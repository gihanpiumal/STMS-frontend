import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/staff/";

//Action Creators
export const getStaffs = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_staffs, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addStaff = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_staff, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStaff = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_staff, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStaff = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_staff, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
