import React, { Component } from "react";
import get from "lodash/get";
import { Formik, Form, FieldArray } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Input from "../../../components/FormikInputs";
import ErrorMessage from "./ErrorMessage";
import AceEditor from "react-ace";
import EditContainer from "./EditReport.container";
import ReportContainer from "../../../containers/Report.container";
import keyBy from "lodash/keyBy";

import "brace/mode/mysql";
import "brace/theme/monokai";
import "brace/ext/language_tools";

const PARAM_HEADERS = ["مقدار", "نوع", "منبع", "راهنما", ""];

class ReportQueryForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
    const { dbSources = [] } = ReportContainer.state;
    this.dataSources = keyBy(dbSources, "id");
  };

  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    await EditContainer.setTab(2);
  };

  validate = values => {
    let errors = {};
    if (!values.query) {
      errors.query = "کوئری را وارد کنید";
    }

    const errorParams = [];
    for (const key in values.params) {
      if (values.params.hasOwnProperty(key)) {
        const param = values.params[key];
        if (!param.value) {
          errorParams[key] = { value: "مقدار وارد کنید" };
        }
      }
    }
    Object.keys(errorParams).length > 0 &&
      (errors = Object.assign(errors, { params: errorParams }));

    const errorColumns = [];
    for (const key in values.columns) {
      if (values.columns.hasOwnProperty(key)) {
        const col = values.columns[key];
        if (!col.name) {
          errorColumns[key] = { ...errorColumns[key], name: "مقدار وارد کنید" };
        }
        if (!col.alias) {
          errorColumns[key] = {
            ...errorColumns[key],
            alias: "مقدار وارد کنید"
          };
        }
      }
    }
    Object.keys(errorColumns).length > 0 &&
      (errors = Object.assign(errors, { columns: errorColumns }));

    return errors;
  };

  onBlurQuery = (editor, setFieldValue) => {
    setFieldValue(`params`, []);
    const oldParams = keyBy(EditContainer.state.report.params, "key");
    let params = editor.getValue().match(/:\w+/g) || [];
    params = params.map(p => {
      const key = p.slice(1);
      const param = oldParams[key] || {};
      return {
        key,
        value: param.value || "",
        type: param.type || "TEXT",
        fill: param.fill || "BY_BUSINESS",
        hint: param.hint || ""
      };
    });
    setFieldValue(`params`, params);
  };

  renderForm = props => {
    const { values, setFieldValue } = props;
    const basic = EditContainer.getReport(0);

    return (
      <Form>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            {get(this.dataSources, `${basic.dataSourceId}.type`, "SQL") ===
            "ELASTICSEARCH" ? (
              <Input
                name="metadata"
                label="غالب گزارش"
                multiline
                {...props}
                style={{ direction: "ltr" }}
              />
            ) : (
              <FieldArray
                name="columns"
                render={arrayHelpers => (
                  <Card style={{ marginTop: "10px" }}>
                    <CardHeader
                      action={
                        <IconButton
                          color="primary"
                          onClick={() =>
                            arrayHelpers.push({ name: "", alias: "" })
                          }
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      }
                      title="ستون های گزارش"
                    />
                    <CardContent>
                      {values.columns.map((col, index) => (
                        <div style={{ display: "flex" }} key={index}>
                          <div style={{ flexGrow: 1 }}>
                            <Input
                              name={`columns.${index}.name`}
                              value={col.name}
                              label="نام"
                              margin="dense"
                              {...props}
                            />
                            <ErrorMessage name={`columns.${index}.name`} />
                          </div>
                          <div style={{ flexGrow: 1 }}>
                            <Input
                              name={`columns.${index}.alias`}
                              value={col.alias}
                              label="عنوان"
                              margin="dense"
                              {...props}
                            />
                            <ErrorMessage name={`columns.${index}.alias`} />
                          </div>
                          <div>
                            <IconButton
                              color="secondary"
                              onClick={() => arrayHelpers.remove(index)}
                              style={{ marginTop: "8px" }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <AceEditor
              mode="mysql"
              theme="monokai"
              name="query"
              onChange={val => setFieldValue("query", val)}
              onBlur={(e, editor) => this.onBlurQuery(editor, setFieldValue)}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={values.query}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
              editorProps={{ $blockScrolling: true }}
              style={{ marginTop: "10px", width: "100%", height: "400px" }}
            />
            <ErrorMessage name="query" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {values.params && values.params.length > 0 && (
              <h3>پارامتر های گزارش</h3>
            )}
            <Grid container>
              <FieldArray
                name="params"
                render={arrayHelpers => {
                  return (
                    <>
                      {values.params && values.params.length > 0 && (
                        <Grid item xs={12} sm={12} md={12}>
                          <Table>
                            <TableHead>
                              <TableRow>
                                {PARAM_HEADERS.map((header, key) => (
                                  <TableCell
                                    key={key}
                                    align="left"
                                    style={{ padding: "0 10px" }}
                                  >
                                    {header}
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {values.params.map((p, index) => (
                                <TableRow key={index}>
                                  <TableCell style={{ padding: "0 10px" }}>
                                    <Input
                                      name={`params.${index}.value`}
                                      label={p.key}
                                      value={p.value}
                                      margin="dense"
                                      {...props}
                                    />
                                    <ErrorMessage
                                      name={`params.${index}.value`}
                                    />
                                  </TableCell>
                                  <TableCell style={{ padding: "0 10px" }}>
                                    <Input
                                      select
                                      name={`params.${index}.type`}
                                      label="نوع"
                                      value={values.params[index].type}
                                      margin="dense"
                                      {...props}
                                    >
                                      <MenuItem value="TEXT">TEXT</MenuItem>
                                      <MenuItem value="DECIMAL">
                                        DECIMAL
                                      </MenuItem>
                                      <MenuItem value="FLOAT">FLOAT</MenuItem>
                                      <MenuItem value="BOOLEAN">
                                        BOOLEAN
                                      </MenuItem>
                                    </Input>
                                  </TableCell>
                                  <TableCell style={{ padding: "0 10px" }}>
                                    <Input
                                      select
                                      name={`params.${index}.fill`}
                                      label="منبع"
                                      value={values.params[index].fill}
                                      margin="dense"
                                      {...props}
                                    >
                                      <MenuItem value="BY_BUSINESS">
                                        کاربر
                                      </MenuItem>
                                      <MenuItem value="BY_ADMIN">
                                        ادمین
                                      </MenuItem>
                                      <MenuItem value="BY_PARENT">
                                        والد
                                      </MenuItem>
                                      <MenuItem value="BY_BUSINESS_OR_PARENT">
                                        والد یا کاربر
                                      </MenuItem>
                                    </Input>
                                    {/* <Checkbox
                                      name={`params.${index}.byUser`}
                                      checked={values.params[index].byUser}
                                      onChange={props.handleChange}
                                    /> */}
                                  </TableCell>
                                  <TableCell style={{ padding: "0 10px" }}>
                                    <Input
                                      name={`params.${index}.hint`}
                                      label={"راهنما"}
                                      value={p.hint}
                                      margin="dense"
                                      {...props}
                                    />
                                  </TableCell>
                                  <TableCell
                                    align="right"
                                    style={{ padding: "0 10px" }}
                                  >
                                    <IconButton
                                      title="حذف"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteIcon
                                        fontSize="small"
                                        color="error"
                                      />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Grid>
                      )}
                    </>
                  );
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              بعدی
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => EditContainer.setTab(0)}
            >
              قبلی
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };

  render = () => {
    const initialValues = EditContainer.getReport();
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validate={this.validate}
        onSubmit={this.submit}
        render={this.renderForm}
      />
    );
  };
}

export default ReportQueryForm;
