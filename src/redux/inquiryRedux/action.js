import { inquiryTypes } from "./type";

export const inquiryMemberDetailsAction = (data) => {
  return {
    type: inquiryTypes.INQUIRY_MEMBERS_DETAILS_SUCCESS,
    payload: data,
  };
};

// inquiryMemberDetailsFunction
export const inquiryMemberDetailsFunction = () => {
  return (dispatch) => {
    fetch("https://jenishsocinquiry-default-rtdb.firebaseio.com/inquiry.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("ALL DATA", data);
        dispatch(inquiryMemberDetailsAction(data));
      });
  };
};
