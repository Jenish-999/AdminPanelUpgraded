import React, { useEffect } from "react";
import pexelImg1 from "../assets/img/customImgs/pexelImg1.jpg";
import Breadcrumb from "../component/Breadcrumb";
import Wrapper from "../component/Wapper";
import Footer from "./Footer";
import Styled from "styled-components";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import {
  eventDeleteSucess,
  eventReceiveFunction,
  eventSuccessFunction,
} from "../redux/eventRedux/action";

function Events() {
  const dispatch = useDispatch();

  // formik validations
  const validate = (values) => {
    const errors = {};
    if (!values.eventDate) {
      errors.eventDate = "Select Date";
    }

    if (!values.description) {
      errors.description = "Set event";
    }

    if (!values.subject) {
      errors.subject = "Set Subject";
    }

    return errors;
  };

  // formik form handling
  const formik = useFormik({
    initialValues: {
      eventDate: "",
      description: "",
      subject: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (values && values !== "") {
        // console.log("Values are : ", values);
        dispatch(eventSuccessFunction(values));
        resetForm(values);
        dispatch(eventReceiveFunction());
      }
    },
  });

  const eventStorage = useSelector((state) => state.events.eventStorage);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    dispatch(eventReceiveFunction());
    // console.log("EventStorage", eventStorage);
  }, []);

  const handleDelete = (id) => {
    const con = Window.confirm("Are you Sure you want to delete ?");
    if (con) {
      // console.log("ID to Delete : ", id);
      dispatch(eventDeleteSucess(id));
      dispatch(eventReceiveFunction());
    } else {
      // console.log("No Id");
    }
  };

  return (
    <>
      <Wrapper>
        <main className="main-content position-relative max-height-vh-100 h-100  ">
          <Breadcrumb PagesText="Events" />

          <MainContainer className="container-fluid my-2 py-4 float-left">
            <Calendar>
              <div
                className="icon cursor-pointer icon-lg float-right icon-shape bg-gradient-warning shadow-warning text-center border-radius-xl mt-n5 "
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                <i className="material-icons opacity-10">event_note</i>
              </div>
              <h3>Event Calendar</h3>

              {eventStorage && eventStorage !== ""
                ? Object.keys(eventStorage).map((id, index) => {
                    var d = new Date(eventStorage[id].eventDate);
                    var dateNum = d.getDate();
                    var monthName = months[d.getMonth()]; // "July" (or current month)
                    return (
                      <a className="event clearfix" key={id}>
                        <div className="event_icon">
                          <div className="event_month">{monthName}</div>
                          <div
                            className="event_day"
                            onClick={() => handleDelete(id)}
                          >
                            {dateNum}

                            {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
                          </div>
                        </div>

                        <div className="event_title">
                          <p>Subject : {eventStorage[id].subject}</p>
                          {eventStorage[id].description}
                        </div>
                      </a>
                    );
                  })
                : ""}

              <div className="btn btn-danger">See All Events</div>
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
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                        <input
                          type="date"
                          name="eventDate"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.eventDate}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.eventDate && formik.errors.eventDate ? (
                          <small className="form-text shadow-lg p-1 mb-1  rounded p-1 bg-danger text-light">
                            {formik.errors.description}
                            {/* <i className="fa fa-exclamation-circle"></i> */}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Set Subject"
                          className="form-control"
                          onChange={formik.handleChange}
                          value={formik.values.subject}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.subject && formik.errors.subject ? (
                          <small className="form-text shadow-lg p-1 mb-1  rounded p-1 bg-danger text-light">
                            {formik.errors.subject}
                            {/* <i className="fa fa-exclamation-circle"></i> */}
                          </small>
                        ) : null}
                      </div>
                      <div className="form-group shadow-lg p-1 mb-5 bg-body rounded">
                        <textarea
                          type="text"
                          className="form-control p-1"
                          style={{
                            resize: "none",
                          }}
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          onBlur={formik.handleBlur}
                          placeholder="Set upcoming events"
                        ></textarea>
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <small className="form-text shadow-lg p-1 mb-1  rounded p-1 bg-danger text-light">
                            {formik.errors.description}
                            {/* <i className="fa fa-exclamation-circle"></i> */}
                          </small>
                        ) : null}
                      </div>

                      <div className="modal-footer pb-0">
                        <button
                          type="submit"
                          className="btn btn-primary  float-right"
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

          <Footer />
        </main>
      </Wrapper>
    </>
  );
}

const MainContainer = Styled.div`
// background: url("https://media.istockphoto.com/photos/black-dark-background-picture-id155793519?k=20&m=155793519&s=170667a&w=0&h=OoEjpqYs1lbsQ7NglJ2VcghYxpu2-3bGFGRp3wneMoY=");
background: url(${pexelImg1});
height:100vh;
width:100%;
background-size: cover;
background-position: center;
background-repeat: no-repeat; 

`;

const Calendar = Styled.div`
min-width: 350px;
  margin: 1em auto;
  padding: 1em;
  background: rgb(238 238 238 / 9%);
  font-family: arial, helvetica, san-serif;
  box-shadow: 0 0 0.1em rgba(0, 0, 0, 0.5);
  border-radius: 0.2em;

  :last-child {
    border-top: 6px solid red;
  }

  h1 {
    margin: 0 0 0.4em;
    font-weight: bold;
  }

  .event {
    color: rgb(255 255 255);
    display: block;
    padding: 0.2em;
    border-radius: 3px;
    transition: all 0.25s ease;
    margin-bottom: 0.5em;

    :hover {
      background: #d5d5d5;
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
  background: #c00000;
  font-size: 0.75em;
  color: white;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.event_day {
  border: 1px solid #999;
  background: rgb(255 255 255 / 23%);
  color: rgb(255 255 255);
  font-size: 1.25em;
  font-weight: bold;
  border-bottom-left-radius: 0.1em;
  border-bottom-right-radius: 0.1em;
  position:relative;
    

}
.event_day:hover::after{
  content: "Del";
  width: 100%;
  cursor: pointer;
  background-color: #fff;
  color: #222;
  display: block;
  text-align: center;
  position: absolute;
  top:0;
  left:0;

}

.event_title {
  font-size: 1.1em;
  height: 3em;
  display: table-cell;
  vertical-align: middle;
}

.btn {
  margin-top: 0.5em;
  width: 100%;
  font-size: 11px;
  background-color: rgb(255 255 255 / 0%);
}


`;

export default Events;
