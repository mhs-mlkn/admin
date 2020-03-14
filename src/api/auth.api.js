export default class AuthApi {
  static getToken = async (code, code_verifier) => {
    const BASE_URL = process.env.REACT_APP_POD_SSO_TOKEN;
    const redirect_uri = window.location.href.split("?")[0];
    const params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      code,
      code_verifier,
      redirect_uri
    };
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams(params);
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).then(res => res.json());
  };

  static refreshToken = async (refresh_token, code_verifier) => {
    const BASE_URL = process.env.REACT_APP_POD_SSO_TOKEN;
    const params = {
      grant_type: "refresh_token",
      client_id: process.env.REACT_APP_CLIENT_ID,
      refresh_token,
      code_verifier
    };
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams(params);
    return fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).then(res => res.json());
  };

  static getUser = async access_token => {
    const url = "https://accounts.pod.ir/users";

    return fetch(url, {
      headers: new Headers({ Authorization: `Bearer ${access_token}` })
    }).then(res => res.json());
  };

  static fetchUserRoles = async access_token => {
    return Promise.resolve(["ADMIN"]);
  };
}
