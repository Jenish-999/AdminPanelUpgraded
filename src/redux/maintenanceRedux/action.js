import { toast } from "react-toastify";
import { types } from "./types";

// Action
export const addMaintenance = (data) => {
  return {
    type: types.MAINTENANCE_ADD_SUCCESS,
    payload: data,
  };
};

export const storageMembersMaintenance = (data) => {
  return {
    type: types.MAINTENANCE_FETCH_SUCCESS,
    payload: data,
  };
};

// Functions
// add maintenance
export const addMaintenanceSuccess = (
  id,
  values,
  fullName,
  maintenanceAmount,
  due_date,
  paneltyCalculation,
  annualAmt
) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  console.log(year, month);

  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/maintenance/${year}/${id}/${month}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          memberName: fullName,
          amount: maintenanceAmount,
          dueDate: due_date,
          panelty: paneltyCalculation,
          annualAmt: annualAmt,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        console.log("Result for Maintenance : ", result);
        if (result) {
          toast.success("Maintenance Added");
          dispatch(fetchMaintenanceFunction());
        }
      })
      .catch((err) => {
        console.log("Error in Maintenance : ", err);
        toast.error("Maintenance Error");
      });
  };
};

// fetch maintenance details
export const fetchMaintenanceFunction = (id) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  console.log(year, month);
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/maintenance/${year}/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data) {
          console.log("Maintenance Data 1: ", data);
          dispatch(storageMembersMaintenance(data));
        }
      })
      .catch((err) => {
        console.log("Error Data : ", err);
      });
  };
};
