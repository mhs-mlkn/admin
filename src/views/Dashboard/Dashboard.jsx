import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Table from "../../components/Table/Table";
import TableActions from "./TableActions";

const baseUrl = `${process.env.REACT_APP_BASE_URL}/manage/dashboard`;

const DASHBOARD_COLS = [
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

const Dashboard = props => {
  const { enqueueSnackbar } = useSnackbar();
  const [dashboards, setDashboards] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}`, { page, size })
      .then(res => res.data.result)
      .then(data => {
        setDashboards(data.data);
        setTotal(data.totalSize);
      })
      .catch(() =>
        enqueueSnackbar("دریافت لیست با خطا مواجه شد", { variant: "error" })
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [page, size]);

  const handleChangePage = page => {
    setPage(page);
  };

  const handleChangePageSize = size => {
    setSize(size);
  };

  const handleActionClicked = async (action, item) => {
    const id = item.id;
    if (action === "DELETE") {
      await Resources.delete(id);
    }
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Table
          cols={DASHBOARD_COLS}
          rows={dashboards}
          count={total}
          rowsPerPage={size}
          page={page}
          ActionsComponent={TableActions}
          onAction={handleActionClicked}
          onChangePage={handleChangePage}
          onChangePageSize={handleChangePageSize}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
