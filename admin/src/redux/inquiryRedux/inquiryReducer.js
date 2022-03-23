import { inquiryTypes } from "./type";

const initialState = {
  inquiryDetails: {},
};

export const inquiryReducer = (state = initialState, { type, payload }) => {
  if (type === inquiryTypes.INQUIRY_MEMBERS_DETAILS_SUCCESS) {
    return { ...state, inquiryDetails: payload };
  }

  return state;
};
