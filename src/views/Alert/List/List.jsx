import React, { Component } from "react";
import { withSnackbar } from "notistack";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Add from "@material-ui/icons/Add";
import Table from "../../../components/Table/Table";
import AlertContainer from "../../../containers/Alert.container";
import ReportContainer from "../../../containers/Report.container";
import TableActions from "./TableActions";
// import Search from "./Search";
import { at } from "lodash";

const ALERT_LIST_COLS = [
  {
    path: "id",
    title: "شناسه",
    key: "شناسه"
  },
  {
    path: "name",
    title: "نام",
    key: "نام"
  }
];

class AlertList extends Component {
  state = {
    report: "",
    cols: ALERT_LIST_COLS,
    rows: [],
    totalCount: 0,
    rowsPerPage: 10,
    page: 0,
    tags: "",
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const report = await this.getReport().catch(e => {
      this.props.enqueueSnackbar(e.message || "درخواست با خطا مواجه شد", {
        variant: "error"
      });
      return this.props.history.replace("/admin/reports");
    });
    this.setState({ report }, this.loadData);
  };

  componentDidUpdate = (_, preState) => {
    const { page: prePage, rowsPerPage: prePageSize, tags: preTags } = preState;
    const { page, rowsPerPage, tags } = this.state;
    if (prePage !== page || prePageSize !== rowsPerPage || preTags !== tags) {
      this.loadData();
    }
  };

  getReportId = () => {
    return +this.props.match.params.id;
  };

  getReport = async () => {
    const reportId = this.getReportId();
    if (reportId) {
      return ReportContainer.get(reportId);
    }
    return Promise.reject(new Error("شناسه گزارش نامعتبر است"));
  };

  handleChangePage = page => {
    this.setState({ loading: true, page });
  };

  handleChangePageSize = rowsPerPage => {
    this.setState({ loading: true, page: 0, rowsPerPage });
  };

  handleSearchClicked = tags => {
    this.setState({ loading: true, tags });
  };

  handleActionClicked = async (action, item) => {
    const alertId = item[0];
    switch (action) {
      case "DELETE":
        await AlertContainer.delete(alertId);
        this.setState({ loading: true });
        this.loadData();
        break;
      case "EDIT":
        await this.props.history.push(
          `/admin/reports/${this.getReportId()}/alerts/${alertId}/edit`
        );
        break;

      default:
        break;
    }
  };

  loadData = async () => {
    try {
      const { page, rowsPerPage, tags } = this.state;
      const reports = await AlertContainer.getAll(page, rowsPerPage, {
        tags: tags.split(" ").join(",")
      });
      const totalCount = reports.totalSize;
      const rows = reports.data.map(r => ({
        cols: at(r, ALERT_LIST_COLS.map(col => col.path))
      }));
      this.setState({ rows, totalCount, loading: false });
    } catch (error) {
      this.props.enqueueSnackbar("درخواست با خطا مواجه شد", {
        variant: "error"
      });
      this.setState({ loading: false, error: error.message });
    }
  };

  render = () => {
    const {
      report,
      cols,
      rows,
      totalCount,
      rowsPerPage,
      page,
      loading
    } = this.state;

    return (
      <>
        <div style={{ display: "flex" }}>
          <Typography
            color="primary"
            variant="h4"
            gutterBottom
            style={{ flexGrow: 1 }}
          >
            {report.name}
          </Typography>
          <div>
            <IconButton
              color="primary"
              variant="text"
              size="small"
              title="ایجاد هشدار جدید"
              onClick={() =>
                this.props.history.push(
                  `/admin/reports/${this.getReportId()}/alerts/new`
                )
              }
            >
              <Add />
            </IconButton>
            <IconButton
              color="secondary"
              variant="text"
              size="small"
              title="بازگشت"
              onClick={() => this.props.history.push("/admin/reports")}
            >
              <ArrowBack />
            </IconButton>
          </div>
        </div>
        {/* <Grid container spacing={8} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Search onSearch={this.handleSearchClicked} />
          </Grid>
        </Grid> */}
        <Table
          cols={cols}
          rows={rows}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          ActionsComponent={TableActions}
          onAction={this.handleActionClicked}
          onChangePage={this.handleChangePage}
          onChangePageSize={this.handleChangePageSize}
          loading={loading}
        />
      </>
    );
  };
}

export default withSnackbar(AlertList);
