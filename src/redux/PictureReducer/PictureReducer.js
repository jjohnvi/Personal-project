import axios from "axios";

const initialState = {
  imgArr: [],
  image_url: ""
};

const UPLOAD_PIC = "UPLOAD_PIC";

export const uploadPic = profile_pic => {
  return {
    type: UPLOAD_PIC,
    payload: axios.put("/api/users/", { profile_pic })
  };
};

export function pictureReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case UPLOAD_PIC:
      return { ...state, image_url: payload };

    default:
      return state;
  }
}
