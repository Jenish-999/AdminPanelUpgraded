import { memberTypes } from "./types";

// Adding Members
export const addMembers = () => {
  return {
    type: memberTypes.ADD_MEMBER,
  };
};

// const fetchAllMember = () => {
//   return {
//     type: FETCH_ALL_MEMBERS,
//   };
// };

// // fetch all members
// export const fetchAllMemberFunction = () => {
//   return (dispatch) => {
//     fetch(
//       "https://jenishdemosocmember-default-rtdb.firebaseio.com/members.json"
//     ).then((resp) =>
//       resp.json().then((data) => dispatch(fetchAllMember(data)))
//     );
//   };
// };

// List Members
export const listMembers = (data) => {
  return {
    type: memberTypes.LIST_MEMBER,
    payload: data,
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
          ).then((resp) => dispatch(listmemberFunction()));
        }
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
        dispatch(listMembers(data));
      });
  };
};

// Delete Member Function
export const deleteMemberFunction = (id) => {
  return (dispatch) => {
    const resp = fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/members/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
        dispatch(viewMember(data));
      });
  };
};
