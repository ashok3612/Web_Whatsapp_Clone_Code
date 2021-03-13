import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoogleLoginComp } from "../screens/supports/GoogleLoginComp";
import "./Login.css";

export function Login(props) {
  const history = useHistory();
  const currentUser = useSelector((state) => state.userState.currentUser);
  useEffect(() => {
    if (currentUser.googleId !== undefined) {
      history.push("/wapp");
    }
  }, [currentUser]);

  const registerHandler = () => history.push("/register");
  return (
    <div className="Login__Main">
      <div className="Login__LoginDiv">
        <div className="Login__Header">
          <h3>Login to WhatsApp</h3>
        </div>
        <div className="ogin__Body">
          <div className="Button_Action">
            <GoogleLoginComp />
          </div>
          <div className="Login__Header">
            <h3>New to Whatsapp</h3>
          </div>
          <div className="register_Note">
            Click &nbsp;
            <span
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                registerHandler();
              }}
            >
              here
            </span>{" "}
            to Register
          </div>
        </div>
      </div>
    </div>
  );
}
