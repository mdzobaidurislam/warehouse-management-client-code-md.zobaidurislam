import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import auth from "../Firebase/Firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const Contact = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

  // handleRegister
  const handleRegister = async (data) => {
    console.log(data.name);
    reset();
  };
  return (
    <div className="login_section ptb_80">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-lg-7">
            <form
              className="login_form mt-4"
              onSubmit={handleSubmit(handleRegister)}
            >
              <h1>
                Contact <span className="text_color">Us</span>
              </h1>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="rname">Your Name</label>
                    <input
                      {...register("rname", { required: true })}
                      className="form_control"
                      id="name"
                      type="text"
                    />
                    <p className="text-danger fw-bold">
                      {errors?.rname?.type === "required" && (
                        <span>Name is required</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="remail">Email</label>

                    <input
                      {...register("remail", { required: true })}
                      className="form_control "
                      id="remail"
                      type="email"
                      value={user?.email}
                    />
                    <p className="text-danger fw-bold">
                      {errors?.remail?.type === "required" && (
                        <span>Email is required</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="remail">Message</label>

                    <textarea
                      {...register("rmsg", { required: true })}
                      className="form_control "
                      id="remail"
                    />
                    <p className="text-danger fw-bold">
                      {errors?.rmsg?.type === "required" && (
                        <span>Message is required</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rcheckbok"
                      {...register("rcheckbox", { required: true })}
                    />
                    <label className="form-check-label" htmlFor="checkbok">
                      I agree to the terms of service
                    </label>

                    <p className="text-danger fw-bold">
                      {errors?.rcheckbox?.type === "required" && (
                        <span>Checkbox is required</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="btn-group d-flex">
                    <button
                      type="submit"
                      className="btn btn-primary custom_btn"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
