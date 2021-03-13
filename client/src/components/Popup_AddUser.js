import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./Popup_AddUser.css";
import { Sidebaruser } from "./sidebar_components/SidebarUser";
import { useState } from "react";
import { getSingleUser } from "../redux/action-listners/user.ActionListener";

export default function PopupAdduser(props) {
  const setCloseHandler = props.closeHandler;
  let [email, setEmail] = useState("");
  let [validEmail, setValidEmail] = useState(false);
  let [searchedUser, setsearchedUser] = useState({});

  const handleClose = () => {
    setCloseHandler(false);
  };

  const setUserEmailHandler = async (localEmail) => {
    setEmail(localEmail);
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
        setValidEmail(true);
      const user = await getSingleUser({
        email: localEmail,
      });
      if(user.Error !== undefined){
          return
      }
      setsearchedUser(user);
    } else {
      setValidEmail(false);
      setsearchedUser({});
    }
  };

//   const debounce = (func, delay) => {
//     let debounceTimer;
//     return function () {
//       const context = this;
//       const args = arguments;
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => func.apply(context, args), delay);
//     };
//   };

  return (
    <div>
      <Dialog
        open={props.show}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Chat</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter full email id of your friend to begin chat with him/her.
          </DialogContentText>
          <TextField
            value={email}
            autoComplete="off"
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e) => setUserEmailHandler(e.target.value)}
          />
          <hr />
          {console.log(validEmail)}
          {validEmail ? (
            searchedUser.googleId !== undefined ? 
              <div onClick={handleClose}>
                <Sidebaruser active={false} user={searchedUser} />
              </div>
            : (
              <font style={{ color: "red" }}>Sorry, User not found...☹</font>
            )
          ) : (
            <font style={{ color: "red" }}>
              Please enter enter valid email...🙇
            </font>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
