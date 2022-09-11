import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { favsReducer } from "./favsReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  searchReducer,
  favsReducer,
  authReducer,
});
