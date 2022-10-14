import { StringConstant } from "../assets/constants";

import jwtDecode from "jwt-decode";

export function getAccessToken() {
  return localStorage.getItem(StringConstant.TokenAccess);
}

export function setAccessToken(token) {
  localStorage.setItem(StringConstant.TokenAccess, token);
}

export function removeAccessToken() {
  return localStorage.removeItem(StringConstant.TokenAccess);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(StringConstant.TokenAccess);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  setAccessToken,
  removeAccessToken,
  getCurrentUser,
  getAccessToken,
};
