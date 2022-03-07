import { FETCH_ALL_MEMBERS, memberTypes } from "./types";

const initialState = {
  addMemberData: {},
  loading: true,
  viewMember: {},
};

export const memberReducer = (state = initialState, { type, payload }) => {
  // if (type === "MEMBERS_ADDED") {
  //   return { ...state, addedMembers: true };
  // }

  if (type === memberTypes.LIST_MEMBER) {
    return { ...state, loading: false, addMemberData: payload };
  }

  if (type === memberTypes.VIEW_MEMBER) {
    return { ...state, loading: false, viewMember: payload };
  }
  if (type === "EMPTY") {
    return { ...state, loading: false, viewMember: {} };
  }

  return state;
};
