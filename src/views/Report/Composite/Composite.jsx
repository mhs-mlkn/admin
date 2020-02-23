import React, { useState, useEffect } from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AutoSuggest from "./AutoSuggest";
import ReportContainer from "../../../containers/Report.container";
import Editor from "./Editor";

const styles = theme => ({});

const REPORT = {
  id: 0,
  name: "",
  tags: "",
  description: "",
  type: "FORM",
  content: "",
  children: {}
};

const Composite = props => {
  // const { classes } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [report, setReport] = useState(REPORT);

  useEffect(() => {
    ReportContainer.getAllSummary().then(suggestions =>
      setSuggestions(suggestions)
    );
  }, []);

  const handleChangeReport = e => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleContentChange = content => {
    let params = content.match(/{\d+}/g) || [];
    const children = params.reduce(
      (res, p) => ({ ...res, [p.slice(1, -1)]: 0 }),
      {}
    );
    console.log(children);
    setReport({ ...report, content, children });
  };

  const handleSelectReport = id => selected => {
    const reportId = get(selected, "id", 0);
    const children = { ...report.children, [id]: reportId };
    console.log(children);
    setReport({ ...report, children });
  };

  return (
    <Grid container style={{ marginTop: 16 }} spacing={8} justify="center">
      <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
        <TextField
          name="name"
          fullWidth
          label="نام"
          variant="outlined"
          value={report.name}
          onChange={handleChangeReport}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
        <TextField
          name="tags"
          fullWidth
          label="تگ ها"
          placeholder="جدا سازی با فاصله"
          variant="outlined"
          value={report.tags}
          onChange={handleChangeReport}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TextField
          name="description"
          fullWidth
          multiline
          label="توضیحات"
          variant="outlined"
          value={report.description}
          onChange={handleChangeReport}
        />
        <hr />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Editor onChange={handleContentChange} />
      </Grid>

      {Object.keys(report.children).map(id => {
        return (
          <Grid container style={{ marginTop: 16 }} spacing={8}>
            <Grid item xs={12} sm={6} md={2} lg={2} xl={1} key={id}>
              <TextField
                label="شناسه"
                variant="outlined"
                value={id || null}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={id}>
              <AutoSuggest
                label="نام گزارش"
                placeholder="قسمتی از نام گزارش را تایپ کنید"
                suggestions={suggestions}
                onChange={handleSelectReport(id)}
                initialSelectedItem={null}
              />
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(Composite);
