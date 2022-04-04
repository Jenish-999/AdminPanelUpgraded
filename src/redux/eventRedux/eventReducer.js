import { eventTypes } from "./type";

const initialState = {
  eventStorage: {},
  loading: false,
};

export const eventReducer = (state = initialState, { type, payload }) => {
  if (type === eventTypes.EVENT_RECEIVE_SUCCESS) {
    return { ...state, loading: true, eventStorage: payload };
  }

  return state;
};
