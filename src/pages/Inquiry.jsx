import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import Footer from "./Footer";
import cardImg from "../assets/img/illustrations/pattern-tree.svg";
import Wrapper from "../component/Wapper";
import { useDispatch, useSelector } from "react-redux";
import { inquiryMemberDetailsFunction } from "../redux/inquiryRedux/action";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
function Inquiry() {
  const inquiryDetails = useSelector((state) => state.inquiry.inquiryDetails);

  const loading = useSelector((state) => state.inquiry.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inquiryMemberDetailsFunction());
  }, []);

  const [fullNameChange, setfullNameChange] = useState({
    fullNameUpdated: "",
    emailUpdated: "",
  });

  const handleNameChange = (fullName, email) => {
    setfullNameChange({
      fullNameUpdated: fullName,
      emailUpdated: email,
    });
    setFieldState({
      emailFieldState: email,
    });
  };

  // state to hold field values
  const [fieldState, setFieldState] = useState({
    messageFieldState: "",
    emailFieldState: "",
  });

  const handleChangeValueFunction = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    // setFieldState({
    //   messageFieldState: e.target.value,
    //   emailFieldState: e.target.value,
    // });
    setFieldState({ ...fieldState, [name]: value });
  };

  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("DATa :  ", fieldState);
    emailjs
      .sendForm(
        // "service_f4arwbe",
        "service_4nccnhy",
        // "template_of7mjgk",
        "template_uno2ibh",
        form.current,
        // "9MBQwbSH7hWNgIvvg"
        "nxVwfZT0zXv_eBHOL"
      )
      .then((result) => {
        // console.log("Res", result);
        toast.success("Email Sent .");
      })
      .catch((err) => {
        // console.log("Fail", err);
        toast.error(err);
      });
    setFieldState({
      messageFieldState: "",
      emailFieldState: "",
    });
  };

  // console.log("Email:", fullNameChange.emailUpdated);

  // const formik = useFormik({
  //   initialValues: {
  //     user_email: user_email,
  //     message: "",
  //   },
  //   // validate,
  //   onSubmit: (values, { resetForm }) => {
  //     console.log("All Values : ", values);
  //     resetForm(values);
  //   },
  // });

  return (
    <>
      {/* <Navbar /> */}
      <Wrapper>
        <main className="main-content position-relative max-height-vh-100  px-3  h-100  ">
          {/* Navbar */}

          <Breadcrumb PagesText="Inquiry" />
          {/* <Headernavbar /> */}
          {/* End Navbar */}

          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-md-12  mb-lg-0 mb-4">
                    <div className="col-12">
                      <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                          <img
                            src={cardImg}
                            className="position-absolute opacity-3 start-0 top-0 w-200 z-index-0 h-100"
                            alt="pattern-tree"
                          />
                          <div className="bg-gradient-dark d-flex justify-content-between shadow-primary border-radius-lg pt-4 pb-3">
                            <div className="div">
                              <h6 className="text-white text-capitalize ps-3">
                                Inquiry Details
                              </h6>
                            </div>
                          </div>
                        </div>

                        <div className="card-body px-0 pb-2">
                          <div className="container-fluid py-4">
                            {loading ? (
                              <div className="container">
                                <div
                                  className="spinner-border bg-dark text-warning p-3"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            ) : (
                              <div className="row mb-5">
                                {inquiryDetails &&
                                inquiryDetails.length !== 0 ? (
                                  Object.keys(inquiryDetails).map(
                                    (id, index) => {
                                      return (
                                        <div
                                          className="col-xl-4 col-sm-6 mb-xl-0 mb-4"
                                          key={id}
                                        >
                                          <div className="card mb-5 h-75">
                                            <div className="card-header p-3 pt-2">
                                              <div
                                                className="icon cursor-pointer icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute"
                                                data-toggle="modal"
                                                data-target="#exampleModalCenter"
                                                onClick={() => {
                                                  handleNameChange(
                                                    inquiryDetails[id].fullName,
                                                    inquiryDetails[id].email
                                                  );
                                                }}
                                              >
                                                <i className="material-icons opacity-10">
                                                  person
                                                </i>
                                                <i className="material-icons opacity-10">
                                                  reply
                                                </i>
                                              </div>
                                              <div className="text-end pt-1">
                                                <div className="d-flex flex-column justify-content-center">
                                                  <h6 className="mb-0 text-sm">
                                                    {
                                                      inquiryDetails[id]
                                                        .fullName
                                                    }
                                                  </h6>
                                                  <p className="text-xs text-secondary mb-0">
                                                    {inquiryDetails[id].email}
                                                  </p>
                                                  <p className="text-xs font-weight-bold mb-0">
                                                    {
                                                      inquiryDetails[id]
                                                        .mobileNumber
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <hr className="dark horizontal my-0" />
                                            <div className="card-footer p-3">
                                              <p className="text-xs font-weight-bold mb-0">
                                                {inquiryDetails[id].message}
                                              </p>
                                            </div>
                                          </div>
                                          {/* ModalBox */}
                                          <div
                                            className="modal fade "
                                            id="exampleModalCenter"
                                            // tabeIndex="-1"
                                            role="dialog"
                                            aria-labelledby="exampleModalCenterTitle"
                                            aria-hidden="true"
                                          >
                                            <div
                                              className="modal-dialog modal-dialog-centered"
                                              role="document"
                                            >
                                              <div className="modal-content bg-gradient-secondary">
                                                <div className="modal-header">
                                                  <p
                                                    className="modal-title text-capitalize fs-6 text-white"
                                                    id="exampleModalLongTitle"
                                                  >
                                                    {
                                                      fullNameChange.fullNameUpdated
                                                    }
                                                  </p>
                                                  {/* <p>
                                                <small>
                                                  {fullNameChange.emailUpdated}
                                                </small>
                                              </p> */}
                                                  <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                  >
                                                    <span aria-hidden="true">
                                                      &times;
                                                    </span>
                                                  </button>
                                                </div>
                                                <div className="modal-body">
                                                  <form
                                                    ref={form}
                                                    onSubmit={handleSubmit}
                                                  >
                                                    <div className="form-group">
                                                      <input
                                                        type="email"
                                                        name="emailFieldState"
                                                        className="rounded p-1 mb-2"
                                                        style={{
                                                          fontWeight: "10",
                                                        }}
                                                        onChange={
                                                          handleChangeValueFunction
                                                        }
                                                        value={
                                                          fieldState.emailFieldState
                                                        }
                                                        // disabled
                                                        readOnly
                                                      />

                                                      <textarea
                                                        type="text"
                                                        name="messageFieldState"
                                                        className="form-control  text-white rounded p-1"
                                                        onChange={
                                                          handleChangeValueFunction
                                                        }
                                                        value={
                                                          fieldState.messageFieldState
                                                        }
                                                        style={{
                                                          resize: "none",
                                                          boxShadow:
                                                            "1px 1px 1px rgba(95, 85, 85, 0.404)",
                                                        }}
                                                        aria-describedby="replyHelp"
                                                        placeholder="Reply user"
                                                      ></textarea>
                                                    </div>

                                                    <div className="modal-footer">
                                                      <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        data-dismiss="modal"
                                                      >
                                                        Close
                                                      </button>
                                                      <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        // onClick={handleSubmit}
                                                      >
                                                        Response
                                                      </button>
                                                    </div>
                                                  </form>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )
                                ) : (
                                  <h3 className="text-uppercase text-secondary">
                                    Empty...
                                  </h3>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
        {/* <!-- Modal --> */}
      </Wrapper>
    </>
  );
}

export default Inquiry;
