import { toast } from "react-toastify";
import { memberTypes } from "./types";

// Adding Members
export const addMembers = () => {
  return {
    type: memberTypes.ADD_MEMBER,
  };
};

// List Members
export const listMembers = (data) => {
  return {
    type: memberTypes.LIST_MEMBER,
    payload: data,
    route: "/",
  };
};

// Delete Members
export const deleteMember = () => {
  return {
    type: memberTypes.DELETE_MEMBER,
  };
};

// View Members
export const viewMember = (data) => {
  return {
    type: memberTypes.VIEW_MEMBER,
    payload: data,
  };
};

// Add member Function
export const addMemberFunction = (values) => {
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhl3gYN-odPF7eQs1elOTJaFZrEQ2HP34",
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.error) {
          console.log("Err", error);
          toast.error("Invalid Member");
        }

        if (data.localId) {
          fetch(
            `https://jenishdemosocmember-default-rtdb.firebaseio.com/members/${data.localId}.json`,
            {
              method: "PUT",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            }
            // ).then((resp) => dispatch(listmemberFunction()));
          )
            .then((resp) => resp.json())
            .then((data) => {
              console.log("Add Member Data HERE", data);
              dispatch(listmemberFunction());
              toast.success("Member Set");
              // dispatch(MemberIdToken(idToken));
            });
        }
      })
      .catch((err) => {
        console.log("Err", err);
        toast.error("Invalid Member");
      });
  };
};

// List member Function
export const listmemberFunction = () => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/members.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("ALL DATA Avab", data);
        dispatch(listMembers(data));
      });
  };
};

// Delete Member Function
export const deleteMemberFunction = (id, value) => {
  // let value = { email, password };
  console.log(value);
  // console.log(memberIdToken);
  return (dispatch) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhl3gYN-odPF7eQs1elOTJaFZrEQ2HP34",
      {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("LOCAL DATA", data);
        if (data.idToken) {
          fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDhl3gYN-odPF7eQs1elOTJaFZrEQ2HP34`,
            {
              method: "POST",
              body: JSON.stringify({ idToken: data.idToken }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("RAW DATA", data);
              console.log("USER TI DELETE : ", id);
            });
          fetch(
            `https://jenishdemosocmember-default-rtdb.firebaseio.com/members/${data.localId}.json`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      })
      .catch((err) => {
        console.log("This User Can't logIn", err);
      });
  };
};

// View Member Function
export const viewMemberFunction = (id) => {
  return (dispatch) => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/members/${id}.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Particular Member : ", data);
        dispatch(viewMember(data));
      });
  };
};
