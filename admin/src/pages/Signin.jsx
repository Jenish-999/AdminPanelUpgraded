import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminLoginFunction } from "../redux/adminRedux/action";

function Signin() {
  const isAdminLogin = useSelector((state) => state.adminlog.isAdminLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdminLoginFail = useSelector(
    (state) => state.adminlog.isAdminLoginFail
  );

  useEffect(() => {
    if (isAdminLogin) {
      navigate("/");
    }
  }, [isAdminLogin]);

  // useEffect(() => {
  //   if (isAdminLoginFail) {
  //     toast.error("Invalid");
  //   }
  // }, [isAdminLoginFail]);

  // Validaiton Fields
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "req";
    } else if (values.email.length < 4) {
      errors.email = "Must be of 8 Characters long";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "req";
    } else if (values.password.length < 6) {
      errors.password = "Must be of 6 Characters long";
    }
    return errors;
  };

  // Data Submit using formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (values.email === "" || values.password === "") {
        return console.log("Email Missing ");
      } else {
        dispatch(adminLoginFunction(values));
        console.log("Data Submitted! : ", values.email, values.password);
        resetForm({ values: "" });
      }
    },
  });

  return (
    <>
      <main className="main-content  mt-0">
        <div
          className="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")',
          }}
        >
          <span className="mask bg-gradient-dark opacity-6" />
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3">
                            <i className="fa fa-facebook text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3">
                            <i className="fa fa-github text-white text-lg" />
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3">
                            <i className="fa fa-google text-white text-lg" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form
                      role="form"
                      onSubmit={formik.handleSubmit}
                      className="text-start"
                    >
                      <div className="input-group input-group-outline border-right-none mb-3">
                        <div className="w-100">
                          <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className="form-control"
                            onBlur={formik.handleBlur}
                            placeholder="email"
                          />
                        </div>
                        <div>
                          {formik.touched.email && formik.errors.email ? (
                            <small className="form-text text-muted p-1">
                              {formik.errors.email}
                              {/* <i className="fa fa-exclamation-circle"></i> */}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <div className="w-100">
                          <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            className="form-control w-100"
                            onBlur={formik.handleBlur}
                            placeholder="password"
                          />
                        </div>
                        <div>
                          {formik.touched.password && formik.errors.password ? (
                            <small className="form-text text-muted p-1">
                              {formik.errors.password}
                              {/* <i className="fa fa-exclamation-circle"></i> */}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" />
                        <label
                          className="form-check-label mb-0 ms-2"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          SignIn
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Signin;
