import axios from "axios";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: ""
};

const UPDATE_STATE = "UPDATE_STATE";
// const UPDATE_USERNAME = "UPDATE_USERNAME";
// const UPDATE_FIRSTNAME = "UPDATE_FIRSTNAME";
// const UPDATE_LASTNAME = "UPDATE_LASTNAME";
// const UPDATE_PASSWORD = "UPDATE_PASSWORD";
const RESET_FIELDS = "RESET_FIELDS";

export const updateState = e => {
  return {
    type: UPDATE_STATE,
    payload: e
  };
};

// export const updateFirstName = value => {
//   return {
//     type: UPDATE_FIRSTNAME,
//     payload: value
//   };
// };

// export const updateLastName = value => {
//   return {
//     type: UPDATE_LASTNAME,
//     payload: value
//   };
// };

// export const updatePassword = value => {
//   return {
//     type: UPDATE_PASSWORD,
//     payload: value
//   };
// };

export const resetFields = () => {
  return {
    type: RESET_FIELDS
  };
};

export function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATE:
      return { ...state, ...payload };
    // case UPDATE_FIRSTNAME:
    //   return { ...state, firstname: payload };
    // case UPDATE_LASTNAME:
    //   return { ...state, lastname: payload };
    // case UPDATE_PASSWORD:
    //   return { ...state, password: payload };
    default:
      return state;
  }
}
