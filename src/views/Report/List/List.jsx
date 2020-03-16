import React, { Component } from "react";
import { Link } from "react-router-dom";
import get from "lodash/get";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Table from "../../../components/Table/Table";
import ReportContainer from "../../../containers/Report.container";
import TableActions from "./TableActions";
import ShareReport from "./ShareReport/ShareReport";
import Search from "./Search";
import MyCustomEvent from "../../../util/customEvent";

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

const CreateReportLink = props => <Link to="/reports/create" {...props} />;
const CreateReportFormLink = props => (
  <Link to="/reports/composite/create" {...props} />
);

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
    if (tags.toUpperCase() !== this.state.tags.toUpperCase()) {
      this.setState({ loading: true, tags });
    }
  };

  handleActionClicked = async (action, item) => {
    const { id: reportId, type } = item;
    const composite = type === "FORM" ? "/composite" : "";
    const path = `/reports${composite}/${reportId}`;

    switch (action) {
      case "DELETE":
        await ReportContainer.delete(reportId);
        this.setState({ loading: true });
        this.loadData();
        break;
      case "EDIT":
        this.props.history.push(`${path}/edit`);
        break;
      case "RUN":
        this.props.history.push(`${path}/view`);
        break;
      case "ALERTS":
        await this.props.history.push(`/reports/${reportId}/alerts`);
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
      const { page, rowsPerPage: size, tags } = this.state;
      const reports = await ReportContainer.getAll(
        {
          params: { page, size, tags: tags.split(" ").join(",") }
        },
        get(this.props, "userRole")
      );
      const totalCount = reports.totalSize;
      const rows = reports.data;
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
        <Grid
          container
          spacing={8}
          style={{ marginBottom: "20px" }}
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Search onSearch={this.handleSearchClicked} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={8}>
            <Button
              component={CreateReportLink}
              color="primary"
              variant="contained"
            >
              <Add />
              ایجاد گزارش
            </Button>
            <Button
              component={CreateReportFormLink}
              color="primary"
              variant="contained"
            >
              ایجاد گزارش ترکیبی
            </Button>
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
