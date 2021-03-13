import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLoggedOut } from "../../redux/actions/user.Actions";

export function GoogleLogoutComp(props) {
  const dispatch = useDispatch();
  const cliendId =
  "90784126384-rnfl08fme831sjh1r4g8nphsal6b7aji.apps.googleusercontent.com";
  const history = useHistory();

  const onSuccess = res => {
    dispatch(userLoggedOut());
    history.push("/login");
  };

  return (
    <div>
      <GoogleLogout
        clientId={cliendId}
        buttonText="Logout from Whatsapp"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
