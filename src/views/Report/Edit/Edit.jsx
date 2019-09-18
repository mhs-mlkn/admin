import React, { Component } from "react";
import { withSnackbar } from "notistack";
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
import Config from "./Config";

class ReportEdit extends Component {
  suggestions = [];
  state = {
    loading: false,
    error: ""
  };

  componentDidMount = async () => {
    try {
      await this.setState({ loading: true });
      await this.loadData();
      await this.initialReport();
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
    this.suggestions = await ReportContainer.getAllSummary();
  };

  initialReport = async () => {
    const reportId = +this.props.match.params.id;
    if (reportId) {
      let report = await ReportContainer.get(reportId);
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
      .catch(error => {
        this.props.enqueueSnackbar("درخواست با خطا مواجه شد", {
          variant: "error"
        });
        this.setState({ loading: false, error: error.message });
      });
  };

  render = () => {
    const { loading } = this.state;
    return (
      <Subscribe to={[EditContainer]}>
        {container => (
          <Page loading={loading}>
            <AppBar
              position="static"
              style={{
                marginRight: process.env.NODE_ENV === "production" && "0"
              }}
            >
              <Tabs value={container.state.tab} onChange={this.handleChange}>
                <Tab
                  label="اطلاعات پایه"
                  disabled={container.state.tab !== 0}
                />
                <Tab label="کوئری" disabled={container.state.tab !== 1} />
                <Tab label="نمایش" disabled={container.state.tab !== 2} />
                <Tab label="فیلتر" disabled={container.state.tab !== 3} />
                <Tab label="تنظیمات" disabled={container.state.tab !== 4} />
              </Tabs>
            </AppBar>
            {container.state.tab === 0 && (
              <Basic suggestions={this.suggestions} />
            )}
            {container.state.tab === 1 && <Query />}
            {container.state.tab === 2 && <Presentation />}
            {container.state.tab === 3 && (
              <Filters suggestions={this.suggestions} />
            )}
            {container.state.tab === 4 && <Config onSubmit={this.saveReport} />}
          </Page>
        )}
      </Subscribe>
    );
  };
}

export default withSnackbar(ReportEdit);
