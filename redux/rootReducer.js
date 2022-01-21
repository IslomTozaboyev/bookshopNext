import { combineReducers } from "redux";
import { booksReducer } from "./reducers";

const reducer = combineReducers({
  booksReducer,
});

export default reducer;
