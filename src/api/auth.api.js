import Axios from "axios";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/auth`;

export default class AuthApi {
  static getToken = async (code, code_verifier) => {
    const BASE_URL = process.env.REACT_APP_POD_SSO_TOKEN;
    const params = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      code,
      code_verifier,
      redirect_uri: process.env.REACT_APP_REDIRECT_URI
    };
    return Axios.post(`${BASE_URL}`, null, { params }).then(res => res.data);
  };

  static refreshToken = async (token, refresh) => {
    return Axios.get(`${baseUrl}/refresh`, {
      params: { token, refresh }
    })
      .then(res => res.data)
      .then(data => data.result);
  };

  static getUser = async access_token => {
    const url = "https://accounts.pod.land/users";

    return fetch(url, {
      headers: new Headers({ Authorization: `Bearer ${access_token}` })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      });
  };

  static logout = async () => {
    const URL = process.env.REACT_APP_POD_SSO_LOGOUT;
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      continue: process.env.REACT_APP_REDIRECT_URI,
      prompt: "none"
    };
    return Axios.get(`${URL}`, { params });
  };
}
