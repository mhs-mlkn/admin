import React, { Component } from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "../../../components/Table/Table";
import Scalar from "../../../components/Scalar/Scalar";
import Chart from "../../../components/Chart/Chart";
import Loading from "../../../components/Loading/Loading";
import ReportContainer from "../../../containers/Report.container";

const ASPECT_RATIO = 1.777777777777778;

function processData(data, report) {
  const { type } = report;
  return type === "SCALAR"
    ? [data.cols[0].key, data.rows[0].cols[0]]
    : getChartData(data);
}

function getChartData({ cols, rows }) {
  let data = [];
  for (const r of rows) {
    const row = r.cols;
    const o = {
      name: row[0]
    };
    for (let index = 1; index < cols.length; index++) {
      const col = cols[index];
      o[col.key] = row[index];
    }
    data.push(o);
  }
  return data;
}

class Preview extends Component {
  data = {
    cols: [],
    rows: []
  };

  totalCount = 0;

  state = { report: "", error: "", loading: false, page: 0, pageSize: 10 };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const reportId = +this.props.match.params.id;
      const report = await ReportContainer.get(reportId);
      if (report.type === "TABLE") {
        await this.loadData();
      } else {
        this.data = await ReportContainer.reportData(reportId);
        this.data = processData(this.data, report);
      }
      this.setState({ loading: false, report });
    } catch (error) {
      const errorMessage = get(error, "response.data.message");
      this.setState({
        loading: false,
        error: errorMessage || "خطا در دریافت اطلاعات"
      });
    }
  };

  componentDidUpdate = async (_, prevState) => {
    const { pageSize, page } = this.state;
    const { pageSize: prevPageSize, page: prevCurrentPage } = prevState;
    if (prevPageSize !== pageSize || prevCurrentPage !== page) {
      await this.loadData();
    }
  };

  loadData = async () => {
    const { pageSize, page } = this.state;
    const reportId = +this.props.match.params.id;

    try {
      this.data = await ReportContainer.reportData(
        reportId,
        null,
        null,
        page,
        pageSize
      );
      this.totalCount = this.getTotalCount(this.data);
      this.setState({ loading: false, error: "" });
    } catch (error) {
      this.setState({ loading: false, error: "خطای بارگذاری اطلاعات" });
    }
  };

  getTotalCount = ({ totalCount }) => {
    const { page } = this.state;
    if (page === 0) {
      return totalCount;
    }
    return this.totalCount;
  };

  handleChangePage = page => {
    this.setState({
      error: "",
      loading: true,
      page
    });
  };

  handleChangePageSize = pageSize => {
    const { page: currentPage } = this.state;
    const totalPages = Math.ceil(this.totalCount / pageSize);
    const page = Math.min(currentPage, totalPages - 1);

    this.setState({
      error: "",
      loading: true,
      pageSize,
      page
    });
  };

  getReport = () => {
    const { report, page, pageSize, loading } = this.state;
    const { type: reportType } = report;

    switch (reportType) {
      case "TABLE":
        return (
          <Grid item lg={12} md={12} xs={12} sm={12}>
            <Table
              cols={this.data.cols}
              rows={this.data.rows}
              count={this.totalCount}
              page={page}
              rowsPerPage={pageSize}
              loading={loading}
              onChangePage={this.handleChangePage}
              onChangePageSize={this.handleChangePageSize}
            />
          </Grid>
        );

      case "SCALAR":
        return (
          <Grid item lg={3} md={3} xs={8} sm={8}>
            <Scalar height={250} data={this.data} />
          </Grid>
        );

      default:
        return (
          <Grid item lg={9} md={9} xs={12} sm={12}>
            <Chart aspect={ASPECT_RATIO} data={this.data} type={reportType} />
          </Grid>
        );
    }
  };

  render = () => {
    const { report, loading, error } = this.state;

    if (loading && report.type !== "TABLE") {
      return <Loading />;
    }

    if (error || !report) {
      return (
        <Typography color="error" variant="h5" gutterBottom>
          {error}
        </Typography>
      );
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
