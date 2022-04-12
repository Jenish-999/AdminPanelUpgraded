import { toast } from "react-toastify";
import { types } from "./type";

// Notice Success Action
export const noticesuccessStorageAction = (result) => {
  console.log("Result", result);
  return {
    type: types.NOTICE_SUCCESS,
    payload: result,
  };
};

// --------------------------------------

// Notice Success Send Function
export const noticeSuccessSendFunction = (attachedValues) => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster.json`,
      {
        method: "POST",
        body: JSON.stringify(attachedValues),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("RESULT : ", result);
        if (result) {
          toast.success("Notice Save");
          // dispatch(singleNoticeStorageFunction(attachedValues));
        }
      })
      .catch((err) => {
        // console.log("ERR : ", err);
        toast.error("Notice Error");
      });
  };
};

// -------------------------------------------------
// section which will change the active class from false to true
export const changeNoticeMasterIsActiveFunction = (e, id) => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("My Result From Sctive : ", result);
        const isActive = result.isActive;
        const description = result.description;
        // console.log("Class & Desp : ", isActive, description);
        const newObjectToUpdate = {
          isActive: true,
          description: description,
        };
        // console.log("Final Obj : ", newObjectToUpdate);
        if (result) {
          fetch(
            `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
            {
              method: "PUT",
              body: JSON.stringify(newObjectToUpdate),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((resp) => resp.json())
            .then((respp) => {
              // console.log("Result Version from On ....", respp);
              if (respp) {
                fetch(
                  `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeDisplay/${id}.json`,
                  {
                    method: "PUT",
                    body: JSON.stringify(respp),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((resp) => resp.json())
                  .then((displayResult) => {
                    // console.log("Notice is displaying...");
                    toast.success("Notice is Enable...");
                  })
                  .catch((err) => {
                    // console.log("Notice could'nt be display!!");
                    toast.error("Notice could'nt be display!!");
                  });
              }
            });
        }
      });
  };
};
// section which will change the active class from true to false
export const changeNoticeMasterToFalseFunction = (e, id) => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((mainResult) => {
        // console.log("My Result From Sctive : ", mainResult);
        const isActive = mainResult.isActive;
        const description = mainResult.description;
        // console.log("Class & Desp : ", isActive, description);
        const newObjectToUpdate = {
          isActive: false,
          description: description,
        };
        // console.log("Final Obj : ", newObjectToUpdate);
        if (mainResult) {
          fetch(
            `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
            {
              method: "PUT",
              body: JSON.stringify(newObjectToUpdate),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((resp) => resp.json())
            .then((respp) => {
              // console.log("Result Version from Off ....", respp);
              fetch(
                `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeDisplay/${id}.json`,
                {
                  method: "PUT",
                  body: JSON.stringify(respp),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((resp) => resp.json())
                .then((displayResult) => {
                  // console.log("Notice is displaying...");
                  toast.success("Notice Disabled...");
                })
                .catch((err) => {
                  // console.log("Notice could'nt be display!!");
                  toast.error("Notice could'nt be display!!");
                });
            });
        }
      });
  };
};
// -------------------------------------------------

// Notice Display Data Store on Switch ON
export const noticeDisplaySuccessSendFunction = (e, id, result) => {
  return (dispatch) => {
    if (e === true) {
      fetch(
        `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeDisplay/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(result),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((dispResult) => {
          // console.log("Display Result : ", dispResult);
        })
        .catch((err) => {
          // console.log("Error From Display Result : ", err);
        });
    }
  };
};

// Notice Success Storage Function
export const noticeSuccessStorageFunction = () => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("Data Reterive : ", result);

        dispatch(noticesuccessStorageAction(result));
      });
    // .catch((err) => {
    //   console.log("ERR : ", err);
    //   toast.error("Notice Error");
    // });
  };
};

// Single Notice Storage Function
export const singleNoticeStorageFunction = (e, id) => {
  return (dispatch) => {
    if (e === true) {
      fetch(
        `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((result) => {
          // console.log("UserData :", result);
          const activeVal = result.isActive;
          const desp = result.values.description;
          const updateVersion = {
            activeVal: true,
            desp: desp,
          };
          // console.log(activeVal);
          // console.log(desp);
          // console.log("Obj : ", updateVersion);

          dispatch(noticeDisplaySuccessSendFunction(e, id, result));
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
  };
};

// Notice Success Data Delete Function from Notice Master
export const noticeSuccessDeleteFunction = (id) => {
  return (dispatch) => {
    //Delete data from Notice Master
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeMaster/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          // console.log("Finally data is Deleted : ", result);
          toast.success("Notice Admin Data Deleted");
        }
      })
      .catch((err) => {
        toast.error(err);
      });

    dispatch(noticeDeleteNoticeDisplay(id));
  };
};

// Notice Success Data Delete Function From Notice Display
export const noticeDeleteNoticeDisplay = (id) => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/noticeDisplay/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((noticeDeleteResult) => {
        // console.log("Display Data Deleted : ", noticeDeleteResult);
        toast.success("Notice Data Display Deleted ");
      })
      .catch((err) => {
        toast.error(err);
        // console.Console.log("Error Display Notice Delete", err);
      });
  };
};
