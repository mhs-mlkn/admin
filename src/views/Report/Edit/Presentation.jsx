import React, { Component } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Input from "../../../components/FormikInputs";
import EditContainer from "./EditReport.container";
import Preview from "./Preview";

const REPORT_TYPES = [
  { name: "Table", value: "TABLE" },
  { name: "Scalar", value: "SCALAR" },
  { name: "Line Chart", value: "LINE" },
  { name: "Area Chart", value: "AREA" },
  { name: "Bar Chart", value: "BAR" },
  { name: "Scatter Chart", value: "SCATTER" },
  { name: "Pie Chart", value: "PIE" },
  { name: "Gauge Chart", value: "GAUGE" },
  { name: "Heatmap Chart", value: "HEATMAP" },
  { name: "Treemap Chart", value: "TREEMAP" },
  { name: "Radar Chart", value: "RADAR" }
];

class ReportPresentationForm extends Component {
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
    if (!values.type) {
      errors.type = "نوع گزارش را انتخاب نمایید";
    }
    return errors;
  };

  renderForm = props => {
    const { values } = props;
    return (
      <Form>
        <Grid container>
          <Grid item xs={12} sm={12} md={3}>
            <Grid container>
              <Grid item xs={12} sm={6} md={12}>
                <Input select name="type" label="نوع گزارش" {...props}>
                  {REPORT_TYPES.map(rt => (
                    <MenuItem value={rt.value} key={rt.value}>
                      {rt.name}
                    </MenuItem>
                  ))}
                </Input>
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
          </Grid>
          <Grid item xs={12} sm={12} md={1} />
          <Grid item xs={12} sm={12} md={8}>
            <Preview reportType={values.type} reportName={values.name} />
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

export default ReportPresentationForm;
