import React, { Component } from "react";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table/Table";
import ReportContainer from "../../../containers/Report.container";
import TableActions from "./TableActions";
import ShareReport from "./ShareReport/ShareReport";
import Search from "./Search";
import MyCustomEvent from "../../../util/customEvent";
import at from "lodash/at";

const REPORT_LIST_COLS = [
  {
    path: "id",
    title: "شناسه",
    key: "شناسه"
  },
  {
    path: "name",
    title: "نام",
    key: "نام"
  },
  {
    path: "type",
    title: "نوع",
    key: "نوع"
  },
  {
    path: "query.dataSource.type",
    title: "دیتابیس",
    key: "دیتابیس"
  },
  {
    path: "query.dataSource.name",
    title: "اتصال",
    key: "اتصال"
  },
  {
    path: "tags",
    title: "تگ",
    key: "تگ"
  }
];

class ReportList extends Component {
  state = {
    cols: REPORT_LIST_COLS,
    rows: [],
    totalCount: 0,
    rowsPerPage: 10,
    page: 0,
    tags: "",
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    this.loadData();
  };

  componentDidUpdate = (_, preState) => {
    const { page: prePage, rowsPerPage: prePageSize, tags: preTags } = preState;
    const { page, rowsPerPage, tags } = this.state;
    if (prePage !== page || prePageSize !== rowsPerPage || preTags !== tags) {
      this.loadData();
    }
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
    const reportId = item[0];
    switch (action) {
      case "DELETE":
        await ReportContainer.delete(reportId);
        this.setState({ loading: true });
        this.loadData();
        break;
      case "EDIT":
        await this.props.history.push(`/admin/reports/${reportId}/edit`);
        break;
      case "RUN":
        await this.props.history.push(`/admin/reports/${reportId}/view`);
        break;
      case "ALERTS":
        await this.props.history.push(`/admin/reports/${reportId}/alerts`);
        break;
      case "ACCESS":
        MyCustomEvent.emit("SHARE_REPORT", reportId);
        break;

      default:
        break;
    }
  };

  loadData = async () => {
    try {
      const { page, rowsPerPage, tags } = this.state;
      const reports = await ReportContainer.getAll(page, rowsPerPage, {
        tags: tags.split(" ").join(",")
      });
      const totalCount = reports.totalSize;
      const rows = reports.data.map(r => ({
        cols: at(
          r,
          REPORT_LIST_COLS.map(col => col.path)
        )
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
    const { cols, rows, totalCount, rowsPerPage, page, loading } = this.state;
    return (
      <>
        <Grid container spacing={8} style={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Search onSearch={this.handleSearchClicked} />
          </Grid>
        </Grid>
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
        <ShareReport />
      </>
    );
  };
}

export default withSnackbar(ReportList);
