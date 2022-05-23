import React from "react";
import "./BookTell.css";
const BookTell = () => {
  return (
    <div className="book_tell_section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="content_tell text-center">
              <h2>
                Improve Your Development Process With Helpful Development
                Resources.
              </h2>
              <p>
                Source control is one of the skills that takes time to
                understand how to do it right, and of course one the best thing
                is learn by the example of how successful teams have done it,
                and how it improve the process, and even better learn new tricks
                with GIT.
              </p>
              <div>
                <button className="custom_btn">Contact us</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTell;
