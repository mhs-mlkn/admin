import React, { useState, useEffect } from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import HelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
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
  const [report, setReport] = useState({ ...REPORT });

  const handleSubmit = () => {
    console.log(report);
  };

  useEffect(() => {
    handleContentChange = handleContentChange.bind(this);
    ReportContainer.getAllSummary().then(suggestions =>
      setSuggestions(suggestions)
    );
  }, []);

  const handleChangeReport = e => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  let handleContentChange = (content, children) => {
    console.log(report);
    setReport({ ...report, content, children });
  };

  const handleSelectReport = id => selected => {
    const reportId = get(selected, "id", 0);
    const children = { ...report.children, [id]: reportId };
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
        <HelperText variant="outlined">
          برای استفاده از گزارش {"{id}"} استفاده کنید
        </HelperText>
        <Editor onChange={handleContentChange} children={report.children} />
      </Grid>

      {Object.keys(report.children).map(id => {
        return (
          <Grid container style={{ marginTop: 16 }} spacing={8} key={id}>
            <Grid item xs={12} sm={3} md={1} lg={1} xl={1}>
              <TextField
                label="شناسه"
                variant="outlined"
                value={id || null}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <AutoSuggest
                label="نام گزارش"
                placeholder="قسمتی از نام گزارش را تایپ کنید"
                suggestions={suggestions}
                onChange={handleSelectReport(id)}
                initialSelectedItem={report.children[id]}
              />
            </Grid>
          </Grid>
        );
      })}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          ذخیره
        </Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Composite);
