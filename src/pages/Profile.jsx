import React, { useEffect, useState } from "react";
import Bgprofileimg from "../assets/img/profile-bg-img-3.jpg";
import Footer from "./Footer";
import Breadcrumb from "../component/Breadcrumb";
import Wrapper from "../component/Wapper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewMemberFunction } from "../redux/memberRedux/action";
import { fetchMaintenanceFunction } from "../redux/maintenanceRedux/action";
import MaintenceModal from "../component/MaintenceModal";
function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const viewMember = useSelector((state) => state.members.viewMember);
  const loading = useSelector((state) => state.members.loading);
  const { age, email, fullName, gender, houseNo, image, totalMembers, wing } =
    viewMember;
  const addMaintenanceStorage = useSelector(
    (state) => state.maintenance.addMaintenanceStorage
  );

  useEffect(() => {
    if (id) {
      dispatch(viewMemberFunction(id));
    }

    return () => {
      dispatch({ type: "EMPTY" });
    };
  }, [id]);

  const [memberNameState, setMemberNameState] = useState("");

  useEffect(() => {
    if (viewMember) {
      setMemberNameState(viewMember);
    }
  }, [viewMember]);

  const [dueDateState, setDueDateState] = useState();
  useEffect(() => {
    dispatch(fetchMaintenanceFunction(id));
    Object.keys(addMaintenanceStorage).map((id, indx) => {
      setDueDateState(addMaintenanceStorage[id].dueDate);
    });
    dispatch({ type: "EMPTY_DATA_MAINTENANCE" });
  }, []);
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <Wrapper>
        <div className="main-content position-relative bg-gray-100 max-height-vh-100 h-100 ">
          <Breadcrumb PagesText="Profile" />
          <div className="container-fluid px-2 px-md-4">
            <div
              className="page-header min-height-300 border-radius-xl mt-4"
              style={{ backgroundImage: `url(${Bgprofileimg})` }}
            ></div>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className="card card-body mx-3 mx-md-4 mt-n6">
                <div className="row gx-4 mb-2  ">
                  {loading && loading ? (
                    <div className="spinner-border text-dark" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <div className="col-lg-6  d-flex  align-self-center justify-content-start">
                      <div className="avatar avatar-xl position-relative">
                        <img
                          src={image}
                          alt="profile_image"
                          className="w-100 border-radius-lg shadow-sm"
                        />
                      </div>

                      <div className="h-100 ml-2">
                        <h5 className="mb-1 text-uppercase">{fullName}</h5>
                        <p className="mb-0 font-weight-normal text-sm">
                          Email / {email}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="col-lg-6 my-auto  d-flex flex-row-reverse">
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <i className="material-icons opacity-10">
                        control_point_duplicate
                      </i>
                      Maintenance
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="row">
                    <div className="col-12 col-xl-4">
                      <div className="card card-plain h-100">
                        <div className="card-header pb-0 p-3">
                          <h6 className="mb-0">Profile Information</h6>
                        </div>
                        <div className="card-body p-3">
                          <p className="text-sm">
                            Hi, I’m{" "}
                            <strong className="text-dark text-uppercase">
                              {fullName}
                            </strong>
                            , Promise: I offer oath to this society to
                            contribute my deprevation and also with full
                            gratitute I will participaint in all part of
                            cheerful events of our society.
                          </p>
                          <hr className="horizontal gray-light my-4" />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4">
                      <div className="card card-plain h-100">
                        <div className="card-header pb-0 p-3">
                          <div className="row">
                            <div className="col-md-9 d-flex align-items-center">
                              <ul className="list-group text-uppercase">
                                <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                                  <strong className="text-dark">
                                    Full Name:
                                  </strong>{" "}
                                  &nbsp; {fullName}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                  <strong className="text-dark">House:</strong>{" "}
                                  &nbsp; {wing}-{houseNo}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                  <strong className="text-dark">Email:</strong>{" "}
                                  &nbsp; {email}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                  <strong className="text-dark">
                                    TotalMembers:
                                  </strong>{" "}
                                  &nbsp; {totalMembers}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                  <strong className="text-dark">Age:</strong>{" "}
                                  &nbsp; {age}
                                </li>
                                <li className="list-group-item border-0 ps-0 text-sm">
                                  <strong className="text-dark">Gender:</strong>{" "}
                                  &nbsp; {gender}
                                </li>
                                <li className="list-group-item border-0 ps-0 pb-0">
                                  <strong className="text-dark text-sm">
                                    Social:
                                  </strong>{" "}
                                  &nbsp;
                                  <a
                                    className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                                    href="/"
                                  >
                                    <i className="fab fa-facebook fa-lg" />
                                  </a>
                                  <a
                                    className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                                    href="/"
                                  >
                                    <i className="fab fa-twitter fa-lg" />
                                  </a>
                                  <a
                                    className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                                    href="/"
                                  >
                                    <i className="fab fa-instagram fa-lg" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4">
                      <div className="card card-plain h-100">
                        <div className="card-header pb-0 p-3">
                          <h6 className="mb-0">Maintanance</h6>
                        </div>
                        <div className="card-body p-3">
                          <ul className="list-group">
                            {Object.keys(addMaintenanceStorage).map((id) => {
                              var d = new Date(
                                addMaintenanceStorage[id].dueDate
                              );
                              var monthName = months[d.getMonth()]; // "July" (or current month)
                              return (
                                <li
                                  key={id}
                                  className="list-group-item shadow p-1 border-0 d-flex align-items-center mb-2 pt-0"
                                >
                                  <div className="d-flex align-items-start flex-column justify-content-center">
                                    <div className="d-flex justify-content-between  align-items-center">
                                      <h6 className="mb-0 mr-2 text-sm">
                                        {monthName}
                                      </h6>
                                      <h6 className="mb-0 ml-2 text-sm">
                                        {addMaintenanceStorage[id].annualAmt}/-
                                      </h6>
                                    </div>
                                    <ul className="pl-1 list-unstyled">
                                      <li className="mb-1 text-xs">
                                        Paid date :{" "}
                                        {addMaintenanceStorage[id].currentDate}
                                      </li>
                                      <li className="mb-1 text-xs">
                                        Due date :{" "}
                                        {addMaintenanceStorage[id].dueDate}
                                      </li>
                                      <li className="mb-1 text-xs">
                                        Penalty :{" "}
                                        {addMaintenanceStorage[id].panelty}/-
                                      </li>
                                    </ul>
                                  </div>
                                  <a
                                    className="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto"
                                    href="/"
                                  >
                                    Print
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <MaintenceModal fullName={fullName} id={id} />
          <Footer />
        </div>
      </Wrapper>
    </>
  );
}

export default Profile;
