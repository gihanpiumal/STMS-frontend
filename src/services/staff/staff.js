import { httpCollection } from "../http";

const subURL = "/staff/";

export default {
  login: async function (params) {
    let { data } = await httpCollection.login_Registration_Data(
      subURL + "login",
      params
    );
    return data;
  },

  registration: async function (params) {
    let { data } = await httpCollection.login_Registration_Data(
      subURL + "new/add",
      params
    );
    return data;
  },

  email_verification: async function (params, id) {
    let { data } = await httpCollection.login_Registration_Data(
      subURL + "email_verification/" + id,
      params
    );
    return data;
  },

  send_otp: async function (params, id) {
    let { data } = await httpCollection.login_Registration_Data(
      subURL + "send_otp/" + id,
      params
    );
    return data;
  },

  reset_password: async function (params) {
    let { data } = await httpCollection.login_Registration_Data(
      subURL + "reset_password/",
      params
    );
    return data;
  },
};
