import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer py-4 pb-1">
        <div className="container-fluid ">
          <div className="row align-items-center justify-content-lg-center">
            <div className="col-lg-4  mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © {new Date().getFullYear().toString()}, made with{" "}
                <i className="fa fa-heart"></i> by
                <a href="/" className="font-weight-bold" target="_blank">
                  {" "}
                  Jenish Patel{" "}
                </a>
                for a better society.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
