import React from "react";
import { Button } from "react-bootstrap";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../Firebase/Firebase.init";
import useToken from "../Hook/useToken";
import SpinnerLoading from "../Share/SpinnerLoading";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

const SocialLogin = () => {
  let navigate = useNavigate();
  let location = useLocation();
  // github
  const [signInWithGithub, gituser, gitloading, giterror] =
    useSignInWithGithub(auth);
  // google
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  // location pathname
  let from = location.state?.from?.pathname || "/";
  let errorElement;
  const [token] = useToken(user || gituser);

  // loading
  if (loading || gitloading) {
    return <SpinnerLoading />;
  }

  // error
  if (error || giterror) {
    errorElement = (
      <>
        Error: {error?.message} {giterror?.message}
      </>
    );
  }
  // token
  if (token) {
    navigate(from, { replace: true });
  }
  // handleGoogleSignIn
  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };
  return (
    <>
      <p className="text-danger">{errorElement}</p>
      <div className="social_login">
        <div className="mb-2">
          <div>
            <Button className="custom_btn" onClick={handleGoogleSignIn}>
              <span>
                <FcGoogle />
              </span>{" "}
              Sign in with Google
            </Button>
          </div>
          <div>
            <Button
              className="custom_btn mt-2 mb-2"
              onClick={() => signInWithGithub()}
            >
              <span>
                <BsGithub />
              </span>{" "}
              Sign in with Github
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
