import React, { Component } from "react";
import { Subscribe } from "unstated";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditContainer from "./EditReport.container";
import ReportContainer from "../../../containers/Report.container";
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
      await this.loadData();
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

  loadData = async () => {
    await ReportContainer.getDBSources();
    this.setState({ loading: false });
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
      .then(() => this.props.history.push(`/reports/list`))
      .catch(error => this.setState({ loading: false, error: error.message }));
  };

  render = () => {
    return (
      <Subscribe to={[EditContainer]}>
        {container => (
          <>
            <AppBar position="static" color="default">
              <Tabs
                value={container.state.tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.handleChange}
              >
                <Tab label="اطلاعات پایه" disabled />
                <Tab label="نمایش" disabled />
                <Tab label="کوئری" disabled />
                <Tab label="فیلتر" disabled />
              </Tabs>
            </AppBar>
            {container.state.tab === 0 && <Basic />}
            {container.state.tab === 1 && <Presentation />}
            {container.state.tab === 2 && <Query />}
            {container.state.tab === 3 && (
              <Filters onSubmit={this.saveReport} />
            )}
          </>
        )}
      </Subscribe>
    );
  };
}

export default ReportEdit;
