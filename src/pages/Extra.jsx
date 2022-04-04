import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Extra() {
  const dispatch = useDispatch();
  //   const viewMember = useSelector((state) => state.members.viewMember);

  useEffect(() => {
    fetch(
      `https://jenishdemosocmember-default-rtdb.firebaseio.com/maintenance/2022.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((reps) => reps.json())
      .then((result) => {
        console.log(result);
        // Object.keys(result).map((id, indx) => {
        //   let allKeyValues = Object.keys(result[id]);
        //   let sameKeyValues = allKeyValues.filter(
        //     (items) => items === "Wn3ZnzWcjAcPZ4MHekDtMN72Dgs2"
        //   );
        //   console.log("SameKeyValues : ", sameKeyValues);
        // });
      });
  }, []);

  return <div>Extra</div>;
}

export default Extra;
