import React from "react";
import "./LoadingBox.css";
const LoadingBox = ({ msg }) => {
  return (
    <div className="spiner_section">
      {msg && <h1 className="text-center alert alert-warning ">{msg}</h1>}
      <div className="spinner-box">
        <div className="pulse-container">
          <div className="pulse-bubble pulse-bubble-1"></div>
          <div className="pulse-bubble pulse-bubble-2"></div>
          <div className="pulse-bubble pulse-bubble-3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBox;
