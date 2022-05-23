import React from "react";
import NavBar from "./NavBar/NavBar";
import TopBar from "./TopBar/TopBar";

const Header = () => {
  return (
    <div className="header">
      <TopBar />
      <NavBar />
    </div>
  );
};

export default Header;
