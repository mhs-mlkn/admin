import { Container } from "unstated";
import { pick } from "lodash";

const TAB0 = [
  "name",
  "indexName",
  "dataSourceId",
  "drillDownId",
  "description",
  "tags"
];
const TAB1 = ["query", "params", "columns", "template"];
const TAB2 = ["type", "chartType"];
const TAB3 = ["filters"];
const TAB4 = ["config"];

const TABS = {
  0: TAB0,
  1: TAB1,
  2: TAB2,
  3: TAB3,
  4: TAB4
};

const configString = '{"refreshInterval":0}';

export class EditReportContainer extends Container {
  state = {
    report: {
      id: 0,
      name: "",
      indexName: "",
      dataSourceId: "",
      drillDownId: "",
      description: "",
      type: "TABLE",
      chartType: "Simple",
      query: "",
      template: "",
      params: [],
      filters: [],
      columns: [],
      config: configString,
      tags: ""
    },
    tab: 0
  };

  initializeReport = async report => {
    const {
      id,
      name,
      type,
      chartType,
      query: queryInfo,
      drillDownId = "",
      description,
      config = configString,
      tags = ""
    } = report;

    const {
      dataSourceId,
      indexName = "",
      query,
      template,
      queryParams: params,
      queryFilters: filters,
      queryColumns: columns
    } = queryInfo;

    return this.setState({
      report: {
        id,
        name,
        indexName,
        dataSourceId,
        drillDownId,
        description,
        type,
        chartType,
        query,
        template,
        params,
        filters,
        columns,
        config,
        tags: tags.split(",").join(" ")
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
        indexName: "",
        dataSourceId: "",
        drillDownId: "",
        description: "",
        type: "TABLE",
        chartType: "Simple",
        query: "",
        template: "",
        params: [],
        filters: [],
        columns: [],
        config: configString,
        tags: ""
      },
      tab: 0
    });
  };

  setTab = async tab => {
    return this.setState({ tab });
  };

  getReport = (tab = undefined) => {
    return pick(
      this.state.report,
      TABS[tab === undefined ? this.state.tab : tab]
    );
  };
}

const container = new EditReportContainer();

export default container;
