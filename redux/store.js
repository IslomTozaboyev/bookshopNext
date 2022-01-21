import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./rootReducer";
import thunk from "redux-thunk";

const store = createStore(
  reducer /* preloadedState, */,
  composeWithDevTools(applyMiddleware(...[thunk]))
);

export const dispatch = store.dispatch;
export default store;
