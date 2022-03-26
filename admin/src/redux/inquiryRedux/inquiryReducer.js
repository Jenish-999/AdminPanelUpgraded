import { inquiryTypes } from "./type";

const initialState = {
  inquiryDetails: {},
  loading: true,
};

export const inquiryReducer = (state = initialState, { type, payload }) => {
  if (type === inquiryTypes.INQUIRY_MEMBERS_DETAILS_SUCCESS) {
    return { ...state, inquiryDetails: payload, loading: false };
  }

  return state;
};
