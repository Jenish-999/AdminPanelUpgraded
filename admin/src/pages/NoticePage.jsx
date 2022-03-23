import React from "react";
import Breadcrumb from "../component/Breadcrumb";
import EventNoticeComponent from "../component/EventNoticeComponent";
import Wrapper from "../component/Wapper";

function NoticePage() {
  return (
    <>
      <Wrapper>
        <Breadcrumb PagesText="Notice " />
        <div className="container">
          <EventNoticeComponent />
        </div>
      </Wrapper>
    </>
  );
}

export default NoticePage;
