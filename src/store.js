import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createReducer from "./reducers";

const store = createStore(createReducer(), composeWithDevTools({}));

export default store;
