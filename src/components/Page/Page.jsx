import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Loading from "../Loading/Loading";

const styles = theme => ({
  root: {
    // ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const Page = props => {
  const { loading = false, error = "", classes, children } = props;

  const showError = (msg = "خطا") => (
    <Typography color="error" variant="h5" gutterBottom>
      {msg}
    </Typography>
  );

  return (
    <div className={classes.root}>
      {!!error ? showError(error) : loading ? <Loading /> : children}
    </div>
  );
};

export default withStyles(styles)(Page);
