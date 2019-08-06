import React, { Component } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Input from "../../../components/FormikInputs";
// import Select from "components/Formik/Select";
// import Textarea from "components/Formik/Textarea";
import ReportContainer from "../../../containers/Report.container";
import EditContainer from "./EditReport.container";
import AutoSuggest from "./AutoSuggest";

class ReportBasicForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
  };

  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    await EditContainer.setTab(1);
  };

  validate = values => {
    let errors = {};
    if (!values.name) {
      errors.name = "نام را وارد کنید";
    }
    if (!values.source) {
      errors.source = "نوع دیتابیس را انتخاب نمایید";
    }
    if (!values.dataSource) {
      errors.dataSource = "اتصال دیتابیس را انتخاب نمایید";
    }
    if (values.description && values.description.length > 200) {
      errors.description = "کمتر از 200 حرف مجاز میباشد";
    }
    return errors;
  };

  renderForm = props => {
    const { values } = props;
    const { dbTypes, dbSources } = ReportContainer.state;
    return (
      <Form autoComplete="off">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={3}>
                <Input name="name" label="نام" {...props} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Input select name="source" label="نوع دیتابیس" {...props}>
                  {dbTypes.map((db, i) => (
                    <MenuItem value={db} key={i}>
                      {db}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
              {values.source === "NOSQL" && (
                <Grid item xs={12} sm={12} md={3}>
                  <Input name="indexName" label="نام ایندکس" {...props} />
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={3}>
                <Input
                  select
                  name="dataSource"
                  label="اتصال دیتابیس"
                  {...props}
                >
                  {dbSources[values.source].length > 0 ? (
                    dbSources[values.source].map(({ dataBaseName }, i) => (
                      <MenuItem value={dataBaseName} key={i}>
                        {dataBaseName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">نوع دیتابیس را انتخاب کنید</MenuItem>
                  )}
                </Input>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AutoSuggest
                  name="drillDownId"
                  label="گزارش تکمیلی"
                  placeholder="قسمتی از نام گزارش را تایپ کنید"
                  formikProps={{ ...props }}
                  suggestions={this.props.suggestions}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Input
                  multiline
                  name="description"
                  label="توضیحات"
                  {...props}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              بعدی
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

export default ReportBasicForm;
