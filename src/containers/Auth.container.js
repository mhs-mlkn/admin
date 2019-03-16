import { Container } from "unstated";
import Axios from "axios";
import AuthApi from "../api/auth.api";
import { createHash, randomBytes } from "crypto";

const TOKEN = "ADMIN_TOKEN";
const VERIFIER = "ADMIN_VERIFIER";
const REFRESH = "ADMIN_REFRESH";
const EXPIRES = "ADMIN_EXPIRES";
const USER = "ADMIN_USER";

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function sha256(buffer) {
  return createHash("sha256")
    .update(buffer)
    .digest();
}

export class AuthContainer extends Container {
  constructor(props) {
    super(props);

    this.initialize();
  }

  initialize = () => {
    this.token = localStorage.getItem(TOKEN) || "";
    this.verifier = localStorage.getItem(VERIFIER) || "";
    this.refresh = localStorage.getItem(REFRESH) || "";
    this.expires = localStorage.getItem(EXPIRES) || undefined;
    this.user = localStorage.getItem(USER) || "";
    this.hasTokenIssued = false;
    this.token && (Axios.defaults.headers.common["access_token"] = this.token);
  };

  generateVerifier = () => {
    this.verifier = base64URLEncode(randomBytes(32));
    this.saveToLS();
    return this.verifier;
  };

  getChallenegeCode = () => {
    return base64URLEncode(sha256(this.verifier));
  };

  checkToken = async code => {
    return AuthApi.getToken(code, this.verifier).then(result => {
      if (result.access_token) {
        return this.login(result);
      } else {
        return Promise.reject("NO ACESS_TOKEN");
      }
    });
  };

  login = ({ access_token, refresh_token, expires_in }) => {
    Axios.defaults.headers.common["access_token"] = access_token;
    this.token = access_token;
    this.refresh = refresh_token;
    this.expires = expires_in * 1000 + Date.now() - 10;
    this.saveToLS();
  };

  refreshToken = async () => {
    if (Date.now() > this.expires && !this.hasTokenIssued) {
      this.hasTokenIssued = true;
      const refreshToken = await AuthApi.refreshToken(this.token, this.refresh);
      this.hasTokenIssued = false;
      const { token, refreshToken: refresh, timeout: expires } = refreshToken;
      this.login({ token, refresh, expires });
    }
    return Promise.resolve(this.token);
  };

  isLoggedIn = () => {
    this.token = localStorage.getItem(TOKEN) || "";
    return !!this.token;
  };

  logout = async () => {
    this.token = this.verifier = this.refresh = this.expires = this.user = "";
    this.saveToLS();
    localStorage.setItem(USER, "");
    Axios.defaults.headers.common["access_token"] = "";
    // await AuthApi.logout();
    return Promise.resolve();
  };

  getUserData = async () => {
    const user = await AuthApi.getUser(this.token);
    this.user = user.preferred_username;
    localStorage.setItem(USER, this.user);
    return this.user;
  };

  saveToLS = () => {
    localStorage.setItem(TOKEN, this.token);
    localStorage.setItem(VERIFIER, this.verifier);
    localStorage.setItem(REFRESH, this.refresh);
    localStorage.setItem(EXPIRES, this.expires);
  };
}

const container = new AuthContainer();

export default container;
