import React from "react";
import { Provider } from "unstated";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import RTLLayout from "../layouts/RTL";

const App = () => {
  return (
    <Provider>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route exact path="" component={RTLLayout} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
