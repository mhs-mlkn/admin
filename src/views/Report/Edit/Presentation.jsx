import React, { Component } from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Input, { Effect } from "../../../components/FormikInputs";
import EditContainer from "./EditReport.container";
import Preview from "./Preview";

const REPORT_TYPES = [
  { name: "Scalar", value: "Scalar" },
  { name: "Timeline", value: "Timeline" },
  { name: "Line Chart", value: "Line" },
  { name: "Bar Chart", value: "Bar" },
  { name: "Pie Chart", value: "Pie" },
  { name: "Table", value: "Table" }
];

const CHART_TYPES = {
  "": [],
  Scalar: [
    { name: "Simple", value: "Simple" },
    { name: "Percent", value: "Percent" },
    { name: "Slider", value: "Slider" }
  ],
  Timeline: [{ name: "Timeline", value: "Timeline" }],
  Line: [
    { name: "Line", value: "Line" },
    { name: "Scatter", value: "Scatter" },
    { name: "Area", value: "Area" }
  ],
  Bar: [
    { name: "Bar", value: "Bar" },
    { name: "Stacked", value: "Stacked" },
    { name: "Horizontal", value: "Horizontal" }
  ],
  Pie: [
    { name: "Pie", value: "Pie" },
    { name: "Gauge", value: "Gauge" },
    { name: "Donut", value: "Donut" }
  ],
  Table: [{ name: "Table", value: "Table" }]
};

class ReportPresentationForm extends Component {
  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    await EditContainer.setTab(2);
  };

  validate = values => {
    let errors = {};
    if (!values.type) {
      errors.type = "نوع گزارش را انتخاب نمایید";
    }
    if (!values.chartType) {
      errors.chartType = "نمایش گزارش را انتخاب نمایید";
    }
    return errors;
  };

  renderForm = props => {
    const { values, setFieldValue } = props;
    return (
      <Form>
        <Effect
          onChange={(current, next) => {
            if (current.values.type !== next.values.type) {
              setFieldValue(
                "chartType",
                next.values.type ? CHART_TYPES[next.values.type][0].value : ""
              );
            }
          }}
        />
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
              <Grid item xs={12} sm={6} md={12}>
                <Input select name="chartType" label="نمایش گزارش" {...props}>
                  {CHART_TYPES[values.type].map(ct => (
                    <MenuItem value={ct.value} key={ct.value}>
                      {ct.name}
                    </MenuItem>
                  ))}
                </Input>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={1} />
          <Grid item xs={12} sm={12} md={8}>
            <Preview reportType={values.type} chartType={values.chartType} />
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

export default ReportPresentationForm;
