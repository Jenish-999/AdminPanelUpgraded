import { FETCH_ALL_MEMBERS, memberTypes } from "./types";

const initialState = {
  addMemberData: {},
  loading: true,
  viewMember: {},
  routing: "",
};

export const memberReducer = (
  state = initialState,
  { type, payload, route }
) => {
  // if (type === "MEMBERS_ADDED") {
  //   return { ...state,  };
  // }

  if (type === memberTypes.LIST_MEMBER) {
    return {
      ...state,
      loading: false,
      addMemberData: payload,
      routing: route,
    };
  }

  if (type === memberTypes.VIEW_MEMBER) {
    return { ...state, loading: false, viewMember: payload };
  }
  if (type === "EMPTY") {
    return { ...state, loading: false, viewMember: {} };
  }

  if (type === memberTypes.MEMBER_ID_TOKEN) {
    return { ...state, memberIdToken: payload };
  }

  if (type === "ROUTE_NULL") {
    return { ...state, routing: "" };
  }

  return state;
};
