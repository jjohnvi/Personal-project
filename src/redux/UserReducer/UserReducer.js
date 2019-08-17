import axios from "axios";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  loading: false,
  userBio: "",
  editUserBio: "",
  userPic: "",
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
const EDIT_USER_BIO = "EDIT_USER_BIO";
const POPULATE_BIO = "POPULATE_BIO";
const HANDLE_BIO_ON_CHANGE = "HANDLE_BIO_ON_CHANGE";

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

export const editUserBio = (username, bio) => {
  return {
    type: EDIT_USER_BIO,
    payload: axios.put(`/api/users/${username}`, { bio })
  };
};

export const populateBio = bio => {
  return {
    type: POPULATE_BIO,
    payload: bio
  };
};

export const handleBioOnChange = bio => {
  return {
    type: HANDLE_BIO_ON_CHANGE,
    payload: bio
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
      return {
        ...state,
        loading: false,
        followingUserId: payload.data[0].user_id
      };
    case `${LOGOUT_USER}_PENDING`:
      return { ...state, loading: true };
    case `${LOGOUT_USER}_FULFILLED`:
      return { ...state, loading: false, user: {} };
    case `${GET_USER_BIO}_PENDING`:
      return { ...state, loading: true, userBio: "", userPic: "" };
    case `${GET_USER_BIO}_FULFILLED`:
      if (!payload.data[0]) return state;
      return {
        ...state,
        loading: false,
        userBio: payload.data[0].bio,
        userPic: payload.data[0].profile_pic
      };

    case `${EDIT_USER_BIO}_PENDING`:
      return { ...state, loading: true };
    case `${EDIT_USER_BIO}_FULFILLED`:
      return { ...state, loading: false };

    case POPULATE_BIO:
      return { ...state, editUserBio: payload };

    case HANDLE_BIO_ON_CHANGE:
      return { ...state, editUserBio: payload };
    default:
      return state;
  }
}
