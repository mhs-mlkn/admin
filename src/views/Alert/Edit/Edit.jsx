import React, { Component } from "react";
import { withSnackbar } from "notistack";
import AceEditor from "react-ace";
import { Formik, Form, FieldArray } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReportContainer from "../../../containers/Report.container";
import AlertContainer from "../../../containers/Alert.container";
import Page from "../../../components/Page/Page";
import Input from "../../../components/FormikInputs";
import ErrorMessage from "./ErrorMessage";

import "brace/mode/groovy";
import "brace/theme/monokai";
import "brace/ext/language_tools";

const NEW_RECIEVER = {
  addr: "",
  type: "mail"
};

class AlertEdit extends Component {
  state = {
    report: "",
    alert: {
      name: "",
      description: "",
      script: `def func(n) {
  for(int i = 0; i<n.getCols().size(); i++) {
    if(n.getCols().get(i).getKey() == 'SUMKIND') {
      return n.getRows().get(0).getCols().get(i)<6500;
    }
  }
}`,
      metadata: {
        cron_schedule: "0 45 * * * ?",
        email_subject: "",
        email_content: "",
        notif_recievers: []
      },
      paramVOS: []
    },
    loading: false,
    error: ""
  };

  componentDidMount = async () => {
    await this.initial();
  };

  getReportId = () => {
    return +this.props.match.params.id;
  };

  getReport = async () => {
    const reportId = this.getReportId();
    if (reportId) {
      return ReportContainer.get(reportId);
    }
    return Promise.reject(new Error("شناسه گزارش نامعتبر است"));
  };

  initial = async () => {
    await this.setState({ loading: true });

    const report = await this.getReport().catch(e => {
      this.props.enqueueSnackbar(e.message || "درخواست با خطا مواجه شد", {
        variant: "error"
      });
      return this.props.history.replace(
        `/admin/reports/${this.getReportId()}/alerts`
      );
    });

    const paramVOS = report
      ? report.query.queryParams.filter(
          p =>
            ["BY_BUSINESS", "BY_BUSINESS_OR_PARENT", "BY_ADMIN"].indexOf(
              p.fill
            ) > -1
        )
      : [];

    this.setState({
      report,
      alert: { ...this.state.alert, paramVOS },
      loading: false
    });
  };

  submit = values => {
    this.setState({ loading: true });
    Reflect.deleteProperty(values, "description");
    AlertContainer.save(this.state.report.id, values)
      .then(() =>
        this.props.history.push(`/admin/reports/${this.getReportId()}/alerts`)
      )
      .catch(error => {
        this.props.enqueueSnackbar("درخواست با خطا مواجه شد", {
          variant: "error"
        });
        this.setState({ loading: false, error: error.message });
      });
  };

  validate = values => {
    let errors = {};
    let metadata = {};

    if (!values.name) {
      errors.name = "نام را وارد کنید";
    }

    if (values.description && values.description.length > 200) {
      errors.description = "کمتر از 200 حرف مجاز میباشد";
    }

    if (!values.script) {
      errors.script = "اسکریپت Groovy را وارد کنید";
    }

    const paramVOS = [];
    for (const key in values.paramVOS) {
      if (values.paramVOS.hasOwnProperty(key)) {
        const param = values.paramVOS[key];
        if (!param.value) {
          paramVOS[key] = { value: "مقدار وارد کنید" };
        }
      }
    }
    paramVOS.length > 0 && (errors = Object.assign(errors, { paramVOS }));

    if (!values.metadata.cron_schedule) {
      metadata.cron_schedule = "زمانبندی را وارد کنید";
    }

    if (!values.metadata.email_subject) {
      metadata.email_subject = "عنوان هشدار را وارد کنید";
    }

    if (!values.metadata.email_content) {
      metadata.email_content = "متن هشدار را وارد کنید";
    }

    const notif_recievers = [];
    for (const index in values.metadata.notif_recievers) {
      const reciever = values.metadata.notif_recievers[index];
      if (!(reciever.type && reciever.addr)) {
        notif_recievers.push({});
      }
      if (!reciever.type) {
        notif_recievers[index]["type"] = "مقدار وارد کنید";
      }
      if (!reciever.addr) {
        notif_recievers[index]["addr"] = "مقدار وارد کنید";
      }
    }
    notif_recievers.length > 0 &&
      (metadata = Object.assign(metadata, { notif_recievers }));

    Object.keys(metadata).length > 0 && Object.assign(errors, { metadata });

    return errors;
  };

  renderForm = formikProps => {
    return (
      <Form>
        <Grid container>
          <Grid item xs={12} sm={12} md={8}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h5" color="primary" gutterBottom>
                  هشدار جدید برای گزارش {this.state.report.name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input name="name" label="نام" {...formikProps} />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  name="metadata.cron_schedule"
                  label="زمانبندی اجرا گزارش"
                  style={{ direction: "ltr" }}
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  multiline
                  name="description"
                  label="توضیحات"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  name="metadata.email_subject"
                  label="عنوان هشدار"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Input
                  multiline
                  name="metadata.email_content"
                  label="متن هشدار"
                  {...formikProps}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Paper style={{ margin: "8px 0 0 8px", paddingBottom: "8px" }}>
                  <FieldArray
                    name="metadata.notif_recievers"
                    render={arrayHelpers => (
                      <div>
                        <div style={{ display: "flex" }}>
                          <Typography
                            variant="h6"
                            color="textSecondary"
                            style={{ flexGrow: 1, padding: "8px 16px 0" }}
                          >
                            لیست دریافت کنددگان هشدار
                          </Typography>
                          <div>
                            <IconButton
                              color="primary"
                              onClick={() => arrayHelpers.push(NEW_RECIEVER)}
                            >
                              <AddIcon />
                            </IconButton>
                          </div>
                        </div>
                        <Table padding="dense">
                          <TableHead>
                            <TableRow>
                              {["مخاطب", "نوع", ""].map((header, key) => (
                                <TableCell key={key} align="left">
                                  {header}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {formikProps.values.metadata.notif_recievers.map(
                              (f, i) => (
                                <TableRow
                                  key={i}
                                  style={{ verticalAlign: "top" }}
                                >
                                  <TableCell>
                                    <Input
                                      name={`metadata.notif_recievers.${i}.addr`}
                                      label="ایمیل یا همراه"
                                      value={f.addr}
                                      margin="dense"
                                      {...formikProps}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Input
                                      select
                                      name={`metadata.notif_recievers.${i}.type`}
                                      label="نوع"
                                      value={f.type}
                                      margin="dense"
                                      {...formikProps}
                                    >
                                      <MenuItem value="mail">ایمیل</MenuItem>
                                      <MenuItem value="sms">پیامک</MenuItem>
                                    </Input>
                                  </TableCell>
                                  <TableCell
                                    style={{
                                      verticalAlign: "middle"
                                    }}
                                    align="right"
                                  >
                                    <IconButton
                                      onClick={() => arrayHelpers.remove(i)}
                                      color="secondary"
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={12} style={{ marginTop: "32px" }}>
                <Typography variant="h6" color="textSecondary">
                  مقدار دهی پارامترهای گزارش
                </Typography>
              </Grid>
              <FieldArray
                name="paramVOS"
                render={() => {
                  return formikProps.values.paramVOS.map((p, i) => (
                    <Grid item xs={12} sm={4} md={3} lg={2} key={p.key}>
                      <Input
                        name={`paramVOS.${i}.value`}
                        label={p.key}
                        value={formikProps.values.paramVOS[i].value}
                        {...formikProps}
                      />
                      <FormHelperText>
                        {p.hint} ({p.type})
                      </FormHelperText>
                    </Grid>
                  ));
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <AceEditor
              mode="groovy"
              theme="monokai"
              name="script"
              onChange={val => formikProps.setFieldValue("script", val)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={formikProps.values.script}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
              editorProps={{ $blockScrolling: true }}
              style={{ marginTop: "10px", width: "100%", height: "600px" }}
            />
            <ErrorMessage name="script" />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} style={{ marginTop: "32px" }}>
          <Button type="submit" variant="contained" color="primary">
            ذخیره
          </Button>
        </Grid>
      </Form>
    );
  };

  render = () => {
    const { alert, loading } = this.state;
    return (
      <Page loading={loading}>
        <Formik
          initialValues={alert}
          enableReinitialize
          validate={this.validate}
          onSubmit={this.submit}
          render={this.renderForm}
        />
      </Page>
    );
  };
}

export default withSnackbar(AlertEdit);
