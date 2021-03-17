import { Store } from "./redux/store/Store";
import "./App.css";
import { MainWhatsApp } from "./components/mainWhatsapp";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { createContext, useState } from "react";

export let spinnerContext = createContext();

function App() {
  let [isSpin, setIsSpin] = useState(false);

  const spinnerHandler = (val) => {
    setIsSpin(val);
  };

  return (
    <Provider store={Store}>
      <spinnerContext.Provider value={spinnerHandler}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/wapp">
                <MainWhatsApp />
              </Route>
              <Route path="*" exact>
                <Redirect to="/login"></Redirect>
              </Route>
            </Switch>
          </BrowserRouter>
          {isSpin ? (
            <Loader
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: "-4em",
                marginLrIGHT: "-4em",
              }}
              type="TailSpin"
              color="red"
              height={100}
              width={100}
            />
          ) : (
            " "
          )}
        </div>
      </spinnerContext.Provider>
    </Provider>
  );
}

export default App;
