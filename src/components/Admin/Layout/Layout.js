import React from "react";
import Main from "../Main/Main";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="admin_section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <div className="content_page position-relative">
              <Main />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
