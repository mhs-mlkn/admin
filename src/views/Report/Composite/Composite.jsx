import React, { Component } from "react";
import get from "lodash/get";
import { withSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import HelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Page from "../../../components/Page/Page";
import AutoSuggest from "./AutoSuggest";
import ReportContainer from "../../../containers/Report.container";
import Editor from "./Editor";

const REPORT = {
  id: 0,
  name: "",
  tags: "",
  description: "",
  content: "",
  children: {},
  type: "COMPOSITE"
};

class Composite extends Component {
  state = {
    loading: false,
    error: "",
    suggestions: [],
    report: { ...REPORT }
  };

  content = "";

  componentDidMount = async () => {
    this.setState({ loading: true });
    this.content = this.state.report.content;
    await this.initialReport();
    ReportContainer.getAllSummary()
      .then(suggestions => this.setState({ suggestions }))
      .catch(() => this.setState({ error: "خطای برقراری ارتباط با سرور" }))
      .finally(() => this.setState({ loading: false }));
  };

  initialReport = async () => {
    const { id: reportId } = this.props.match.params;
    if (reportId) {
      const report = await ReportContainer.get(reportId);
      if (!report) {
        return this.props.history.replace("/reports");
      }
      return this.setState({ report });
    }
  };

  handleSubmit = () => {
    const report = { ...this.state.report, content: this.content };
    if (!report.name) {
      return this.props.enqueueSnackbar("نام گزارش را وارد کنید", {
        variant: "error"
      });
    }
    if (!report.content) {
      return this.props.enqueueSnackbar("محتوای گزارش را وارد کنید", {
        variant: "error"
      });
    }
    this.setState({ report });
    console.log(report);
  };

  handleChangeReport = e => {
    const { name, value } = e.target;
    const { report } = this.state;
    this.setState({ report: { ...report, [name]: value } });
  };

  handleContentChange = (content, children) => {
    const { report } = this.state;
    this.content = content;
    this.setState({ report: { ...report, children } });
  };

  handleSelectReport = id => selected => {
    const { report } = this.state;
    const reportId = get(selected, "id", 0);
    const children = { ...report.children, [id]: reportId };
    this.setState({ report: { ...report, children } });
  };

  getSelectedItem = id => {
    const reportId = this.state.report.children[id];
    const item = this.state.suggestions.find(s => s.id === +reportId);
    return item || null;
  };

  render = () => {
    const { error, loading, report, suggestions } = this.state;
    return (
      <Page error={error} loading={loading}>
        <Grid container spacing={8} justify="center">
          <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
            <TextField
              name="name"
              fullWidth
              label="نام"
              variant="outlined"
              value={report.name}
              onChange={this.handleChangeReport}
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
              onChange={this.handleChangeReport}
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
              onChange={this.handleChangeReport}
            />
            <hr />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <HelperText variant="outlined">
              برای استفاده از گزارش {"{id}"} استفاده کنید
            </HelperText>
            <Editor
              onChange={this.handleContentChange}
              content={report.content}
              children={report.children}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {Object.keys(report.children).map(id => {
              return (
                <Grid container style={{ marginTop: 16 }} spacing={8} key={id}>
                  <Grid item xs={12} sm={3} md={2} lg={2} xl={1}>
                    <TextField
                      label="شناسه"
                      variant="outlined"
                      value={id || null}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={5} lg={4} xl={2}>
                    <AutoSuggest
                      label="نام گزارش"
                      placeholder="قسمتی از نام گزارش را تایپ کنید"
                      suggestions={suggestions}
                      onChange={this.handleSelectReport(id)}
                      initialSelectedItem={this.getSelectedItem(id)}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={this.handleSubmit}
            >
              ذخیره
            </Button>
          </Grid>
        </Grid>
      </Page>
    );
  };
}

export default withSnackbar(Composite);
