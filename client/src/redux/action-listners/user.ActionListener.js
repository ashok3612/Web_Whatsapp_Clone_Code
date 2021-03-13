import axios from "axios";
import {
  commonError,
  userLoggedIn,
  userLoggedInFail,
  userRegisterFail,
  userRegisterSuccess,
} from "../actions/user.Actions";
import { toast } from "react-toastify";
import { apiURL } from "../../env_Variables/ENV_Constants";

export const registerUserToApp = (response) => {
  if (response.type === "Error") {
    toast.error(
      `Registration Failed 😰, Reason: ${response.res.error.toUpperCase()}`,
      {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }

  return (dispatch) => {
    if (response.type === "Success") {
      const LoginUserURL = `${apiURL}/api/v1/user/getById`;
      const config = {
        "Content-Type": "application/json",
      };
      const data = {
        _id: response.res.googleId,
      };
      axios.post(LoginUserURL, data, config).then((res) => {
        console.log(res.data);
        if (!res.data.error) {
          toast.error(
            `Registration prohibted 😰, Reason: User Already Registered`,
            {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          const registerURL = `${apiURL}/api/v1/user/postUser`;
          const config = {
            "Content-Type": "application/json",
          };
          const data = {
            ...response.res,
          };
          axios.post(registerURL, data, config).then((res) => {
            console.log(res.data);
            if (res.data.googleId) {
              dispatch(userRegisterSuccess(res.data));
            } else {
              dispatch(userRegisterFail(res.data));
            }
          })
          .catch((error) => {
            dispatch(commonError(error));
          });;
        }
      });
    }
  };
};

export const loginUserToApp = (response) => {
  console.log(response)
  if (response.type === "Error") {
    toast.error(
      `Login Failed 😰, Reason: ${response.res.error ? response.res.error.toUpperCase(): ""}`,
      {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  }
  return (dispatch) => {
    let successData = {
      currentUser: {},
      users: [],
    };
    if (response.type === "Success") {
      const LoginUserURL = `${apiURL}/api/v1/user/getById`;
      const config = {
        "Content-Type": "application/json",
      };
      const data = {
        _id: response.res.googleId,
      };
      axios
        .post(LoginUserURL, data, config)
        .then((res) => {
          if (res.data.error) {
            toast.error(
              `User not found...!!! Please Register before Login...🙏`,
              {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            dispatch(userLoggedInFail(res.data.error));
            document.getElementById("login_logout").firstChild.click();
          } else {
            const getAllUsersURL =
            `${apiURL}/api/v1/user/getAllUsers`;
            successData = {
              currentUser: res.data,
            };
            dispatch(userLoggedIn(successData));
            toast.success(
              `Successfully Logged as ${successData.currentUser.name} 😀`,
              {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            sessionStorage.setItem(
              "loggedUser",
              JSON.stringify(successData.currentUser)
            );
            axios.get(getAllUsersURL).then((res) => {
              if (res.data.error) {
                dispatch(commonError(res.data.error));
                toast.error(
                  `Error while getting All Your Friends, ${res.data.error} 😕`,
                  {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              } else {
                successData = {
                  ...successData,
                  users: res.data,
                };
                dispatch(userLoggedIn(successData));
              }
            })
            .catch((error) => {
              dispatch(commonError(error));
            });;
          }
        })
        .catch((err) => {
          dispatch(userLoggedInFail(err));
        });
    }
  };
};

export const setStateBySessionData = (response) => {
  return (dispatch) => {
    let successData = {};
    if (response.type === "Success") {
      const getAllUsersURL = `${apiURL}/api/v1/user/getAllUsers`;
      successData = {
        users: [],
        currentUser: response.res,
      };
      dispatch(userLoggedIn(successData));
      axios.get(getAllUsersURL).then((res) => {
        if (res.data.error) {
          dispatch(commonError(res.data.error));
          toast.error(
            `Error while getting All Your Friends, ${res.data.error} 😕`,
            {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          successData = {
            ...successData,
            users: res.data,
          };
          dispatch(userLoggedIn(successData));
        }
      })
      .catch((error) => {
        dispatch(commonError(error));
      });
    }
  };
};
