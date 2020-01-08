import { Container } from "unstated";
import Api from "../api/report.api";
import processElastic from "../util/elastic";

export class ReportContainer extends Container {
  state = {
    totalCount: 0,
    reports: [],
    dbSources: [],
    // dbTypes: [],
    allReports: []
  };

  getAll = async (page, size, params) => {
    const data = await Api.getAll(page, size, params);
    await this.setState({ reports: data.data, totalCount: data.totalSize });
    return data;
  };

  getAllSummary = async () => {
    const data = await Api.getAllSummary();
    const allReports = data.map(([id, label]) => ({ id, label }));
    await this.setState({ allReports });
    return allReports;
  };

  get = async id => {
    let item = this.state.reports.find(r => r.id === id);
    if (!item) {
      item = await Api.get(id);
    }
    return item;
  };

  getDBSources = async () => {
    const dbSources = await Api.getDBSources();
    // const dbTypes = Object.keys(dbSources);
    return this.setState({ dbSources });
  };

  save = async values => {
    const {
      id,
      name,
      type,
      indexName,
      dataSourceId,
      drillDownId,
      query,
      metadata,
      params: queryParams,
      filters: queryFilters,
      columns: queryColumns,
      description,
      config,
      tags
    } = values;

    const report = {
      id,
      name,
      type,
      drillDownId: drillDownId || -1,
      description,
      query: {
        query,
        metadata,
        dataSource: { id: dataSourceId },
        indexName,
        queryParams,
        queryFilters,
        queryColumns
      },
      config,
      tags: tags.split(" ").join(",")
    };

    if (id > 0) {
      await Api.update(report);
      const reports = this.state.reports.map(r => {
        if (report.id === r.id) {
          return {
            ...r,
            ...report
          };
        }
        return r;
      });
      return this.setState({ reports });
    }
    const newReportId = await Api.create(report);
    const newReport = await this.get(newReportId);
    const reports = [newReport, ...this.state.reports];
    return this.setState({ reports });
  };

  delete = async id => {
    await Api.delete(id);
    const reports = this.state.reports.filter(r => r.id !== id);
    return this.setState({ reports, totalCount: this.state.totalCount - 1 });
  };

  reportData = async (
    reportId,
    filters = [],
    params = [],
    page = 0,
    size = 0
  ) => {
    // const report = this.state.reports.find(r => r.id === +reportId);
    const report = await this.get(+reportId);

    if (!!report) {
      return Api.reportData(reportId, filters, params, page, size).then(
        data => {
          if (report.query.dataSource.type === "ELASTICSEARCH") {
            return processElastic(
              JSON.parse(data.rawData),
              report.query.metadata
            );
          }
          return data;
        }
      );
    }
    return Promise.reject("report doesn't exist");
  };

  publicize = async reportId => {
    return Api.publicize(reportId);
  };

  unpublicize = async reportId => {
    return Api.unpublicize(reportId);
  };
}

const container = new ReportContainer();

export default container;
