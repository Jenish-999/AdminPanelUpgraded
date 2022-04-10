import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumb from "../component/Breadcrumb";
import Wrapper from "../component/Wapper";
import { fetchMaintenanceFunction } from "../redux/maintenanceRedux/action";

function MaintenanceUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const monthWiseMaintenanceStorage = useSelector(
    (state) => state.maintenance.monthWiseMaintenanceStorage
  );
  const loading = useSelector((state) => state.maintenance.loading);

  useEffect(() => {
    dispatch(fetchMaintenanceFunction(id));
  }, []);

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
                    <div className="bg-gradient-success d-flex justify-content-between shadow-primary border-radius-lg pt-4 pb-3">
                      <div className="div">
                        <h6 className="text-white text-capitalize ps-3">
                          {Object.keys(monthWiseMaintenanceStorage).map(
                            (id) => {
                              return monthWiseMaintenanceStorage[id].memberName;
                            }
                          )}{" "}
                          -|-
                        </h6>
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
                              Amount
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                              Penalty
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Paid
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                              Due
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                              Annual
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">
                              Month
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-center text-uppercase">
                          {loading ? (
                            <tr>
                              <td>Loading ...</td>
                            </tr>
                          ) : (
                            monthWiseMaintenanceStorage &&
                            Object.keys(monthWiseMaintenanceStorage).map(
                              (id, indx) => {
                                // setMemberName(
                                //   monthWiseMaintenanceStorage[id].memberName
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
                                        {monthWiseMaintenanceStorage[id].amount}
                                        /-
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {
                                          monthWiseMaintenanceStorage[id]
                                            .panelty
                                        }
                                        /-
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {
                                          monthWiseMaintenanceStorage[id]
                                            .currentDate
                                        }
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {
                                          monthWiseMaintenanceStorage[id]
                                            .dueDate
                                        }
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {
                                          monthWiseMaintenanceStorage[id]
                                            .annualAmt
                                        }
                                        /-
                                      </p>
                                    </td>
                                    <td>
                                      <p className="text-xs font-weight-bold mb-0">
                                        {id}
                                      </p>
                                    </td>
                                  </tr>
                                );
                              }
                            )
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

export default MaintenanceUser;
