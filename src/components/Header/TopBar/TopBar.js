import React from "react";
import { Link } from "react-router-dom";
import { FcAbout, FcFaq } from "react-icons/fc";
import { GrLanguage } from "react-icons/gr";
import { FiLogIn } from "react-icons/fi";
import { SiGnuprivacyguard } from "react-icons/si";
import "./TopBar.css";
import auth from "../../Firebase/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
const TopBar = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="top_bar">
      <div className="container">
        <div className="row">
          <div className="col-md-12   col-lg-4 ">
            <div className="top_left text-md-center text-sm-center text-lg-start text-center">
              <Link to="">
                <span>
                  <FcAbout />
                </span>
                About
              </Link>
              <Link to="">
                <span>
                  <FcFaq />
                </span>
                Faqs
              </Link>
              <Link to="">
                <span>
                  <GrLanguage />
                </span>
                Faqs
              </Link>
            </div>
          </div>
          <div className="col-md-12 col-lg-8">
            <div className="top_right text-md-center text-sm-center text-lg-end text-center">
              {user && user ? (
                <>
                  <Link to="">
                    <span>
                      <img
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://i.ibb.co/w6ktkM6/download.png"
                        }
                        alt=""
                      />
                    </span>
                    {user?.displayName}
                  </Link>

                  <Link to="/admin/manage-inventory" title="Manage Inventory">
                    <span>Manage Inventory</span>
                  </Link>
                  <Link to="/admin/add-inventory">Add new </Link>
                  <Link to="/admin/my-items" title="My Items">
                    <span>My Items</span>
                  </Link>

                  <button onClick={() => signOut(auth)}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="login">
                    <span>
                      <FiLogIn />
                    </span>
                    Login
                  </Link>
                  <Link to="signup">
                    <span>
                      <SiGnuprivacyguard />
                    </span>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
