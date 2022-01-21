import { dispatch } from "./store";
import * as t from "./types";

const get_books = (data) => {
  dispatch({ type: t.GET_BOOKS, payload: data });
};
const get_categorys = (data) => {
  dispatch({ type: t.GET_CATEGORYS, payload: data });
};
const loading_on = () => {
  dispatch({ type: t.LOADING_ON });
};
const loading_off = () => {
  dispatch({ type: t.LOADING_OFF });
};
export { get_books, get_categorys, loading_on, loading_off };
