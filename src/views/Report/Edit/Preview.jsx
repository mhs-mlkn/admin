import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table/Table";
import Scalar from "../../../components/Scalar";
import Chart from "../../../components/Echarts/Chart";
import {
  Table as TableData,
  Scalar as ScalarData
  // Charts as ChartData
} from "../../../mockdata";

class Preview extends Component {
  getReport = () => {
    const { reportType, reportName } = this.props;
    switch (reportType) {
      case "TABLE":
        return (
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Table
              cols={TableData.cols}
              rows={TableData.rows.slice(0, 4)}
              count={TableData.rows.length}
              rowsPerPage={10}
              page={0}
            />
          </Grid>
        );

      case "SCALAR":
        return (
          <Grid item lg={3} md={3} xs={8} sm={8}>
            <Scalar
              report={{ name: reportName }}
              data={ScalarData}
              options={{}}
              colorTheme="default"
              icon="info"
            />
          </Grid>
        );

      default:
        return (
          <Grid item lg={12} md={12} xs={12} sm={12} style={{ height: "70vh" }}>
            <Chart
              report={{ type: reportType }}
              data={TableData}
              theme="light"
            />
          </Grid>
        );
    }
  };

  render = () => {
    return (
      <Grid
        container
        justify="center"
        alignItems="flex-end"
        style={{ marginTop: "20px" }}
      >
        {this.getReport()}
      </Grid>
    );
  };
}

export default Preview;
