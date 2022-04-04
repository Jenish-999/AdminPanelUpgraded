import React from "react";
import Breadcrumb from "../component/Breadcrumb";
import EventNoticeComponent from "../component/EventNoticeComponent";
import Wrapper from "../component/Wapper";
import Footer from "./Footer";

function NoticePage() {
  return (
    <>
      <Wrapper>
        <Breadcrumb PagesText="Notice " />
        <div className="container">
          <EventNoticeComponent />
        </div>
        {/* <Footer /> */}
      </Wrapper>
    </>
  );
}

export default NoticePage;
