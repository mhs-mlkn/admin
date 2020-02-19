import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContainer from "../containers/Auth.container";
import { Subscribe } from "unstated";
import routes, { loginRoute } from "../routes";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Subscribe to={[AuthContainer]}>
    {Auth => (
      <Route
        {...rest}
        render={props => {
          const route = routes.find(r => r.path === props.match.path);
          return Auth.hasRole(route.role) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: loginRoute.path,
                state: { from: props.location }
              }}
            />
          );
        }}
      />
    )}
  </Subscribe>
);

export default PrivateRoute;
