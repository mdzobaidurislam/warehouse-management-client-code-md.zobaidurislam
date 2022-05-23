import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./NavBar.css";
const NavBar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="nav_bar ">
      <div className="container d-flex justify-content-between">
        <div className="left_side">
          <div className="logo">
            <Link to="">
              <span>E</span>-Book
            </Link>
          </div>
        </div>
        <div className="right_menu">
          <div className="bar_toggle" onClick={() => setToggle(!toggle)}>
            <FaBars />
          </div>
          <div className=" menu">
            <Link to="/">Home</Link>
            <Link to="/inventory">Inventory</Link>
            <Link to="inventory">About us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className={toggle ? "mobaile_menu active" : "mobaile_menu"}>
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="inventory">About us</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default NavBar;
