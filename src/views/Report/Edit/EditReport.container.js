import { Container } from "unstated";
import { pick } from "lodash";

const TAB0 = ["name", "source", "dataSource", "drillDownId", "description"];
const TAB1 = ["type", "chartType"];
const TAB2 = ["query", "params"];
const TAB3 = ["filters"];

const TABS = {
  0: TAB0,
  1: TAB1,
  2: TAB2,
  3: TAB3
};

export class EditReportContainer extends Container {
  state = {
    report: {
      id: 0,
      name: "",
      source: "",
      dataSource: "",
      drillDownId: "",
      description: "",
      type: "Table",
      chartType: "Table",
      query: "",
      params: [],
      filters: []
    },
    tab: 0
  };

  initializeReport = async report => {
    const {
      id,
      name,
      type,
      chartType,
      source,
      query: queryInfo,
      drillDownId = "",
      description
    } = report;

    const {
      dataSource,
      query,
      queryParams: params,
      queryFilters: filters
    } = queryInfo;

    return this.setState({
      report: {
        id,
        name,
        source,
        dataSource,
        drillDownId,
        description,
        type,
        chartType,
        query,
        params,
        filters
      }
    });
  };

  setReport = async data => {
    const report = { ...this.state.report, ...data };
    return this.setState({ report });
  };

  resetReport = async () => {
    return this.setState({
      report: {
        id: 0,
        name: "",
        type: "",
        chartType: "",
        source: "",
        dataSource: "",
        drillDownId: "",
        query: "",
        params: [],
        filters: [],
        description: ""
      },
      tab: 0
    });
  };

  setTab = async tab => {
    return this.setState({ tab });
  };

  getReport = () => {
    return pick(this.state.report, TABS[this.state.tab]);
  };
}

const container = new EditReportContainer();

export default container;
