import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import SocialLogin from "../SocialLogin/SocialLogin";
import auth from "../Firebase/Firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import SpinnerLoading from "../Share/SpinnerLoading";
import useToken from "../Hook/useToken";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  // sign In With Email And  Password
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [token] = useToken(user);
  let errorElement;
  if (error) {
    errorElement = <span>Error:{error?.message}</span>;
  }
  if (loading) {
    return <SpinnerLoading />;
  }
  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = async (dataFiled) => {
    const email = dataFiled.email;
    const password = dataFiled.password;
    await signInWithEmailAndPassword(email, password);

    reset();
  };
  return (
    <div className="login_section ptb_80">
      <div className="container">
        <div className="row justify-content-center align-items-center ">
          <div className="col-lg-6">
            <form
              className="login_form mt-4"
              onSubmit={handleSubmit(handleLogin)}
            >
              <h1>Sign In &amp; Access Your Account</h1>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", { required: true })}
                  className="form_control"
                  id="email"
                />
                <p className="text-danger fw-bold">
                  {errors.email?.type === "required" && "Email is required"}
                </p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  {...register("password", { required: true })}
                  className="form_control"
                  id="password"
                />
                <p className="text-danger fw-bold">
                  {errors.password?.type === "required" &&
                    "Password is required"}
                </p>
              </div>
              <div className="form-group mb-3 forgot_pass">
                <Link to="/reset-password">Reset password?</Link>
              </div>
              <div className="btn-group d-flex">
                <button type="submit" className="btn btn-primary custom_btn">
                  {loading ? "Login......" : "Login"}
                </button>
              </div>
              {errorElement && (
                <p className="alert alert-danger mt-3 fw-bold">
                  {errorElement}
                </p>
              )}
            </form>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12 text-center">
                <SocialLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
