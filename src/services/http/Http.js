import axios from "axios";
import { getAccessToken } from "../../config/LocalStorage";
import { message } from "antd";

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
        let errorObj = await setError(err);
        response = { data: errorObj.data, reCall: errorObj.reCall };
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
        let errorObj = await setError(err);
        response = { data: errorObj.data, reCall: errorObj.reCall };
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
        let errorObj = await setError(err);
        response = { data: errorObj.data, reCall: errorObj.reCall };
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
        let errorObj = await setError(err);
        response = { data: errorObj.data, reCall: errorObj.reCall };
      });
    return response;
  },
};

export default http;

async function setError(error) {
  if (!error.response) {
    // network error
    console.log("error at start");
    message.error("Network Error");
  } else {
    const originalRequest = error.config;

    if (error.response.data) {
      if (error.response.data.message != "Failed to authenticate token.") {
        message.error({
          content: error.response.data.message,
          style: {
            marginTop: "10vh",
          },
        });
        let reCall = false,
          data = null;
        console.log(error.response.data.message);
        return { data: data, reCall: reCall };
      }
    } else {
      console.log("error at error.response.statusText");
      message.error({
        content: error.response.data.statusText,
        style: {
          marginTop: "10vh",
        },
      });
    }
    if (error.response.status === 403) {
      console.log("error because not authorized");
      message.error({
        content: ("Not Authorized"),
        style: {
          marginTop: "10vh",
        },
      });
    }
    if (error.response.status === 401 && !getAccessToken()) {
      let reCall = false,
        data = null;
      console.log("error because token not available");
      return { data: data, reCall: reCall };
    }
    // if (
    //   getRefreshToken() &&
    //   error.response.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   let reCall = false,
    //     data = null;
    //   await instance({
    //     method: "GET",
    //     url: "/employee/get_token",
    //     headers: { "x-access-token": getRefreshToken() },
    //   })
    //     .then(async (res) => {
    //       if (res.status === 200) {
    //         setAccessToken(res.data.token);
    //         originalRequest.headers["x-access-token"] = res.data.token;
    //         data = await axios(originalRequest);
    //       }
    //     })
    //     .catch(async (err) => {
    //       removeAccessToken();
    //       removeRefreshToken();
    //       window.history.push("/login");
    //     });
    //   return { data: data, reCall: reCall };
    // }
  }
}
