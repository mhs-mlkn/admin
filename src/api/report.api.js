import axios from "axios";
import { groupBy } from "lodash";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
const reportUrl = `${process.env.REACT_APP_BASE_URL}/report`;

export default class ReportApi {
  static getAll = async (page = 0, size = 10, other = {}) => {
    const params = { page, size, ...other };
    return axios.get(`${reportUrl}`, { params }).then(res => res.data.result);
  };

  static getAllSummary = async () => {
    return axios.get(`${reportUrl}/names`).then(res => res.data.result);
  };

  static get = async id => {
    return axios.get(`${reportUrl}/${id}`).then(res => res.data.result);
  };

  static getUserReport = async id => {
    return axios
      .get(`${reportUrl}/userReport/${id}`)
      .then(res => res.data.result);
  };

  static getDBSources = async () => {
    return axios
      .get(`${baseUrl}/user/getConnList`)
      .then(res => res.data.result)
      .then(data => ({
        "": [],
        ...groupBy(data, "dbType")
      }));
  };

  static update = async report => {
    return axios
      .put(`${reportUrl}/${report.id}`, report)
      .then(res => res.data.result);
  };

  static create = async report => {
    return axios.post(`${reportUrl}`, report).then(res => res.data.result);
  };

  static delete = async id => {
    return axios.delete(`${reportUrl}/${id}`).then(res => res.data.result);
  };

  static getReportBusinesses = async reportId => {
    return axios
      .get(`${reportUrl}/${reportId}/businesses`)
      .then(res => res.data.result.data);
  };

  static addReportBusiness = async (reportId, identity) => {
    return axios
      .get(`${reportUrl}/${reportId}/addBusiness?identity=${identity}`)
      .then(res => res.data.result)
      .catch(err => {
        throw new Error(err.response.data.message || "درخواست با خطا مواجه شد");
      });
  };

  static removeReportBusiness = async (reportId, userId) => {
    return axios
      .get(`${reportUrl}/${reportId}/removeUserGroup?id=${userId}`)
      .then(res => res.data.result.userVOList);
  };

  static reportData = async (
    id,
    filterVOS = [],
    parentParams = [],
    page,
    size
  ) => {
    const params = { page, size };
    return axios
      .post(
        `${baseUrl}/report/${id}/exec`,
        {},
        { params, headers: { "Content-Type": "application/json" } }
      )
      .then(res => res.data.result);
  };
}
