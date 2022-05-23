import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerLoading = () => {
  return (
    <div className="spinner">
      <div className="container">
        <div className="row justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
