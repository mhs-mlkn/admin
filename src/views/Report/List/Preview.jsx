import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table/Table";
import Scalar from "../../../components/Scalar/Scalar";
import Chart from "../../../components/Chart/Chart";
import ReportContainer from "../../../containers/Report.container";
import {
  data,
  columns,
  Scalar as ScalarData,
  Charts as ChartData
} from "../../../mockdata";

const ASPECT_RATIO = 1.777777777777778;

class Preview extends Component {
  state = { error: "", loading: false };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const reportId = +this.props.match.params.id;
      await ReportContainer.get(reportId);
    } catch (error) {}
  };

  getReport = () => {
    const { reportType /* chartType */ } = this.props;
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
          <Chart aspect={ASPECT_RATIO} data={ChartData} type={reportType} />
        );
    }
  };

  render = () => {
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
