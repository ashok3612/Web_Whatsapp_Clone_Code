import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { spinnerContext } from "../../App";
import { googleClientID } from "../../env_Variables/ENV_Constants";
import { loginUserToApp } from "../../redux/action-listners/user.ActionListener";
import { Refreshtoken } from "./refreshToken";

const cliendId = googleClientID;
let isLogin = false;

export function GoogleLoginComp(props) {
  const dispatch = useDispatch();
  const context = useContext(spinnerContext);
  context(false);

  const onSuccess = (res) => {
    const succObj = {
      type: "Success",
      res: res.profileObj,
    };
    if (isLogin) {
      context(true);
      dispatch(loginUserToApp(succObj));
      Refreshtoken(res);
      isLogin = false;
    }
  };

  const onFailure = (res) => {
    const errorObj = {
      type: "Error",
      res: res,
    };
    if (isLogin) {
      console.log("Error", errorObj.type, errorObj.res);
      loginUserToApp(errorObj);
      isLogin = false;
    }
  };

  return (
    <div
      onClick={() => {
        isLogin = true;
      }}
    >
      <GoogleLogin
        clientId={cliendId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
