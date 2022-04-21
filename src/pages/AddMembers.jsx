import React, { useEffect, useState } from "react";
import LeftImg from "../assets/img/signup-bg-img.jpg";
import Headernavbar from "./Headernavbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Breadcrumb from "../component/Breadcrumb";
import "../App.css";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addMemberFunction } from "../redux/memberRedux/action";
import { toast } from "react-toastify";
import { storage } from "../firebase";
import Styled from "styled-components";

function AddMembers({ PagesText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, SetProfileImage] = useState(null);
  const [idProofImage, SetIdProofImage] = useState(null);
  const [imgUrlStoreState, setImgUrlStoreState] = useState({
    profileUrlState: "",
    proofUrlState: "",
  });
  const [formImg, setFormValue] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  // const memberList = useSelector((state) => state.members.addMemberData);

  // const memberData = useSelector((state) => state.members.addMemberData);

  const routing = useSelector((state) => state.members.routing);

  useEffect(() => {
    // dispatch(listmemberFunction());
  }, []);

  // Formik Validation
  const validate = (values) => {
    const errors = {};
    // FullName
    if (!values.fullName.length) {
      errors.fullName = "required";
    } else if (values.fullName.length < 2) {
      errors.fullName = "Please, Full Name";
    } else if (!/^[a-zA-Z_ ]*$/i.test(values.fullName)) {
      errors.fullName = "Please only name";
    }
    // Email
    if (!values.email) {
      errors.email = "required";
    } else if (values.email.length < 4) {
      errors.email = "Must be of 8 Characters long";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // HouseNo || age || totalMembers
    if (!values.houseNo && !values.age && !values.totalMembers) {
      errors.houseNo = "required";
      errors.age = "required";
      errors.totalMembers = "required";
    } else if (
      !/^([0-9]+)*$/i.test(values.houseNo) &&
      !/^([0-9]+)/i.test(values.age) &&
      !/^([0-9]+)/i.test(values.totalMembers)
    ) {
      errors.houseNo = "Only numerics";
      errors.age = "Only numerics";
      errors.totalMembers = "Only numerics";
    }

    // password || rePassword
    if (!values.password || !values.rePassword) {
      errors.password = "required";
      errors.rePassword = "required";
    } else if (values.password.length < 6 || values.rePassword.length < 6) {
      errors.password = "Must be of 6 Characters long";
      errors.rePassword = "Must be of 6 Characters long";
    }

    // wing
    if (!values.wing.length) {
      errors.wing = "required";
    }

    //Status
    if (!values.status.length) {
      errors.status = "required";
    }

    // ImageValue
    // if (!values.imgValue) {
    //   errors.imgValue = "Select Profile Picture";
    // }

    return errors;
  };

  // handleChangeImageProfile
  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      SetProfileImage(e.target.files[0]);
    }
  };

  // handleChangeImageIdProof
  const handleChangeImageIdProof = (e) => {
    if (e.target.files[0]) {
      SetIdProofImage(e.target.files[0]);
    }
  };

  // Formik Form Handling
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      houseNo: "",
      age: "",
      totalMembers: "",
      gender: "",
      password: "",
      rePassword: "",
      wing: "",
      status: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (values.password !== values.rePassword) {
        toast.error("Recheck your password");
      } else {
        // console.log("Simple Values: ", values);
        setLoadingState(true);
        // console.log("Upgrade Values: ", upgradeValues);
        const uploadImg = storage
          .ref(`profiles/${profileImage.name}`)
          .put(profileImage);
        const uploadProof = storage
          .ref(`IdProof/${idProofImage.name}`)
          .put(idProofImage);

        console.log("Image Profile : ", profileImage.name);
        console.log("Image Id Proof : ", idProofImage.name);

        console.log("Submit");
        uploadImg.on(
          "state",
          (spanshot) => {},
          (err) => {
            // console.log("IMAGE PROFILE ERROR", err);
          },
          () => {
            storage
              .ref("profiles")
              .child(profileImage.name)
              .getDownloadURL()
              .then((profileUrl) => {
                // console.log("PROFILE IMAGE URL : ", profileUrl);
                if (profileUrl) {
                  uploadProof.on(
                    "state",
                    (spanshot) => {},
                    (err) => {
                      // console.log("ID PROOF ERROR", err);
                    },
                    () => {
                      storage
                        .ref("IdProof")
                        .child(idProofImage.name)
                        .getDownloadURL()
                        .then((ProofUrl) => {
                          // console.log("ID PROOF URL : ", ProofUrl);
                          if (ProofUrl) {
                            // console.log("PROFILE URL : ", profileUrl);
                            let upgradeValues = {
                              ...values,
                              image: profileUrl,
                              idproof: ProofUrl,
                            };
                            dispatch(addMemberFunction(upgradeValues));
                            setLoadingState(false);
                            resetForm(values);
                          }
                        })
                        .catch((err) => {
                          toast.error("Try later.");
                          // console.log("Image Error: ", err);
                        });
                    }
                  );
                }
              })
              .catch((err) => {
                toast.error("Try later.");
                // console.log("Image Error: ", err);
              });
          }
        );
      }
    },
  });

  if (routing) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="main-content position-relative max-height-vh-100 h-100">
        <Breadcrumb PagesText="Add Member" />
        <Headernavbar />
        <main className="main-content  mt-0">
          <section>
            {/* <div className="row overflow-hidden"> */}
            {/* <div className="col-md-12 bg-gradient-dark text-center text-capitaized align-items-center">
                <h3 className="text-light">Add Members</h3>
              </div> */}
            {/* <div className="row"> */}
            <div className="page-header min-vh-100">
              <div className="container">
                <div className="row h-100 position-relative">
                  <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                    <div
                      className="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                      style={{
                        backgroundImage: `url(${LeftImg})`,
                        backgroundSize: "cover",
                      }}
                    ></div>
                  </div>
                  <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5 justify-content-center">
                    <div className="card card-plain border">
                      <div className="card-header pb-0 bg-gradient-dark">
                        <h4 className="font-weight-bolder text-light">
                          Add Member
                        </h4>
                        {/* <p className="mb-0">Enroll to live digitally</p> */}
                      </div>
                      <div className="card-body pt-2">
                        <form
                          role="form"
                          className="md-form"
                          onSubmit={formik.handleSubmit}
                        >
                          <label className="text-secondary">Profile</label>
                          <div className="input-group input-group-outline">
                            <div className="btn btn-gradient-primary border btn-sm w-100 rounded-0">
                              <span className="float-left">
                                {/* Choose files */}
                                <input
                                  type="file"
                                  className="btn-gradient-primary"
                                  name="profileImg"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={handleChangeImage}
                                />
                              </span>
                            </div>
                          </div>
                          <label className="text-secondary">IdProof</label>
                          <div className="input-group input-group-outline"></div>
                          <div className="btn btn-gradient-primary border btn-sm w-100 rounded-0">
                            <span className="float-left">
                              {/* Choose files */}
                              <input
                                type="file"
                                className="btn-gradient-primary "
                                name="idProofImg"
                                accept=".png, .jpg, .jpeg"
                                onChange={handleChangeImageIdProof}
                              />
                            </span>
                          </div>
                          <div className="input-group input-group-outline">
                            <input
                              type="text"
                              className="form-control text-uppercase"
                              autoComplete="off"
                              placeholder="Full Name"
                              name="fullName"
                              onChange={formik.handleChange}
                              value={formik.values.fullName}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.fullName &&
                              formik.errors.fullName ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.fullName} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input text-uppercase"
                              type="radio"
                              name="gender"
                              onChange={formik.handleChange}
                              value="MALE"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio1"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input text-uppercase"
                              type="radio"
                              name="gender"
                              onChange={formik.handleChange}
                              value="FEMALE"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio2"
                            >
                              Female
                            </label>
                          </div>
                          <div className="form-check form-check-inline mt-3">
                            <input
                              className="form-check-input text-uppercase"
                              type="radio"
                              name="gender"
                              onChange={formik.handleChange}
                              value="OTHER"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="inlineRadio3"
                            >
                              Other
                            </label>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <input
                              type="email"
                              className="form-control text-uppercase"
                              autoComplete="off"
                              placeholder="E-mail"
                              name="email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.email && formik.errors.email ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.email} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <input
                              type="number"
                              className="form-control text-uppercase"
                              autoComplete="off"
                              placeholder="Age"
                              name="age"
                              onChange={formik.handleChange}
                              value={formik.values.age}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.age && formik.errors.age ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.age} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <input
                              type="number"
                              className="form-control text-uppercase"
                              autoComplete="off"
                              placeholder="TotalMembers"
                              name="totalMembers"
                              onChange={formik.handleChange}
                              value={formik.values.totalMembers}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.totalMembers &&
                              formik.errors.totalMembers ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.totalMembers} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <select
                              name="status"
                              className="form-select form-control text-secondary"
                              aria-label="Default select example"
                              onChange={formik.handleChange}
                              value={formik.values.status}
                              onBlur={formik.handleBlur}
                            >
                              <option>OwnerShip Status</option>
                              <option value="Landlord">LANDLORD</option>
                              <option value="Lease">LEASE</option>
                            </select>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            {/* <div> */}

                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustomUsername"
                                placeholder="HouseNo"
                                name="houseNo"
                                onChange={formik.handleChange}
                                value={formik.values.houseNo}
                                onBlur={formik.handleBlur}
                              />
                              <small>
                                {formik.touched.houseNo &&
                                formik.errors.houseNo ? (
                                  <small className="form-text text-muted p-1">
                                    {/* {formik.errors.houseNo} */}
                                    <i className="fa fa-exclamation-circle"></i>
                                  </small>
                                ) : null}
                              </small>
                              <div className="invalid-feedback">
                                Please choose a username.
                              </div>
                              <div className="input-group-prepend">
                                <InputGroupText
                                  className="input-group-text"
                                  id="inputGroupPrepend"
                                >
                                  <SelectField
                                    name="wing"
                                    id=""
                                    className="form-control text-white bg-dark z-index-1"
                                    onChange={formik.handleChange}
                                    value={formik.values.wing}
                                    onBlur={formik.handleBlur}
                                  >
                                    <option>Wing</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                  </SelectField>
                                </InputGroupText>
                              </div>
                            </div>
                            {/* </div> */}
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <input
                              type="password"
                              className="form-control text-uppercase"
                              maxLength={8}
                              autoComplete="off"
                              placeholder="Password"
                              name="password"
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.password &&
                              formik.errors.password ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.password} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>
                          <div className="input-group input-group-outline mt-3">
                            <input
                              type="password"
                              className="form-control text-uppercase"
                              maxLength={8}
                              autoComplete="off"
                              placeholder="Re-Password"
                              name="rePassword"
                              onChange={formik.handleChange}
                              value={formik.values.rePassword}
                              onBlur={formik.handleBlur}
                            />
                            <small>
                              {formik.touched.rePassword &&
                              formik.errors.rePassword ? (
                                <small className="form-text text-muted p-1">
                                  {/* {formik.errors.rePassword} */}
                                  <i className="fa fa-exclamation-circle"></i>
                                </small>
                              ) : null}
                            </small>
                          </div>

                          <div className="form-check form-check-info text-start ps-0 mt-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              defaultValue
                              autoComplete="off"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              I agree the{" "}
                              <a
                                href="/"
                                className="text-dark font-weight-bolder"
                              >
                                Terms and Conditions
                              </a>
                            </label>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              value={"Set Member"}
                              className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                            >
                              {loadingState ? (
                                <div
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                >
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                "Set Member"
                              )}
                            </button>

                            {/* Sign Up */}
                            {/* </input> */}
                            {/* <div className="bg-gradient-warning btn btn-lg w-100 mt-4 mb-0">
                              Register
                            </div> */}
                          </div>
                        </form>
                      </div>
                      <div className="card-footer text-center pt-0 px-lg-2 px-1">
                        <p className="mb-2 text-sm mx-auto">
                          Member already added?
                          <Link
                            to="/"
                            className="text-primary text-gradient font-weight-bold"
                          >
                            Admin Control
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* </div> */}
          </section>
        </main>
        <Footer />
      </main>
    </>
  );
}

const InputGroupText = Styled.span`
    position: absolute !important;
    padding: 0 0 !important;
    right: 0 !important;
    top: 0 !important;
    border-right: 0 !important;
    border-radius: 0 !important;
    z-index: 10;
`;

const SelectField = Styled.select`
  border-radius: 0 !important;
  border-radius-top-left: 0 !important;
  

`;

export default AddMembers;
