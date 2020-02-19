import axios from "axios";

// const baseUrl = `${process.env.REACT_APP_BASE_URL}`;
const resourceUrl = `${process.env.REACT_APP_BASE_URL}/datasource`;
const managerUrl = `${process.env.REACT_APP_BASE_URL}/manage/datasource`;

export default class ReportApi {
  static getAll = async params => {
    return axios.get(`${resourceUrl}`, params).then(res => res.data.result);
  };

  static getAllManager = async params => {
    return axios.get(`${managerUrl}`, params).then(res => res.data.result);
  };

  static get = async id => {
    return axios.get(`${resourceUrl}/${id}`).then(res => res.data.result);
  };

  static createElastic = async formData => {
    return axios
      .post(`${resourceUrl}/elastic`, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(res => res.data.result);
  };

  static createFile = async data => {
    return axios.post(`${resourceUrl}/file`, data).then(res => res.data.result);
  };

  static createOData = async data => {
    return axios
      .post(`${resourceUrl}/odata`, data)
      .then(res => res.data.result);
  };

  static createSql = async data => {
    return axios.post(`${resourceUrl}/sql`, data).then(res => res.data.result);
  };

  static delete = async id => {
    return axios.delete(`${resourceUrl}/${id}`).then(res => res.data.result);
  };
}
