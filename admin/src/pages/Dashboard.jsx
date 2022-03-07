import React, { useEffect, useState } from "react";
import team1 from "../assets/img/teams/team-1.jpg";
import team2 from "../assets/img/teams/team-2.jpg";
import team3 from "../assets/img/teams/team-3.jpg";
import team4 from "../assets/img/teams/team-4.jpg";
import team5 from "../assets/img/teams/team-5.jpg";
import Headernavbar from "./Headernavbar";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "../component/Breadcrumb";
import Wrapper from "../component/Wapper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteMemberFunction,
  listmemberFunction,
} from "../redux/memberRedux/action";
import { toast } from "react-toastify";
function Dashboard() {
  const memberList = useSelector((state) => state.members.addMemberData);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.loading);

  // useEffect
  useEffect(() => {
    dispatch(listmemberFunction());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteMemberFunction(id));
    dispatch(listmemberFunction());
    // toast.success("Deleted!");
  };

  // const totalMem = ;

  return (
    <>
      <Wrapper>
        <main className="main-content position-relative max-height-vh-100 h-100  ">
          <Breadcrumb PagesText="Dashboard" />
          <div className="container-fluid py-4">
            <div className="row mb-5">
              <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Total Members
                      </p>
                      <h4 className="mb-0">
                        {memberList && Object.keys(memberList).length !== 0
                          ? Object.keys(memberList).length
                          : "0"}
                      </h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +2%{" "}
                      </span>
                      than last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Today's Users
                      </p>
                      <h4 className="mb-0">2,300</h4>
                    </div>
                  </div>
                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +3%{" "}
                      </span>
                      than last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary d-flex justify-content-between shadow-primary border-radius-lg pt-4 pb-3">
                      <div className="div">
                        <h6 className="text-white text-capitalize ps-3">
                          Members Data -|-
                          <small className="px-2">
                            {new Date().toDateString()}
                          </small>
                        </h6>
                      </div>
                      <div className="div d-flex ">
                        <div className="input-group input-group-outline h-25">
                          <label className="form-label text-white opacity-6">
                            Search Members...
                          </label>
                          <input
                            type="text"
                            className="form-control text-white"
                          />
                        </div>
                        <div className="input-group input-group-outline h-25 mx-2">
                          <Link
                            className="btn bg-gradient-warning mb-0"
                            to="/AddMembers"
                          >
                            {/* <i className="material-icons text-sm">add</i> */}
                            <i className="material-icons opacity-10">
                              assignment
                            </i>
                            &nbsp;&nbsp;Add Member
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table  align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              ID
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              NAME
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              EMAIL
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              HOUSENO
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              TOTALMEMBERS
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              AGE
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              GENDER
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              DATE
                            </th>
                            <th
                              className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                              colSpan="2"
                            >
                              ACTION
                            </th>
                            <th className="text-secondary opacity-7" />
                          </tr>
                        </thead>
                        <tbody className="text-center text-uppercase">
                          {loading ? (
                            <tr>
                              <td>Loading...</td>
                            </tr>
                          ) : memberList && memberList.length !== 0 ? (
                            Object.keys(memberList).map((id, index) => {
                              return (
                                <tr key={id}>
                                  <td>
                                    <h6>{index + 1}</h6>
                                  </td>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div>
                                        <img
                                          src={team2}
                                          className="avatar avatar-sm me-3 border-radius-lg"
                                          alt="user1"
                                        />
                                      </div>
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">
                                          {memberList[id].fullName}
                                        </h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {memberList[id].email}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {memberList[id].houseNo}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {memberList[id].totalMembers}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {memberList[id].age}
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text-xs font-weight-bold mb-0">
                                      {memberList[id].gender}
                                    </p>
                                  </td>
                                  <td className="align-middle text-center">
                                    <span className="text-secondary text-xs font-weight-bold">
                                      {new Date().toDateString()}
                                    </span>
                                  </td>
                                  <td className="align-middle text-center text-sm cursor-pointer">
                                    <Link to={`/Profile/${id}`}>
                                      <span className="badge badge-sm bg-gradient-success">
                                        View
                                      </span>
                                    </Link>
                                  </td>
                                  <td
                                    className="align-middle text-center text-sm cursor-pointer"
                                    onClick={() => handleDelete(id)}
                                  >
                                    <span className="badge badge-sm bg-gradient-danger">
                                      Delete
                                    </span>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td>Empty...</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </main>
        <div className="fixed-plugin"></div>
        {/* </div> */}
      </Wrapper>
    </>
  );
}

export default Dashboard;
