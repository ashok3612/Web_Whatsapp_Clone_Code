import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Constants } from "../redux/Constants";
import "./Register.css";
import { Googleregistercomp } from "./supports/GoogleRegisterComp";

export function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const registerStatus = useSelector((state) => state.userState.registerStatus);
  useEffect(() => {
    if (registerStatus) {
      history.push("/login");
      dispatch({
          type: Constants.REGISTER_END
      });
    }
  }, [registerStatus]);

  const loginHandler = () => history.push("/login");

  return (
    <div className="Register__Main">
      <div className="Register__RegisterDiv">
        <div>
          <h2>Hi dude, Welcome to Whatsapp</h2>
        </div>
        <div className="Register__Header">
          <h3>Register to WhatsApp</h3>
        </div>
        <div className="Register__Body">
          <div className="Register_Button_Action">
            <Googleregistercomp />
          </div>
          <div className="Register__Header">
            <h3>Already have an Account </h3>
          </div>
          <div className="Login_Note">
            Click &nbsp;
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                loginHandler();
              }}
            >
              here
            </span>{" "}
            to Login
          </div>
        </div>
      </div>
    </div>
  );
}
