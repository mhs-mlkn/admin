import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Subscribe } from "unstated";
import Grid from "@material-ui/core/Grid";
import Table from "../../../components/Table/Table";
import TableActions from "./TableActions";
import Resources from "../../../containers/Resource.container";
import MyCustomEvent from "../../../util/customEvent";
import ShareResource from "./ShareResource/ShareResource";

const RESOURCE_COLS = [
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
  }
];

const List = props => {
  const { userRole = "ADMIN" } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    Resources.getAll({ params: { page, size } }, userRole)
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
    } else if (action === "ACCESS") {
      MyCustomEvent.emit("SHARE_RESOURCE", id);
    }
  };

  return (
    <Subscribe to={[Resources]}>
      {container => (
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Table
              cols={RESOURCE_COLS}
              rows={container.state.dbSources}
              count={container.state.totalCount}
              rowsPerPage={size}
              page={page}
              ActionsComponent={TableActions}
              onAction={handleActionClicked}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
              loading={loading}
            />
            <ShareResource />
          </Grid>
        </Grid>
      )}
    </Subscribe>
  );
};

export default List;
