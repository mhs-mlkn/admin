import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table/Table";
import Scalar from "../../../components/Scalar/Scalar";
import Chart from "../../../components/Chart/Chart";
import Loading from "../../../components/Loading/Loading";
import ReportContainer from "../../../containers/Report.container";
import {
  data,
  columns,
  Scalar as ScalarData,
  Charts as ChartData
} from "../../../mockdata";

const ASPECT_RATIO = 1.777777777777778;

class Preview extends Component {
  state = { report: "", error: "", loading: false };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const reportId = +this.props.match.params.id;
      const report = await ReportContainer.get(reportId);
      // await ReportContainer.reportData();
      this.setState({ loading: false, report });
    } catch (error) {
      this.setState({ loading: false, error: "خطا در دریافت اطلاعات" });
    }
  };

  getReport = () => {
    const { report } = this.state;
    const { type: reportType /* chartType */ } = report;

    switch (reportType) {
      case "Table":
        return (
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Table
              cols={columns}
              rows={data.slice(0, 4)}
              count={data.length}
              rowsPerPage={10}
              page={0}
            />
          </Grid>
        );

      case "Scalar":
        return (
          <Grid item lg={3} md={3} xs={8} sm={8}>
            <Scalar height={250} data={ScalarData} />
          </Grid>
        );

      default:
        return (
          <Grid item lg={9} md={9} xs={12} sm={12}>
            <Chart aspect={ASPECT_RATIO} data={ChartData} type={reportType} />
          </Grid>
        );
    }
  };

  render = () => {
    const { report, loading, error } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error || !report) {
      return "Error";
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ marginTop: "20px" }}
      >
        {this.getReport()}
      </Grid>
    );
  };
}

export default Preview;
