import { Container } from "unstated";
import Api from "../api/resource.api";

export class ResourceContainer extends Container {
  state = {
    totalCount: 0,
    dbSources: []
  };

  getAll = async (params, role = "ADMIN") => {
    const api = role === "ADMIN" ? Api.getAll : Api.getAllManager;
    const result = await api(params);
    return this.setState({
      dbSources: result.data,
      totalCount: result.totalSize
    });
  };

  get = async id => {
    let item = this.state.dbSources.find(r => r.id === id);
    if (!item) {
      item = await Api.get(id);
    }
    return item;
  };

  createElastic = async formData => {
    return Api.createElastic(formData);
  };

  createFile = async data => {
    return Api.createFile(data);
  };

  createOData = async data => {
    return Api.createOData(data);
  };

  createSql = async data => {
    return Api.createSql(data);
  };

  delete = async id => {
    await Api.delete(id);
    const dbSources = this.state.dbSources.filter(r => r.id !== id);
    return this.setState({ dbSources, totalCount: this.state.totalCount - 1 });
  };
}

const container = new ResourceContainer();

export default container;
