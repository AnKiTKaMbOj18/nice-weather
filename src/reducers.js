import { combineReducers } from "redux";
// import todos from './todos'
// import counter from './counter'
// import { TODOS, COUNTER } from './constants';
const TODOS = "TODO_STATE";

export function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

export default function createReducer() {
  return combineReducers({
    [TODOS]: todos
    // [COUNTER]: counter,
  });
}
