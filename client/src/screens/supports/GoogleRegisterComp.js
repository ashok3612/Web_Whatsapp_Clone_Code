import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { spinnerContext } from "../../App";
import { googleClientID } from "../../env_Variables/ENV_Constants";
import { registerUserToApp } from "../../redux/action-listners/user.ActionListener";

const cliendId = googleClientID;
let isLogin = false;

export function Googleregistercomp(props) {
  const dispatch = useDispatch();
  let isRegister = false;
  const context = useContext(spinnerContext);
  context(false);

  const onSuccess = (res) => {
    if (isRegister) {
      if (res) {
        const succObj = {
          type: "Success",
          res: res.profileObj,
        };
        if (isLogin) {
          dispatch(registerUserToApp(succObj));
        }
        document.getElementById("buttons_Div").firstChild.click();
      }
    }
    isRegister = false;
  };

  const onFailure = (res) => {
    if (res) {
      const errorObj = {
        type: "Error",
        res: res,
      };
      if (isRegister) {
        console.log("Error", errorObj.type, errorObj.res);
        registerUserToApp(errorObj);
        isRegister = false;
      }
    }
  };

  return (
    <div
      onClick={() => {
        isLogin = true;
      }}
    >
      <div onClick={() => (isRegister = true)}>
        <GoogleLogin
          clientId={cliendId}
          buttonText="Register with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
      <div id="buttons_Div" style={{ display: "none" }}>
        <GoogleLogout
          clientId={cliendId}
          buttonText="Logout from Whatsapp"
          onLogoutSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
