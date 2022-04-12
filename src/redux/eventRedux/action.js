import { toast } from "react-toastify";
import { eventTypes } from "./type";

export const eventReceiveAction = (result) => {
  return {
    type: eventTypes.EVENT_RECEIVE_SUCCESS,
    payload: result,
  };
};

// storing event data
export const eventSuccessFunction = (values) => {
  return (dispatch) => {
    fetch(`https://membersocevents-default-rtdb.firebaseio.com/events.json`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("Result of Data Submitted", result);
        toast.success("Event Set");
      })
      .catch((err) => {
        toast.error("Event could not be Set");
      });
  };
};

// receving event data
export const eventReceiveFunction = () => {
  return (dispatch) => {
    fetch(`https://membersocevents-default-rtdb.firebaseio.com/events.json`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("Event Data", result);
        dispatch(eventReceiveAction(result));
      })
      .catch((err) => {
        toast.error("Event could'nt received");
      });
  };
};

// Deleting event data
export const eventDeleteSucess = (id) => {
  return (dispatch) => {
    fetch(
      `https://membersocevents-default-rtdb.firebaseio.com/events/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("Result : ", result);
        toast.success("Event Deleted!");
        eventReceiveFunction();
      })
      .catch((err) => {
        toast.error("Event Deletion has some problem");
      });
  };
};
