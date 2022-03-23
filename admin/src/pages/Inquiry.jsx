import React, { useEffect, useState } from "react";
import Breadcrumb from "../component/Breadcrumb";
import Footer from "./Footer";
import Headernavbar from "./Headernavbar";
// import Navbar from "./Navbar";
import cardImg from "../assets/img/illustrations/pattern-tree.svg";
import { Link } from "react-router-dom";
import Wrapper from "../component/Wapper";
import { useDispatch, useSelector } from "react-redux";
import { inquiryMemberDetailsFunction } from "../redux/inquiryRedux/action";
function Inquiry() {
  const inquiryDetails = useSelector((state) => state.inquiry.inquiryDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inquiryMemberDetailsFunction());
  }, []);

  // useEffect(() => {
  //   console.log("Got Inq Data ", inquiryDetails);
  // }, [inquiryDetails]);

  const [fullNameChange, setfullNameChange] = useState("");

  const handleNameChange = (fullName) => {
    setfullNameChange(fullName);
  };

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
                            <div className="row mb-5">
                              {inquiryDetails && inquiryDetails.length !== 0 ? (
                                Object.keys(inquiryDetails).map((id, index) => {
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
                                                inquiryDetails[id].fullName
                                              );
                                            }}
                                          >
                                            <i className="material-icons opacity-10">
                                              person
                                            </i>
                                          </div>
                                          <div className="text-end pt-1">
                                            <div className="d-flex flex-column justify-content-center">
                                              <h6 className="mb-0 text-sm">
                                                {inquiryDetails[id].fullName}
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
                                        className="modal fade"
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
                                          <div className="modal-content">
                                            <div className="modal-header">
                                              <h5
                                                className="modal-title"
                                                id="exampleModalLongTitle"
                                              >
                                                {fullNameChange}
                                              </h5>
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
                                              <form action="">
                                                <div className="form-group">
                                                  <textarea
                                                    type="text"
                                                    className="form-control  rounded p-1"
                                                    style={{
                                                      resize: "none",
                                                      boxShadow:
                                                        "1px 1px 1px rgba(95, 85, 85, 0.404)",
                                                    }}
                                                    aria-describedby="replyHelp"
                                                    placeholder="Reply user"
                                                  ></textarea>
                                                </div>
                                              </form>
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
                                                type="button"
                                                className="btn btn-primary"
                                              >
                                                Response
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <h3 className="text-uppercase text-secondary">
                                  Empty...
                                </h3>
                              )}
                            </div>
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
