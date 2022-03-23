import { combineReducers } from "redux";
import { adminReducer } from "./adminRedux/adminReducer";
import { eventReducer } from "./eventRedux/eventReducer";
import { inquiryReducer } from "./inquiryRedux/inquiryReducer";
import { memberReducer } from "./memberRedux/memberReducer";
import { noticeReducer } from "./noticeRedux/noticeReducer";

export const rootReducer = combineReducers({
  adminlog: adminReducer,
  members: memberReducer,
  inquiry: inquiryReducer,
  events: eventReducer,
  notice: noticeReducer,
});
