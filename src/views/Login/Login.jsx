import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Page from "../../components/Page/Page";
import Auth from "../../containers/Auth.container";

const SSO = process.env.REACT_APP_POD_SSO_CODE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function parseQueryString(queryParams = "") {
  return queryParams
    ? queryParams
        .split("&")
        .map(str => {
          let [key, value] = str.split("=");
          return { [key]: decodeURI(value) };
        })
        .reduce((prev, curr) => Object.assign(prev, curr))
    : null;
}

class Login extends Component {
  state = {
    loading: false,
    error: ""
  };

  componentDidMount = async () => {
    const qs = parseQueryString(this.props.location.search.slice("1"));
    if (qs && qs.code) {
      try {
        await Auth.getToken(qs.code);
        await Auth.fetchUser();
      } catch (error) {
        console.log(">>> ", error);
        this.setState({ error });
      } finally {
        this.props.history.push("/");
      }
    }
  };

  login = e => {
    e.preventDefault();
    const token_verifier = Auth.generateVerifier();
    const CHALLENGE_CODE = Auth.getChallenegeCode(token_verifier);
    const redirect_uri = window.location.href.split("?")[0];
    const LOGIN_URL = `${SSO}&scope=profile email&client_id=${CLIENT_ID}&code_challenge=${CHALLENGE_CODE}&redirect_uri=${redirect_uri}`;
    window.location.href = LOGIN_URL;
  };

  render = () => {
    const { loading } = this.state;
    return (
      <Page loading={loading}>
        <Typography component="p" variant="h6" color="textSecondary">
          برای ادامه باید{"  "}
          <Link href={""} color="secondary" onClick={this.login}>
            وارد
          </Link>
          {"  "}
          شوید
        </Typography>
      </Page>
    );
  };
}

export default Login;
