import axios from "axios";

const BaseUrl = `${process.env.REACT_APP_BASE_URL}`;
const AlertUrl = `${process.env.REACT_APP_BASE_URL}/alert`;

export default class AlertApi {
  static getAll = async (reportId, page = 0, size = 10, other = {}) => {
    const url = `${BaseUrl}/report/${reportId}/alerts`;
    const params = { page, size, ...other };
    return axios.get(`${url}`, { params }).then(res => res.data.result);
  };

  static create = async (reportId, alert) => {
    return axios
      .post(`${AlertUrl}`, alert, { params: { reportId } })
      .then(res => res.data.result);
  };

  static delete = async id => {
    return axios.delete(`${AlertUrl}/${id}`).then(res => res.data.result);
  };
}
