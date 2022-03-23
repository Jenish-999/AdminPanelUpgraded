import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styled from "styled-components";
import pexelImg1 from "../assets/img/customImgs/pexelImg1.jpg";
import {
  noticeDeleteNoticeDisplay,
  noticeDisplaySuccessSendFunction,
  noticeSuccessDeleteFunction,
  noticeSuccessFunction,
  noticeSuccessSendFunction,
  noticeSuccessStorageFunction,
  singleNoticeStorageFunction,
} from "../redux/noticeRedux/action";

function EventNoticeComponent() {
  const noticeDataStorage = useSelector(
    (state) => state.notice.noticeDataStorage
  );
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = [];
    if (!values.description) {
      errors.description = "Req";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log({ values, isActive: false });
      const attachedValues = { values, isActive: false };
      if (attachedValues) {
        dispatch(noticeSuccessSendFunction(attachedValues));
        resetForm(values);
        dispatch(noticeSuccessStorageFunction());
      }
    },
  });

  const handleDelete = (id) => {
    const con = confirm("Are you sure ?");
    if (id) {
      if (con) {
        console.log("Hello I am delete");
        console.log("ID", id);
        dispatch(noticeSuccessDeleteFunction(id));
        dispatch(noticeDeleteNoticeDisplay(id));
        dispatch(noticeSuccessStorageFunction());
      }
    }
  };

  useEffect(() => {
    dispatch(noticeSuccessStorageFunction());
  }, []);

  const handleCheckbox = (e, id) => {
    console.log(e, id);
    if (e === true) {
      console.log("Redirect to other Page");
      dispatch(singleNoticeStorageFunction(e, id));
    } else {
      console.log("No");
      // dispatch(noticeDeleteNoticeDisplay(id));
    }
  };

  // const [ischecked, setIsChecked] = useState(true);
  console.log("SOME KNKDJNKJN : : : ", noticeDataStorage);

  return (
    <>
      <MainContainer className="container-fluid my-2 py-4 float-left">
        <Calendar>
          <div
            className="icon cursor-pointer icon-lg float-right icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n5 "
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <i className="material-icons opacity-10">book</i>
          </div>
          <h3 className="text-secondary">Notice Board</h3>

          {Object.keys(noticeDataStorage).map((id, indx) => {
            return (
              <a className="event clearfix" key={id}>
                <div className="event_icon">
                  {/* <div className="event_month">Jan</div> */}
                  <div className="event_day" onClick={() => handleDelete(id)}>
                    {indx + 1}
                  </div>
                </div>

                <div className="event_title">
                  <div className="event_title_flex  ">
                    {/* <p>Subject : Members Meeting</p> */}
                    <p>{noticeDataStorage[id].values.description}</p>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                      name="switching"
                      // checked={ischecked ? "checked" : ""}
                      onClick={(e) => handleCheckbox(e.target.checked, id)}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </Calendar>
      </MainContainer>
      {/* ModalBox */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Notice Handler
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
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  {/* <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                    <input
                      type="date"
                      name="eventDate"
                      className="form-control"
                    />
                  </div>*/}

                  <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                    <textarea
                      type="text"
                      className="form-control p-1"
                      style={{
                        resize: "none",
                      }}
                      name="description"
                      placeholder="Set your Notice"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                    ></textarea>
                    {formik.touched.description && formik.errors.description ? (
                      <small className="form-text text-muted p-1">
                        {formik.errors.description}
                        {/* <i className="fa fa-exclamation-circle"></i> */}
                      </small>
                    ) : null}
                  </div>

                  <div className="modal-footer pb-0">
                    <button
                      type="submit"
                      className="btn btn-success  float-right"
                      // onClick={handleSubmit}
                    >
                      Set
                    </button>
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

const MainContainer = Styled.div`

`;

const Calendar = Styled.div`
  min-width: 350px;
  margin: 1em auto;
  padding: 1em;
  font-family: arial, helvetica, san-serif;
  box-shadow: 0 0 0.1em rgba(0, 0, 0, 0.5);
  border-radius: 0.2em;
  

  :last-child {
      border-top: 6px solid #5AB15E;
  }

  h1 {
    margin: 0 0 0.4em;
    font-weight: bold;
  }

  .event {
    color: rgb(255 255 255);
    display: block; 
    padding: 0.3em;
    border-radius: 3px;
    transition: all 0.25s ease;
    margin-bottom: 0.5em;

    :hover {
    background: #67e61228;
      text-decoration: none;
      color: black;
      .event_day{
        color: black;
      }
      .event_title{
        color: #333;
      }
    }

  }

  .event_icon {
    width: 3em;
    float: left;
    margin-right: 0.75em;
  }

  .event_month,
  .event_day {
  text-align: center;
}

.event_month {
  padding: 0.1em;
  margin-bottom: 0.15em;
  background: #33700b;
  font-size: 0.75em;
  color: white;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.event_day {
  border: 1px solid #999;
  border-radius: 50%;
  background: rgb(255 255 255 / 23%);
  color: #000;    
  font-size: 1.25em;
  // font-weight: bold;
  border-bottom-left-radius: 0.1em;
  border-bottom-right-radius: 0.1em;
  position:relative;
    

}
.event_day:hover::after{
  content: "Del";
  width: 100%;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  color: #222;
  display: block;
  text-align: center;
  position: absolute;
  top:0;
  left:0;

}

.event_title {
  font-size: 1.1em;
  height: 4em;
//   display: table-cell;
//   vertical-align: middle;
    display: flex;
    justify-content : space-between;

.event_title_flex{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;    
}



}

.btn {
  margin-top: 0.5em;
  width: 100%;
  font-size: 11px;
  background-color: rgb(255 255 255 / 0%);
}


`;

export default EventNoticeComponent;
