import { Store } from "./redux/store/Store";
import "./App.css";
import { MainWhatsApp } from "./components/mainWhatsapp";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";


function App() {

  return (
    <Provider store={Store}>
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
      </div>
    </Provider>
  );
}

export default App;
