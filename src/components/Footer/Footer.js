import React from "react";
import FooterCopy from "./FooterCopy";
import FooterTop from "./FooterTop";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer_section">
      <FooterTop />
      <FooterCopy />
    </div>
  );
};

export default Footer;
