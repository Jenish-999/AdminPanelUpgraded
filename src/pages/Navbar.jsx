import React from "react";
import logoct from "../assets/img/logo-ct.png";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0   fixed-start   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <Link className="navbar-brand m-0" to="/">
            <img
              src={logoct}
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
            <span className="ms-1 font-weight-bold text-white">
              Admin Panel
            </span>
          </Link>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white  " to="/Dashboard">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">group</i>
                </div>
                <span className="nav-link-text ms-1">All Members</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to="/Events">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">table_view</i>
                </div>
                <span className="nav-link-text ms-1">Events</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to="/Inquiry">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">receipt_long</i>
                </div>
                <span className="nav-link-text ms-1">Inquiries</span>
              </Link>
            </li>
            <li className="nav-item mt-3">
              <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
                Account pages
              </h6>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to="/ImageUpload">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">collections</i>
                </div>
                <span className="nav-link-text ms-1">ImageUpload</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to="/Notices">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">
                    chrome_reader_mode
                  </i>
                </div>
                <span className="nav-link-text ms-1">Notices</span>
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-white " to="/AddMembers">
                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="material-icons opacity-10">assignment</i>
                </div>
                <span className="nav-link-text ms-1">Add Members</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Navbar;
