import { Container } from "unstated";
import axios from "axios";
import AuthApi from "../api/auth.api";

const TOKEN = "TOKEN";
const REFRESH = "REFRESH";
const EXPIRES = "EXPIRES";
const USER = "USER";

export class AuthContainer extends Container {
  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize = () => {
    let token = localStorage.getItem(TOKEN) || "";
    let refresh = localStorage.getItem(REFRESH) || "";
    let expires = localStorage.getItem(EXPIRES) || undefined;
    this.LOGIN_INFO = { token, refresh, expires };
    this.hasTokenIssued = false;
    token && (axios.defaults.headers.common["token"] = token);
  };

  login = ({ token, refresh, expires }) => {
    axios.defaults.headers.common["token"] = token;
    expires = expires * 1000 + Date.now() - 500;
    this.LOGIN_INFO = { token, refresh, expires };
    this.saveToLS(this.LOGIN_INFO);
  };

  refreshToken = async () => {
    if (Date.now() > this.LOGIN_INFO.expires && !this.hasTokenIssued) {
      this.hasTokenIssued = true;
      const refreshToken = await AuthApi.refreshToken(this.LOGIN_INFO);
      this.hasTokenIssued = false;
      const { token, refreshToken: refresh, timeout: expires } = refreshToken;
      this.login({ token, refresh, expires });
    }
    return Promise.resolve(this.LOGIN_INFO);
  };

  isLoggedIn = () => {
    this.initialize();
    return !!this.LOGIN_INFO.token;
  };

  logout = async () => {
    this.LOGIN_INFO = {};
    this.saveToLS({ token: "", refresh: "", expires: "" });
    localStorage.setItem(USER, "");
    await AuthApi.logout();
    axios.defaults.headers.common["token"] = "";
    return Promise.resolve();
  };

  getUserData = async () => {
    const user = await AuthApi.getUser();
    localStorage.setItem(USER, JSON.stringify(user));
    return user;
  };

  saveToLS = ({ token, refresh, expires }) => {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(REFRESH, refresh);
    localStorage.setItem(EXPIRES, expires);
  };
}

const container = new AuthContainer();

export default container;
