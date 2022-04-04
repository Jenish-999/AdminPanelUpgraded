import { types } from "./type";

const initialState = {
  noticeDataStorage: {},
  loading: false,
  singleNoticeStorage: {},
};

export const noticeReducer = (state = initialState, { type, payload }) => {
  if (type === types.NOTICE_SUCCESS) {
    return { ...state, noticeDataStorage: payload };
  }
  if (type === type.NOTICE_FAIL) {
    return { ...state };
  }

  if (type === type.NOTICE_SINGLE_SUCCESS) {
    return { ...state, singleNoticeStorage: payload };
  }

  return state;
};
