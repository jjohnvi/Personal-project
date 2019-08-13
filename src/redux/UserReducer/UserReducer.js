import axios from "axios";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  loading: false,
  userBio: "",
  user: {},
  followingUserId: null
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELDS = "RESET_FIELDS";
const LOGIN_USER = "LOGIN_USER";
const CHECK_USER_LOGGED_IN = "CHECK_USER_LOGGED_IN";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER_ID = "GET_USER_ID";
const GET_USER_BIO = "GET_USER_BIO";

export const updateState = e => {
  return {
    type: UPDATE_STATE,
    payload: e
  };
};

export const checkUserLoggedIn = () => {
  return {
    type: CHECK_USER_LOGGED_IN,
    payload: axios.get("/auth/user")
  };
};

export const loginUser = (username, password) => {
  return {
    type: LOGIN_USER,
    payload: axios.post("/auth/login", {
      username: username,
      password: password
    })
  };
};

export const getUserId = username => {
  return {
    type: GET_USER_ID,
    payload: axios.get(`/api/users/${username}`)
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    payload: axios.get("/auth/logout")
  };
};

export const resetFields = () => {
  return {
    type: RESET_FIELDS
  };
};

export const getUserBio = username => {
  return {
    type: GET_USER_BIO,
    payload: axios.get(`/api/user/${username}`)
  };
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    case RESET_FIELDS:
      return { ...state, ...payload };
    case `${LOGIN_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGIN_USER}_FULFILLED`:
      return { ...state, loading: false, user: payload.data };
    case `${CHECK_USER_LOGGED_IN}_PENDING`:
      return { ...state, loading: true };
    case `${CHECK_USER_LOGGED_IN}_FULFILLED`:
      return { ...state, loading: false, user: payload.data };
    case `${GET_USER_ID}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER_ID}_FULFILLED`:
      return { ...state, loading: false, followingUserId: payload.data };
    case `${LOGOUT_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGOUT_USER}_FULFILLED`:
      return { ...state, loading: false, user: {} };
    case `${GET_USER_BIO}_PENDING`:
      return { ...state, loading: true, userBio: "" };
    case `${GET_USER_BIO}_FULFILLED`:
      console.log(payload.data);
      if (!payload.data[0]) return { ...state };
      return { ...state, loading: false, userBio: payload.data[0].bio };
    default:
      return state;
  }
}
