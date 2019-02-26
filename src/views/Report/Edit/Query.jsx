import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Select from "components/Formik/Select";
import Table from "components/Table/Table.jsx";
import Input from "components/Formik/Input";
import ErrorMessage from "./ErrorMessage";
import AceEditor from "react-ace";
import EditContainer from "./EditReport.container";
import { keyBy } from "lodash";

import "brace/mode/mysql";
import "brace/theme/monokai";
import "brace/ext/language_tools";

class ReportQueryForm extends Component {
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

    const errorParams = {};
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
        byUser: param.byUser || false,
        hint: param.hint || ""
      };
    });
    setFieldValue(`params`, params);
  };

  renderForm = props => {
    const { values, setFieldValue } = props;
    return (
      <Form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <GridContainer>
              <FieldArray
                name="params"
                render={arrayHelpers => {
                  return (
                    <>
                      {values.params && values.params.length > 0 && (
                        <GridItem xs={12} sm={12} md={12}>
                          <Table
                            tableHeaderColor="warning"
                            tableHead={[
                              "ردیف",
                              "مقدار",
                              "نوع",
                              "مقدار دهی توسط کاربر؟",
                              "راهنما"
                            ]}
                            tableData={values.params.map((p, index) => [
                              index + 1,
                              <>
                                <Input
                                  name={`params.${index}.value`}
                                  value={p.value}
                                  label={p.key}
                                  {...props}
                                />
                                <ErrorMessage name={`params.${index}.value`} />
                              </>,
                              <Select
                                name={`params.${index}.type`}
                                label="نوع"
                                value={values.params[index].type}
                                {...props}
                              >
                                <MenuItem value="TEXT">TEXT</MenuItem>
                                <MenuItem value="DECIMAL">DECIMAL</MenuItem>
                                <MenuItem value="FLOAT">FLOAT</MenuItem>
                                <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                              </Select>,
                              <Checkbox
                                name={`params.${index}.byUser`}
                                checked={values.params[index].byUser}
                                onChange={props.handleChange}
                              />,
                              <Input
                                name={`params.${index}.hint`}
                                label={"راهنما"}
                                {...props}
                              />
                            ])}
                          />
                        </GridItem>
                      )}
                    </>
                  );
                }}
              />
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
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
              style={{ marginTop: "10px", width: "100%" }}
            />
            <ErrorMessage name="query" />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary">
              بعدی
            </Button>
            <Button type="button" onClick={() => EditContainer.setTab(1)}>
              قبلی
            </Button>
          </GridItem>
        </GridContainer>
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
