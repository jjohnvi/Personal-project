import axios from "axios";

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: ""
};

const UPDATE_STATE = "UPDATE_STATE";
const RESET_FIELDS = "RESET_FIELDS";

export const updateState = e => {
  return {
    type: UPDATE_STATE,
    payload: e
  };
};

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
    default:
      return state;
  }
}
