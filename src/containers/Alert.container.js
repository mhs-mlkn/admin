import { Container } from "unstated";
import Api from "../api/alert.api";

export class AlertContainer extends Container {
  state = {
    totalCount: 0,
    alerts: []
  };

  getAll = async (reportId, page, size, params) => {
    const data = await Api.getAll(reportId, page, size, params);
    await this.setState({ alerts: data.data, totalCount: data.totalSize });
    return data;
  };

  save = async (reportId, alert) => {
    return await Api.create(reportId, {
      ...alert,
      metadata: JSON.stringify(alert.metadata)
    });
  };

  delete = async id => {
    await Api.delete(id);
    const alerts = this.state.alerts.filter(r => r.id !== id);
    return this.setState({ alerts, totalCount: this.state.totalCount - 1 });
  };
}

const container = new AlertContainer();

export default container;
