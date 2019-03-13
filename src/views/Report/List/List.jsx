import React, { Component } from "react";
import { Subscribe } from "unstated";
import Table from "../../../components/Table/Table";
import ReportContainer from "../../../containers/Report.container";
import TableActions from "./TableActions";
import { at } from "lodash";

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
    path: "chartType",
    title: "نمایش",
    key: "نمایش"
  },
  {
    path: "source",
    title: "دیتابیس",
    key: "دیتابیس"
  },
  {
    path: "query.dataSource",
    title: "اتصال",
    key: "اتصال"
  }
];

class ReportList extends Component {
  state = {
    cols: REPORT_LIST_COLS,
    rows: [],
    totalCount: 0,
    rowsPerPage: 10,
    page: 0,
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    this.loadData();
  };

  componentDidUpdate = (_, preState) => {
    const { page: prePage, rowsPerPage: prePageSize } = preState;
    const { page, rowsPerPage } = this.state;
    if (prePage !== page || prePageSize !== rowsPerPage) {
      this.loadData();
    }
  };

  onChangePage = page => {
    this.setState({ loading: true, page });
  };

  onChangeRowsPerPage = rowsPerPage => {
    this.setState({ loading: true, page: 0, rowsPerPage });
  };

  onAction = async (action, item) => {
    const reportId = item[0];
    switch (action) {
      case "DELETE":
        await ReportContainer.delete(reportId);
        break;
      case "EDIT":
        await this.props.history.push(`/admin/reports/${reportId}/edit`);
        break;
      case "RUN":
        await this.props.history.push(`/admin/reports/${reportId}/view`);
        break;

      default:
        break;
    }
  };

  loadData = async () => {
    try {
      const { page, rowsPerPage } = this.state;
      const reports = await ReportContainer.getAll(page, rowsPerPage);
      const totalCount = reports.totalSize;
      const rows = reports.data.map(r => ({
        cols: at(r, REPORT_LIST_COLS.map(col => col.path))
      }));
      this.setState({ rows, totalCount, loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  render = () => {
    const { cols, rows, totalCount, rowsPerPage, page, loading } = this.state;
    return (
      <Table
        cols={cols}
        rows={rows}
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        ActionsComponent={TableActions}
        onAction={this.onAction}
        onChangePage={this.onChangePage}
        onChangeRowsPerPage={this.onChangeRowsPerPage}
        loading={loading}
      />
    );
  };
}

export default ReportList;
