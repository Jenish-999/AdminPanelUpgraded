import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumb from "../component/Breadcrumb";
import Wrapper from "../component/Wapper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteMemberFunction,
  listmemberFunction,
} from "../redux/memberRedux/action";
import Styled from "styled-components";
import { toast } from "react-toastify";
import { inquiryMemberDetailsFunction } from "../redux/inquiryRedux/action";

function Dashboard() {
  const memberList = useSelector((state) => state.members.addMemberData);
  const inquiryDetails = useSelector((state) => state.inquiry.inquiryDetails);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.loading);

  const list = {
    memberList,
  };

  const [searchField, setSearchField] = useState("");

  const [searchResult, setSearchResult] = useState();

  // Handle FinalList
  const finalList =
    memberList &&
    Object.keys(list.memberList).map((id, index) => {
      let result = list.memberList[id];
      return result;
    });

  // Search Handler
  const searchHandler = (e) => {
    setSearchField(e.target.value);

    if (searchField !== "") {
      const newMemberList =
        finalList &&
        finalList.filter((item) => {
          console.log(
            "NewMemberFilter : ",
            Object.values(item.fullName)
              .join("")
              .toLowerCase()
              .includes(searchField.toLowerCase())
          );

          return Object.values(item.fullName)
            .join("")
            .toLowerCase()
            .includes(searchField.toLowerCase());
        });
      // ;
      return setSearchResult(newMemberList);
    }
  };

  // console.log("SearchField :", searchField);
  // console.log("Final List : ", finalList);
  // console.log("Search Result : ", searchResult);

  let memberID =
    memberList &&
    Object.keys(memberList).map((id) => {
      return id;
    });

  const handleDelete = (id, email, password) => {
    // console.log(id, email, password);
    if (email && password) {
      // console.log(email, password);
      dispatch(deleteMemberFunction(id, { email, password }));
      toast.success("Deleted!");
    } else {
      toast.error("Try,later");
    }
  };

  // useEffect
  useEffect(() => {
    dispatch(listmemberFunction());
    dispatch(inquiryMemberDetailsFunction());
  }, []);

  // States for showMore func
  const [memberItem] = useState(memberList);
  let defaultValue = 3;
  const [noOfItemShown, setNoOfItemShown] = useState(defaultValue);
  // handleShowMore func
  const handleShowMore = () => {
    setNoOfItemShown(noOfItemShown + 3);

    // console.log("Member List on Click : ", memberItem);
  };

  return (
    <>
      <Wrapper>
        <main className="main-content position-relative max-height-vh-100 h-100">
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
                        Total Inquires
                      </p>
                      <h4 className="mb-0">
                        {inquiryDetails &&
                        Object.keys(inquiryDetails).length !== 0
                          ? Object.keys(inquiryDetails).length
                          : "0"}
                      </h4>
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
            <div className="row overflow-hidden">
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
                          {/* <label className="form-label text-white opacity-6">
                            Search Members...
                          </label> */}
                          <input
                            // ref={inputEl}
                            type="search"
                            className="form-control text-dark bg-light"
                            placeholder="Search Members.."
                            value={searchField}
                            onChange={searchHandler}
                          />
                        </div>
                        <div
                          className="input-group input-group-outline h-25 mx-2"
                          onClick={() => {
                            dispatch({ type: "ROUTE_NULL" });
                          }}
                        >
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
                    <div className="table-responsive p-0  overflow-hidden">
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
                            searchField.length < 1 ? (
                              Object.keys(memberList)
                                .slice(0, noOfItemShown)
                                .map((id, index) => {
                                  return (
                                    <tr key={id}>
                                      <td>
                                        <h6>{index + 1}</h6>
                                      </td>
                                      <td>
                                        <div className="d-flex px-2 py-1">
                                          <div>
                                            <ImgTag
                                              src={memberList[id].image}
                                              className="avatar avatar-lg me-3"
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
                                          {memberList[id].wing}-
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
                                        onClick={() =>
                                          handleDelete(
                                            id,
                                            memberList[id].email,
                                            memberList[id].password
                                          )
                                        }
                                      >
                                        <span className="badge badge-sm bg-gradient-danger">
                                          Delete
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })
                            ) : searchResult && searchResult.length !== 0 ? (
                              Object.keys(searchResult).map((id, index) => {
                                return (
                                  <tr key={id}>
                                    <td>
                                      <h6>{index + 1}</h6>
                                    </td>
                                    <td>
                                      <div className="d-flex px-2 py-1">
                                        <div>
                                          <ImgTag
                                            src={searchResult[id].image}
                                            className="avatar avatar-lg me-3"
                                            alt="user1"
                                          />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                          <h6 className="mb-0 text-sm">
                                            {searchResult[id].fullName}
                                          </h6>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {searchResult[id].email}
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {searchResult[id].wing}-
                                        {searchResult[id].houseNo}
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {searchResult[id].totalMembers}
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {searchResult[id].age}
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {searchResult[id].gender}
                                      </p>
                                    </td>
                                    <td className="align-middle text-center">
                                      <span className="text-secondary text-xs font-weight-bold">
                                        {new Date().toDateString()}
                                      </span>
                                    </td>
                                    <td className="align-middle text-center text-sm cursor-pointer">
                                      <Link
                                        to={`/Profile/${searchResult[id].id}`}
                                      >
                                        <span className="badge badge-sm bg-gradient-success">
                                          View
                                        </span>
                                      </Link>
                                    </td>
                                    <td
                                      className="align-middle text-center text-sm cursor-pointer"
                                      onClick={() =>
                                        handleDelete(
                                          id,
                                          searchResult[id].email,
                                          searchResult[id].password
                                        )
                                      }
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
                            )
                          ) : (
                            <tr>
                              <td>Empty...</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <div className="card-footer px-0 pb-2 text-center align-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleShowMore()}
                        >
                          Show More
                        </button>
                      </div>
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

const ImgTag = Styled.img`
width: 100px;
height: 100px;
background-position: center;
// background-size: cover;
object-fit: contain;
`;

export default Dashboard;
