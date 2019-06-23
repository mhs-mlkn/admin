import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
// import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "../../../components/FormikInputs";
import ErrorMessage from "./ErrorMessage";
import AceEditor from "react-ace";
import EditContainer from "./EditReport.container";
import { keyBy } from "lodash";

import "brace/mode/mysql";
import "brace/theme/monokai";
import "brace/ext/language_tools";

const PARAM_HEADERS = ["مقدار", "نوع", "منبع", "راهنما", ""];

class ReportQueryForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
  };

  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    await EditContainer.setTab(3);
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
    return (
      <Form>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
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
              style={{ marginTop: "10px", width: "100%", height: "300px" }}
            />
            <ErrorMessage name="query" />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
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
                                      value={p.value}
                                      label={p.key}
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
                                      value={p.hint}
                                      label={"راهنما"}
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
              onClick={() => EditContainer.setTab(1)}
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
