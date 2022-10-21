import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/student-payment/";

//Action Creators
export const getStudentPayments = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({
      type: actionTypes.get_all_student_payments,
      payload: data.details,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const addStudentPayment = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "new/add", obj);
    dispatch({ type: actionTypes.add_student_payment, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateStudentPayment = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({
      type: actionTypes.update_student_payment,
      payload: data.details,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteStudentPayment = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_student_payment, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
