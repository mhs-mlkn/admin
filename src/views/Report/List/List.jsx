import React, { Component } from "react";
import { Subscribe } from "unstated";
import Table from "../../../components/Table/Table";
import ReportContainer from "../../../containers/Report.container";
import TableActions from "./TableActions";

const REPORT_LIST_COLS = [
  {
    path: "id",
    title: "شناسه"
  },
  {
    path: "name",
    title: "نام"
  },
  {
    path: "type",
    title: "نوع"
  },
  {
    path: "chartType",
    title: "نمایش"
  },
  {
    path: "source",
    title: "دیتابیس"
  },
  {
    path: "query.dataSource",
    title: "اتصال"
  }
];

class ReportList extends Component {
  state = {
    cols: REPORT_LIST_COLS,
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
    switch (action) {
      case "DELETE":
        await ReportContainer.delete(item.id);
        break;
      case "EDIT":
        await this.props.history.push(`/admin/reports/${item.id}/edit`);
        break;
      case "RUN":
        await this.props.history.push(`/admin/reports/${item.id}/view`);
        break;

      default:
        console.log(action, item);
        break;
    }
  };

  loadData = async () => {
    try {
      const { page, rowsPerPage } = this.state;
      await ReportContainer.getAll(page, rowsPerPage);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  };

  render = () => {
    const { cols, rowsPerPage, page, loading } = this.state;
    return (
      <Subscribe to={[ReportContainer]}>
        {Reports => (
          <Table
            cols={cols}
            rows={Reports.state.reports}
            count={Reports.state.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            ActionsComponent={TableActions}
            onAction={this.onAction}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
            loading={loading}
          />
        )}
      </Subscribe>
    );
  };
}

export default ReportList;
