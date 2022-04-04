import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Headernavbar from "../pages/Headernavbar";
import "../App.css";
function Wrapper({ children }) {
    const isAdminLogin = useSelector((state) => state.adminlog.isAdminLogin);

  if(!isAdminLogin) {
     return <Navigate to="/signin" />;
  }
  return (
    <>
      <div className="cosWidth  float-right">
        <div className="p-2">
        <Headernavbar />
        </div>
      </div>
      <Navbar />
      <div className="cosWidth float-right">
        <div id="main-contents" className="p-2">
          {children}
        </div>
      </div>
    </>
  );
}

export default Wrapper;
