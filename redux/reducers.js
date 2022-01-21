import * as t from "./types";

const initialState = {
  books: [],
  categorys: [],
  loading: false,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_BOOKS:
      return { ...state, books: action.payload };
    case t.GET_CATEGORYS:
      return { ...state, categorys: action.payload };
    case t.LOADING_ON:
      return { ...state, loading: true };
    case t.LOADING_OFF:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export { booksReducer };
