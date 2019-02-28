import React, { Component } from "react";
import { Subscribe } from "unstated";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditContainer from "./EditReport.container";
import ReportContainer from "../../../containers/Report.container";
import Page from "../../../components/Page/Page";
import Basic from "./Basic";
import Presentation from "./Presentation";
import Query from "./Query";
import Filters from "./Filters";

class ReportEdit extends Component {
  state = {
    loading: false,
    error: ""
  };

  componentDidMount = async () => {
    try {
      await this.setState({ loading: true });
      const reportId = +this.props.match.params.id;
      await this.loadData(reportId);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({
        error: "دریافت اطلاعات با خطا مواجه شد",
        loading: false
      });
    }
  };

  componentWillUnmount = async () => {
    await EditContainer.resetReport();
  };

  loadData = async reportId => {
    await ReportContainer.getDBSources();
    if (reportId) {
      let report = ReportContainer.state.reports.find(r => r.id === reportId);
      if (!report) {
        return this.props.history.replace("/admin/reports");
      }
      await EditContainer.initializeReport(report);
    }
    // TODO: load all reports
  };

  initialReport = async () => {
    const id = +this.props.match.params.id;
    if (id) {
      let report = ReportContainer.get(id);
      if (!report) {
        return this.props.history.replace("/admin/reports");
      }
      await EditContainer.initializeReport(report);
    }
  };

  onChangeTab = async (_, tab) => {
    await EditContainer.setTab(tab);
  };

  saveReport = report => {
    this.setState({ loading: true });
    ReportContainer.save(report)
      .then(() => this.props.history.push(`/admin/reports`))
      .catch(error => this.setState({ loading: false, error: error.message }));
  };

  render = () => {
    const { loading } = this.state;
    return (
      <Subscribe to={[EditContainer]}>
        {container => (
          <Page loading={loading}>
            <AppBar position="static">
              <Tabs value={container.state.tab} onChange={this.handleChange}>
                <Tab
                  label="اطلاعات پایه"
                  disabled={container.state.tab !== 0}
                />
                <Tab label="نمایش" disabled={container.state.tab !== 1} />
                <Tab label="کوئری" disabled={container.state.tab !== 2} />
                <Tab label="فیلتر" disabled={container.state.tab !== 3} />
              </Tabs>
            </AppBar>
            {container.state.tab === 0 && <Basic />}
            {container.state.tab === 1 && <Presentation />}
            {container.state.tab === 2 && <Query />}
            {container.state.tab === 3 && (
              <Filters onSubmit={this.saveReport} />
            )}
          </Page>
        )}
      </Subscribe>
    );
  };
}

export default ReportEdit;
