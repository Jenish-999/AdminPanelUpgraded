import { combineReducers } from "redux";
import { adminReducer } from "./adminRedux/adminReducer";
import { memberReducer } from "./memberRedux/memberReducer";

export const rootReducer = combineReducers({
  adminlog: adminReducer,
  members: memberReducer,
});
