import React from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../Firebase/Firebase.init";

const ResetPassword = () => {
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});
  const handleResetPassword = async (data) => {
    await sendPasswordResetEmail(data.reset_email);
    toast("Check your email send rest password link! ");
    reset();
  };
  return (
    <div className="login_section ptb_80">
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-lg-6">
            <form
              className="login_form mt-4"
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <h1>Reset Password</h1>
              <div className="form-group mb-3">
                <input
                  {...register("reset_email", { required: true })}
                  className={`form_control ${
                    errors?.reset_email ? "is-invalid" : ""
                  }`}
                  id="reset_email"
                  type="email"
                  placeholder="Enter email address"
                />
                <div className="invalid-feedback">
                  {errors?.reset_email?.type === "required" && (
                    <p>Email is required</p>
                  )}
                </div>
              </div>

              <div className="btn-group d-flex">
                <button type="submit" className="btn btn-primary custom_btn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
