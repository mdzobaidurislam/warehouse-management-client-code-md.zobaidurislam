import React, { useRef } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../Firebase/Firebase.init";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, createUser, createError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updatingError] = useUpdateProfile(auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  if (createError) {
    toast(createError);
  }
  if (updatingError) {
    toast(updatingError);
  }
  if (createUser) {
    toast(
      "Usre created successfully! Cheak your email and confirm verification!"
    );
    navigate("/");
  }
  // handleRegister
  const handleRegister = async (data) => {
    console.log(data.name);
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });

    reset();
  };
  return (
    <div className="login_section ptb_80">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-lg-6">
            <form
              className="login_form mt-4"
              onSubmit={handleSubmit(handleRegister)}
            >
              <h1>Sign Up &amp; Access Your Account</h1>
              <div className="form-group mb-3">
                <label htmlFor="email">Your Name</label>
                <input
                  {...register("name", { required: true })}
                  className="form_control"
                  id="name"
                  type="text"
                />
                <p className="text-danger fw-bold">
                  {errors?.name?.type === "required" && (
                    <span>Name is required</span>
                  )}
                </p>
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>

                <input
                  {...register("email", { required: true })}
                  className="form_control "
                  id="email"
                  type="email"
                />
                <p className="text-danger fw-bold">
                  {errors?.email?.type === "required" && (
                    <span>Email is required</span>
                  )}
                </p>
              </div>
              <div className="form-group mb-3">
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "You must specify a password",
                    validate: (value) => {
                      return (
                        [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every(
                          (pattern) => pattern.test(value)
                        ) ||
                        "must include lower, upper, number, and special chars"
                      );
                    },
                    minLength: {
                      value: 5,
                      message: "Password must have at least 5 characters",
                    },
                  })}
                  className="form_control "
                />
                <p className="text-danger fw-bold">
                  {errors?.password && <span>{errors?.password?.message}</span>}
                </p>
              </div>
              <div className="form-group mb-3">
                <label>Repeat password</label>
                <input
                  type="password"
                  {...register("password_repeat", {
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  className="form_control "
                />
                <p className="text-danger fw-bold">
                  {errors?.password_repeat && (
                    <span>{errors?.password_repeat?.message}</span>
                  )}
                </p>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="checkbok"
                  {...register("checkbox", { required: true })}
                />
                <label className="form-check-label" htmlFor="checkbok">
                  I agree to the terms of service
                </label>

                <p className="text-danger fw-bold">
                  {errors?.checkbox?.type === "required" && (
                    <span>Checkbox is required</span>
                  )}
                </p>
              </div>

              <div className="btn-group d-flex">
                <button type="submit" className="btn btn-primary custom_btn">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
