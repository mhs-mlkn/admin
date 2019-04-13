import React, { Component } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "../../../components/FormikInputs";
import EditContainer from "./EditReport.container";

class ReportConfigForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
  };

  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(JSON.parse(initialValues.config));
    await EditContainer.setReport({ config: JSON.stringify(values) });
    this.props.onSubmit(EditContainer.state.report);
  };

  validate = values => {
    let errors = {};
    if (values.refreshInterval && values.refreshInterval < 0) {
      errors.refreshInterval = "ورودی باید بزرگتر از 0 باشد";
    }
    return errors;
  };

  renderForm = props => {
    return (
      <Form autoComplete="off">
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  name="refreshInterval"
                  label="بازه بارگذاری مجدد (ثانیه)"
                  type="number"
                  {...props}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              ذخیره
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => EditContainer.setTab(3)}
            >
              قبلی
            </Button>
          </Grid>
        </Grid>
      </Form>
    );
  };

  render = () => {
    let initialValues = EditContainer.getReport();
    initialValues.config = JSON.parse(initialValues.config);
    return (
      <Formik
        initialValues={initialValues.config}
        enableReinitialize
        validate={this.validate}
        onSubmit={this.submit}
        render={this.renderForm}
      />
    );
  };
}

export default ReportConfigForm;
