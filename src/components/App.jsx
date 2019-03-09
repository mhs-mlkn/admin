import React, { useEffect } from "react";
import { Provider } from "unstated";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AuthContainer from "../containers/Auth.container";
import RTLLayout from "../layouts/RTL";

const App = () => {
  useEffect(() => {
    AuthContainer.isLoggedIn() && AuthContainer.getUserData();
  });

  return (
    <Provider>
      <Router>
        <Switch>
          <Route path="/admin" component={RTLLayout} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
