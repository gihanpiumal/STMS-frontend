import axios from "axios";
import { getAccessToken } from "../../config/LocalStorage";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const http = {
  login_Registration_Data: async function (url, data) {
    let response;
    await instance({
      method: "POST",
      url: url,
      data: data,
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },

  getData: async function (url, parm) {
    let response;
    await instance({
      method: "GET",
      url: url,
      params: parm,
      headers: { "x-access-token": getAccessToken() },
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },

  postData: async function (url, data) {
    let response;
    await instance({
      method: "POST",
      headers: { "x-access-token": getAccessToken() },
      url: url,
      data: data,
      // params: parm,
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },

  putData: async function (url, data) {
    let response;
    await instance({
      method: "PUT",
      headers: { "x-access-token": getAccessToken() },
      url: url,
      data: data,
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },

  deleteData: async function (url, data) {
    let response;
    await instance({
      method: "DELETE",
      headers: { "x-access-token": getAccessToken() },
      url: url,
      data: data,
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },
};

export default http;
