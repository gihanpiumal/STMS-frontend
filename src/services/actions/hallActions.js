import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/hall/";

//Action Creators
export const getHalls = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_halls, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

export const addHall = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_hall, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHall = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_hall, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHall = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_hall, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
