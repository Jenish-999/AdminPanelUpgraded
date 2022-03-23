import React, { useEffect, useRef, useState } from "react";
import Wrapper from "./Wapper";
import { storage, allStorage } from "../firebase";
import Styled from "styled-components";
import { toast } from "react-toastify";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState({});
  const [imgLoading, setImgLoading] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    storage.ref("image/");
  }, []);

  const handleChange = (e) => {
    // console.log(e.target.files[0]);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  //   console.log(image);

  const uploadImg = (e) => {
    e.preventDefault();
    const uploadImg = storage.ref(`images/${image.name}`).put(image);
    setImgLoading(true);
    console.log("Submit");
    uploadImg.on(
      "state",
      (spanshot) => {},
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            if (url) {
              fetch(
                "https://jenishdemosoc-default-rtdb.firebaseio.com/gallery.json",
                {
                  method: "POST",
                  body: JSON.stringify({
                    imgUrl: url,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
                .then((resp) => resp.json())
                .then((data) => {
                  console.log("IMAGE DATA ", data);
                  toast.success("Image Uploaded");
                  setImage(null);
                  setImgLoading(false);
                  formRef.current.reset();
                })
                .catch((err) => {
                  console.log("ERR", err);
                  toast.error("IMAGE FAIL");
                });
            }
          })
          .catch((err) => {
            console.log("ERR", err);
            toast.error("IMAGE FAIL FINAL");
          });
      }
    );
  };

  // Display All images
  const getDataFunction = () => {
    fetch("https://jenishdemosoc-default-rtdb.firebaseio.com/gallery.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("All Data", data);
        setImageData(data);
      });
  };

  // Delete selected images
  const handleDeleteImage = (id) => {
    if (id !== "") {
      console.log("Id for Delete Img", id);
      fetch(
        `https://jenishdemosoc-default-rtdb.firebaseio.com/gallery/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Deleted", data);
        });
      getDataFunction();
    } else {
      console.log("No Id ");
    }
  };

  console.log("State", imageData);

  useEffect(() => {
    getDataFunction();
  }, []);

  return (
    <>
      <Wrapper>
        <div className="container">
          <h3>ImageUpload</h3>
          <div className="container my-4">
            <form ref={formRef}>
              <input
                type="file"
                className="form-control border mb-3"
                name="file"
                onChange={handleChange}
                accept=".png,.jpeg,.jpg,.webp"
              />
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                onClick={uploadImg}
              >
                {imgLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </form>
          </div>
          {/* <div className="container border rounded">
            <div className="card-body px-0 pb-2">
              <div className="container-fluid py-4">
                <div className="row mb-5">
                  {imageData && imageData.length !== 0 ? (
                    Object.keys(imageData).map((id, index) => {
                      return (
                        <div
                          className="col-xl-3 col-sm-2 mb-xl-0 mb-4"
                          key={id}
                        >
                          <div className="card my-3 h-100">
                            <div
                              className="icon cursor-pointer icon-lg icon-shape bg-gradient-danger shadow-primary text-center border-radius-lg mt-n4 position-absolute"
                              data-toggle="modal"
                              data-target="#exampleModalCenter"
                              // onClick={() => {
                              //   // handleNameChange(inquiryDetails[id].fullName);
                              // }}
                            >
                              <i className="material-icons opacity-10">🗑</i>
                            </div>
                            <ImgDiv
                              className="img-fluid"
                              src={imageData[id].imgUrl}
                              alt={imageData[id].imgUrl}
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h4>No Image Data</h4>
                  )}
                </div>
              </div>
            </div>
          </div> */}
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
              <table className="table  align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      ID
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      PICTURE
                    </th>

                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      DATE
                    </th>
                    <th
                      className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      // colSpan="2"
                    >
                      ACTION
                    </th>
                    <th className="text-secondary opacity-7" />
                  </tr>
                </thead>
                <tbody className="text-center text-uppercase">
                  {imageData && imageData.length !== 0 ? (
                    Object.keys(imageData).map((id, index) => {
                      return (
                        <tr key={id}>
                          <td>
                            <h6>{index + 1}</h6>
                          </td>
                          <td>
                            <div className="d-flex px-2 py-1">
                              <div>
                                <ImgTag
                                  src={imageData[id].imgUrl}
                                  className=""
                                  alt={imageData[id].imgUrl}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {new Date().toDateString()}
                            </span>
                          </td>

                          <td
                            className="align-middle text-center text-sm cursor-pointer"
                            onClick={() => handleDeleteImage(id)}
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
                      <td>Empty Data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const ImgDiv = Styled.img`  
height: 200px;
width: 300px;
background-position: center;
background-size: cover;
object-fit: contain;
background-repeat: no-repeat;

`;

const ImgTag = Styled.img`
width: 100px;
height: 100px;
background-position: center;
// background-size: cover;
object-fit: contain;
border-radius: 10px;
box-shadow: 0 3px 3px 0 rgb(233 30 99 / 15%), 0 3px 1px -2px rgb(233 30 99 / 20%), 0 1px 5px 0 rgb(233 30 99 / 15%);
}


`;

export default ImageUpload;
