import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Page from "../../components/Page/Page";
import Auth from "../../containers/Auth.container";

const LOGIN_URL = `${process.env.REACT_APP_LOGIN_URL}`;
const parseQueryString = (queryParams = "") => {
  return queryParams
    ? queryParams
        .split("&")
        .map(str => {
          let [key, value] = str.split("=");
          return { [key]: decodeURI(value) };
        })
        .reduce((prev, curr) => Object.assign(prev, curr))
    : null;
};

class Login extends Component {
  state = {
    loading: false,
    error: ""
  };

  componentDidMount = () => {
    const qs = parseQueryString(this.props.location.search.slice("1"));
    if (qs && qs.token && qs.refresh && qs.expires) {
      Auth.login(qs);
      this.props.history.push("/");
    } else {
      this.setState({ error: "خطای دریافت اطلاعات" });
    }
    console.log(qs);
  };

  render = () => {
    const { loading, error } = this.state;
    return (
      <Page loading={loading}>
        <Typography component="p">
          برای ادامه باید{" "}
          <Link href={LOGIN_URL} color="primary">
            وارد
          </Link>{" "}
          شوید
        </Typography>
      </Page>
    );
  };
}

export default Login;
