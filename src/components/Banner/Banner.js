import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
const Banner = () => {
  return (
    <>
      <div className="banner_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <div className="banner_content text-center">
                <h1>Best Books for Web Development?</h1>
                <p>
                  The best web development books on Amazon to learn web
                  development, expand your web development knowledge, start your
                  web developer career, or improve your web design business.
                </p>
                <div>
                  <Link to="/about" className="btn custom_btn">
                    Learn knowledge
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
