import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "./List/List";

const Resources = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickCreate = type => () => {
    return props.history.push(`/resources/create/${type}`);
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          ایجاد
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickCreate("sql")}>SQL</MenuItem>
          <MenuItem onClick={handleClickCreate("elastic")}>ELASTIC</MenuItem>
          <MenuItem onClick={handleClickCreate("odata")}>ODATA</MenuItem>
          <MenuItem onClick={handleClickCreate("file")}>FILE</MenuItem>
        </Menu>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <List />
      </Grid>
    </Grid>
  );
};

export default Resources;
