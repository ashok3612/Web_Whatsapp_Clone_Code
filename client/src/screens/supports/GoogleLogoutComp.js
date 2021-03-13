import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { googleClientID } from "../../env_Variables/ENV_Constants";
import { userLoggedOut } from "../../redux/actions/user.Actions";

export function GoogleLogoutComp(props) {
  const dispatch = useDispatch();
  const cliendId = googleClientID;
  const history = useHistory();

  const onSuccess = res => {
    dispatch(userLoggedOut());
    history.push("/login");
  };

  return (
    <div>
      <GoogleLogout
        clientId={cliendId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
