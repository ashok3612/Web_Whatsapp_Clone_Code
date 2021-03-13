import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { registerUserToApp } from "../../redux/action-listners/user.ActionListener";

const cliendId =
  "90784126384-rnfl08fme831sjh1r4g8nphsal6b7aji.apps.googleusercontent.com";
let isLogin = false;

export function Googleregistercomp(props) {
  const dispatch = useDispatch();
  let isRegister = false;

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
