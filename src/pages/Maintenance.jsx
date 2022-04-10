import React, { useEffect } from "react";
import Wrapper from "../component/Wapper";
import { Link } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import { fetchAllMaintenanceFunction } from "../redux/maintenanceRedux/action";
import { useDispatch, useSelector } from "react-redux";

function Maintenance() {
  const addMaintenanceStorage = useSelector(
    (state) => state.maintenance.addMaintenanceStorage
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllMaintenanceFunction());
    console.log("Main:", addMaintenanceStorage);
  }, []);

  useEffect(() => {
    Object.keys(addMaintenanceStorage).map((id) => {
      return Object.keys(addMaintenanceStorage[id]).find((fs) => {
        return console.log("Maintenance : ", addMaintenanceStorage[id][4]);
      });
    });
  });

  return (
    <>
      <Wrapper>
        <main className="main-content position-relative max-height-vh-100 h-100">
          <Breadcrumb PagesText="Maintenance" />
          <div className="container-fluid py-4">
            <div className="row overflow-hidden">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-warning d-flex justify-content-between shadow-primary border-radius-lg pt-4 pb-3">
                      <div className="div">
                        <h6 className="text-white text-capitalize ps-3">
                          Maintenance Data -|-
                          <small className="px-2">
                            {new Date().toDateString()}
                          </small>
                        </h6>
                      </div>
                      <div className="mx-4 d-flex ">
                        <div className="input-group input-group-outline h-25">
                          <input
                            type="search"
                            className="form-control text-dark bg-light"
                            placeholder="Maintenance .."
                          />
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
                              No
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              NAME
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                              Paid
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center text-uppercase">
                          {addMaintenanceStorage &&
                            Object.keys(addMaintenanceStorage).map(
                              (id, indx) => {
                                // console.log(
                                //   addMaintenanceStorage[id][4].memberName
                                // );
                                return (
                                  <tr key={id}>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {indx + 1}
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {/* {id} */}
                                        {/* {Object.keys(
                                          addMaintenanceStorage[id]
                                        ).map((main, index) => {
                                          console.log(main);
                                          return "Hello";
                                        })} */}
                                        {
                                          addMaintenanceStorage[id][4]
                                            ?.memberName
                                        }
                                      </p>
                                    </td>
                                    <td>
                                      <Link to={`/maintenance-user/${id}`}>
                                        <button className="text-xs btn btn-sm btn-warning shadow-lg font-weight-bold mb-0">
                                          View
                                        </button>
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                      {/* <div className="card-footer px-0 pb-2 text-center align-center">
                        <button className="btn btn-primary">Show More</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
}

export default Maintenance;
