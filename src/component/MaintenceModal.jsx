import { init } from "emailjs-com";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addMaintenanceSuccess,
  fetchMaintenanceFunction,
} from "../redux/maintenanceRedux/action";

function MaintenceModal({ fullName, id }) {
  const dispatch = useDispatch();

  const validate = (values) => {
    const error = {};
    if (!values.currentDate) {
      error.currentDate = "Req";
    }
    return error;
  };

  // Set Current Date State
  const [formState, setFormState] = useState({
    currentDate: "",
  });

  // Static Due Date formate
  const DynamicMonth = new Date().getMonth() + 1;
  const dueDateFormate = new Date(`${DynamicMonth}-09-2022`);
  const finalDueDate = `${dueDateFormate.getDate()}-${
    dueDateFormate.getMonth() + 1
  }-${dueDateFormate.getFullYear()}`;

  // Set Date
  const date1 = new Date(`2022-${DynamicMonth}-09`);
  const date2 = new Date(formState.currentDate);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const crtDate = new Date(`2022-${DynamicMonth}-09`);

  // Set different variables
  const maintenanceAmount = 1800;
  let paneltyCalculation = 0;
  let annualAmt = 0;

  // Check Condition for Date Calculation
  if (crtDate.getDate() <= date2.getDate()) {
    paneltyCalculation = diffDays * 20;
    annualAmt = parseInt(paneltyCalculation) + parseInt(maintenanceAmount);
  } else {
    paneltyCalculation = 0;
    annualAmt = parseInt(maintenanceAmount);
  }

  // handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formState);
    if (formState) {
      dispatch(
        addMaintenanceSuccess(
          id,
          formState,
          fullName,
          maintenanceAmount,
          date1.toLocaleDateString(),
          paneltyCalculation,
          annualAmt
        )
      );
      dispatch(fetchMaintenanceFunction(id));

      setFormState({
        currentDate: "",
      });
    }
  };

  return (
    <>
      {/* ModalBox */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Event Handler
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body pb-0">
              <form onSubmit={handleSubmit}>
                <div className="form-group d-flex justify-content-between">
                  <div className="right-side w-100 mr-1">
                    <div className="form-group  shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Member</label>
                      <h6>{fullName}</h6>
                    </div>
                    <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Date</label>
                      <input
                        type="date"
                        name="currentDate"
                        placeholder="Set Date"
                        className="form-control"
                        onChange={handleChange}
                        value={formState.currentDate}
                        pattern="03/09/2022"
                        required
                      />
                    </div>
                    <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Due Date</label>
                      {/* <h6>{date1.toLocaleDateString()}</h6> */}
                      <h6>{finalDueDate}</h6>
                    </div>
                  </div>
                  <div className="left-side w-100 ml-1">
                    <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Maintenace Amt</label>
                      <h6>{maintenanceAmount}/-</h6>
                    </div>
                    <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Penalty Amt</label>
                      <h6>{paneltyCalculation}/-</h6>
                    </div>
                    <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                      <label>Annual Amt</label>
                      <h6>
                        {annualAmt}
                        /-
                      </h6>
                    </div>
                    <div className=" pb-0">
                      <input
                        type="submit"
                        className="btn btn-primary w-50 float-right"
                        value={"SET"}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MaintenceModal;
