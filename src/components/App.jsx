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
          <Route path="/admin" component={RTLLayout} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
