const initialState = {
  modalIsOpen: false,
  id: null,
  image_url: "",
  title: "",
  content: "",
  searchQuery: "",
  isEditing: false,
  pictures: []
};

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const POPULATE_MODAL = "POPULATE_MODAL";
const HANDLE_CHANGE = "HANDLE_CHANGE";
const RESET_INPUT = "RESET_INPUT";
const SET_EDIT = "SET_EDIT";
const UPDATE_IMG_URL = "UPDATE_IMG_URL";
const SEARCH_PICS = "SEARCH_PICS";

export const openModal = () => {
  return {
    type: OPEN_MODAL
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

export const populateModal = (id, image_url, content, title, searchQuery) => {
  return {
    type: POPULATE_MODAL,
    payload: { id, image_url, title, content }
  };
};

export const updateImgUrl = val => {
  return {
    type: UPDATE_IMG_URL,
    payload: val
  };
};

export const handleChange = e => {
  return {
    type: HANDLE_CHANGE,
    payload: e
  };
};

export const resetInput = () => {
  return {
    type: RESET_INPUT
  };
};

export const setEdit = isEditing => {
  return {
    type: SET_EDIT,
    payload: isEditing
  };
};

export const searchPics = arrayOfPics => {
  return {
    type: SEARCH_PICS,
    payload: arrayOfPics
  };
};

export function modalReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_MODAL:
      console.log(type);
      return { ...state, modalIsOpen: true };

    case CLOSE_MODAL:
      return { ...state, modalIsOpen: false };

    case POPULATE_MODAL:
      return {
        ...state,
        id: payload.id,
        image_url: payload.image_url,
        title: payload.title,
        content: payload.content,
        searchQuery: ""
      };

    case HANDLE_CHANGE:
      return { ...state, ...payload };

    case RESET_INPUT:
      return {
        ...state,
        image_url: "",
        title: "",
        content: "",
        searchQuery: "",
        pictures: []
      };

    case SET_EDIT:
      return { ...state, isEditing: payload };

    case UPDATE_IMG_URL:
      return { ...state, image_url: payload };

    case SEARCH_PICS:
      return { ...state, pictures: payload };

    default:
      return state;
  }
}
