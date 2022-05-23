import React from "react";
import "./book.css";
const BestBook = () => {
  return (
    <div className="book_section ptb_80">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-12 col-lg-6">
            <div className="book_content">
              <h2>Perfect Books for Learning Web Development With Ease</h2>
              <p>
                Some people process information better when it’s presented in
                the form of video or audio. To many, however, physical books are
                still the preferred method of learning. Unsure which books to
                choose for learning web development?
              </p>
              <div>
                <button className="book_btn custom_btn">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="book_thum">
              <img
                src="https://i.ibb.co/2ngkS03/Screenshot-7-prev-ui.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestBook;
