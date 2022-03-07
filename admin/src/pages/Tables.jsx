import React from 'react';
import team1 from '../assets/img/teams/team-1.jpg'
import team2 from '../assets/img/teams/team-2.jpg'
import team3 from '../assets/img/teams/team-3.jpg'
import team4 from '../assets/img/teams/team-4.jpg'
import team5 from '../assets/img/teams/team-5.jpg'
import Breadcrumb from '../component/Breadcrumb';
import Wrapper from '../component/Wapper';
import Footer from './Footer';
import Headernavbar from './Headernavbar';
import Navbar from './Navbar';

function Tables() {
  return (
    <>
      <Wrapper>
        {/* <Navbar /> */}
        <main className="main-content position-relative max-height-vh-100 h-100  ">
          {/* Navbar */}
          <Breadcrumb PagesText="Tables" />
          {/* <Headernavbar /> */}
          {/* End of Navbar */}
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">
                        TOTAL MEMBERS
                      </h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Author
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              Function
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Status
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Employed
                            </th>
                            <th className="text-secondary opacity-7" />
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={team1}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user1"
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">John Michael</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    john@creative-tim.com
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                Manager
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                Organization
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                Online
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                23/04/18
                              </span>
                            </td>
                            <td className="align-middle">
                              <a
                                href="/"
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={team2}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user2"
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Alexa Liras</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    alexa@creative-tim.com
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                Programator
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                Developer
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-secondary">
                                Offline
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                11/01/19
                              </span>
                            </td>
                            <td className="align-middle">
                              <a
                                href="/"
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={team3}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user3"
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    Laurent Perrier
                                  </h6>
                                  <p className="text-xs text-secondary mb-0">
                                    laurent@creative-tim.com
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                Executive
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                Projects
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                Online
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                19/09/17
                              </span>
                            </td>
                            <td className="align-middle">
                              <a
                                href="/"
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={team4}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user4"
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Michael Levi</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    michael@creative-tim.com
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                Programator
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                Developer
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-success">
                                Online
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                24/12/08
                              </span>
                            </td>
                            <td className="align-middle">
                              <a
                                href="/"
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="d-flex px-2 py-1">
                                <div>
                                  <img
                                    src={team5}
                                    className="avatar avatar-sm me-3 border-radius-lg"
                                    alt="user5"
                                  />
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">Richard Gran</h6>
                                  <p className="text-xs text-secondary mb-0">
                                    richard@creative-tim.com
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <p className="text-xs font-weight-bold mb-0">
                                Manager
                              </p>
                              <p className="text-xs text-secondary mb-0">
                                Executive
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <span className="badge badge-sm bg-gradient-secondary">
                                Offline
                              </span>
                            </td>
                            <td className="align-middle text-center">
                              <span className="text-secondary text-xs font-weight-bold">
                                04/10/21
                              </span>
                            </td>
                            <td className="align-middle">
                              <a
                                href="/"
                                className="text-secondary font-weight-bold text-xs"
                                data-toggle="tooltip"
                                data-original-title="Edit user"
                              >
                                Edit
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </Wrapper>
    </>
  );
}

export default Tables;
