import { types } from "./types";

const initState = {
  addMaintenanceStorage: {},
  modalFormValue: {
    firstName: "",
  },
};

export const maintenanceReducer = (state = initState, { type, payload }) => {
  if (type === "SET_MODAL_NAME") {
    return {
      ...state,
      modalFormValue: { ...state.modalFormValue, firstName: payload },
    };
  }
  if (type === types.MAINTENANCE_FETCH_SUCCESS) {
    return {
      ...state,
      addMaintenanceStorage: payload,
    };
  }
  if (type === "EMPTY_DATA_MAINTENANCE") {
    return {
      ...state,
      addMaintenanceStorage: {},
    };
  }
  return state;
};
