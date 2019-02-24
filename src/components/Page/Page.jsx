import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Loading from "../Loading/Loading";

import styles from "./pageStyles";

const page = props => {
  const { loading, classes, children } = props;
  if (loading) {
    return <Loading />;
  }
  return (
    <Paper className={classes.root} elevation={1}>
      {children}
    </Paper>
  );
};

export default withStyles(styles)(page);
