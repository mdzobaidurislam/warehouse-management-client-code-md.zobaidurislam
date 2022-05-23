import React from "react";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import auth from "../Firebase/Firebase.init";
import { toast } from "react-toastify";
import SpinnerLoading from "./SpinnerLoading";
const EmailVerify = () => {
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  if (error) {
    return (
      <div>
        <p>Error: {error?.message}</p>
      </div>
    );
  }
  if (sending) {
    return <SpinnerLoading />;
  }
  const HandleEmailVerification = async () => {
    await sendEmailVerification();
    toast("Check your email send email verification link!");
  };
  return (
    <div className=" ptb_80">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7 text-center p-5 shadow">
            <h5 className="text-success">Your are one stape away!!</h5>
            <h2 className=""> Verify your email address!!</h2>
            <p>
              If you verify your email address. You can access Manage Inventory
              page and others option.
            </p>
            <button
              className="btn custom_btn"
              onClick={HandleEmailVerification}
            >
              Send Verification Email Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
