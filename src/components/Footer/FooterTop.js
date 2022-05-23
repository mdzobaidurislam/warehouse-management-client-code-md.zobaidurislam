import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
const FooterTop = () => {
  return (
    <div className="footer_top">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="widget mb-3">
              <div className="logo">
                <Link to="">
                  <span>E</span>-Book
                </Link>
              </div>
              <div className="about_in">
                <p>
                  If we find a person with a rare intellect, we should ask him
                  about the books he reads. A book can define a person’s nature
                  and intelligence.
                </p>
                <div className="social_link">
                  <ul>
                    <li>
                      <Link to="">
                        <FiFacebook />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <AiOutlineTwitter />
                      </Link>
                    </li>
                    <li>
                      <Link to="">
                        <FaLinkedinIn />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget list">
              <h2>
                <span>Learn </span>
              </h2>
              <ul>
                <li>
                  <Link to="">
                    <span>
                      <IoIosArrowForward />
                    </span>
                    Algorithms
                  </Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">Data Structures</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">SDE Cheat Sheet</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">Machine learning</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget list">
              <h2>
                <span>Top Languages</span>
              </h2>
              <ul>
                <li>
                  <Link to="">
                    <span>
                      <IoIosArrowForward />
                    </span>
                    Python
                  </Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">Java</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">CPP</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">Golang</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">C#</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">SQL</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="widget list">
              <h2>
                <span>Quick Links</span>
              </h2>
              <ul>
                <li>
                  <Link to="/">
                    <span>
                      <IoIosArrowForward />
                    </span>
                    Home
                  </Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">Inventory</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="">About us</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <span>
                    <IoIosArrowForward />
                  </span>
                  <Link to="/signup">Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
