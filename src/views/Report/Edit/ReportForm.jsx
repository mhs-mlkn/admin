import React, { Component } from "react";
import { withFormik, FieldArray, Form } from "formik";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "components/CustomButtons/Button.jsx";
import Table from "components/Table/Table.jsx";
import Input from "../../../components/Formik/Input";
import Select from "../../../components/Formik/Select";
import Textarea from "../../../components/Formik/Textarea";
import ErrorMessage from "./ErrorMessage";
import Filters from "./Filters";
// import withSubscription from "../../../hoc/withSubscription";
import ReportContainer from "../../../containers/Report.container";
import { keyBy } from "lodash";

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

class ReportForm extends Component {
  state = { loading: false };

  componentDidUpdate = () => {
    this.params = keyBy(this.props.initialValues.params, "key");
  };

  onBlurQuery = e => {
    this.props.setFieldValue(`params`, []);
    let params = e.target.value.match(/:\w+/g) || [];
    params = params.map(p => {
      const key = p.slice(1);
      return {
        key,
        value: this.params[key].value || "",
        type: this.params[key].type || "TEXT",
        byUser: this.params[key].byUser || false,
        hint: this.params[key].hint || ""
      };
    });
    this.props.setFieldValue(`params`, params);
  };

  render() {
    const { values } = this.props;
    const { dbTypes, dbSources } = ReportContainer.state;
    return (
      <Form>
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Input name="name" label="نام" {...this.props} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Select name="type" label="نوع گزارش" {...this.props}>
                  {REPORT_TYPES.map(rt => (
                    <MenuItem value={rt.value} key={rt.value}>
                      {rt.name}
                    </MenuItem>
                  ))}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Select name="chartType" label="نمایش گزارش" {...this.props}>
                  {CHART_TYPES[values.type].map(ct => (
                    <MenuItem value={ct.value} key={ct.value}>
                      {ct.name}
                    </MenuItem>
                  ))}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Select name="source" label="نوع دیتابیس" {...this.props}>
                  {dbTypes.length > 0 ? (
                    dbTypes.map((db, i) => (
                      <MenuItem value={db} key={i}>
                        {db}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      {this.state.loading
                        ? "درحال دریافت اطلاعات"
                        : "دریافت انواع دیتابیس با خطا مواجه شد"}
                    </MenuItem>
                  )}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Select name="dataSource" label="دیتابیس" {...this.props}>
                  {dbSources[values.source].length > 0 ? (
                    dbSources[values.source].map(({ dataBaseName }, i) => (
                      <MenuItem value={dataBaseName} key={i}>
                        {dataBaseName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">نوع دیتابیس را انتخاب کنید</MenuItem>
                  )}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <Select name="drillDownId" label="گزارش زیرین" {...this.props}>
                  {ReportContainer.state.reports.length > 0 ? (
                    ReportContainer.state.reports.map(report => (
                      <MenuItem value={report.id} key={report.id}>
                        {report.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">گزارش را انتخاب کنید</MenuItem>
                  )}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Textarea
                  name="query"
                  label="کوئری"
                  leftAlign
                  onBlur={this.onBlurQuery}
                  {...this.props}
                />
              </GridItem>
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
                                  label={p.key}
                                  {...this.props}
                                />
                                <ErrorMessage name={`params.${index}.value`} />
                              </>,
                              <Select
                                name={`params.${index}.type`}
                                label="نوع"
                                value={values.params[index].type}
                                {...this.props}
                              >
                                <MenuItem value="TEXT">TEXT</MenuItem>
                                <MenuItem value="DECIMAL">DECIMAL</MenuItem>
                                <MenuItem value="FLOAT">FLOAT</MenuItem>
                                <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                              </Select>,
                              <Checkbox
                                name={`params.${index}.byUser`}
                                checked={values.params[index].byUser}
                                onChange={this.props.handleChange}
                              />,
                              <Input
                                name={`params.${index}.hint`}
                                label={"راهنما"}
                                {...this.props}
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
          <GridItem xs={12} sm={6} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FieldArray
                  name="filters"
                  render={arrayHelpers => (
                    <Filters
                      arrayHelpers={arrayHelpers}
                      filters={values.filters}
                      formProps={this.props}
                    />
                  )}
                />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary">
              تایید
            </Button>
            {/*
             disabled={isSubmitting}
            <Button type="reset" color="danger">
              از اول
            </Button> */}
          </GridItem>
        </GridContainer>
      </Form>
    );
  }
}

const validate = values => {
  let errors = {};
  if (!values.name) {
    errors.name = "نام را وارد کنید";
  }
  if (!values.type) {
    errors.type = "نوع گزارش را انتخاب نمایید";
  }
  if (!values.chartType) {
    errors.chartType = "نمایش گزارش را انتخاب نمایید";
  }
  if (!values.source) {
    errors.source = "نوع دیتابیس را انتخاب نمایید";
  }
  if (!values.dataSource) {
    errors.dataSource = "دیتابیس را انتخاب نمایید";
  }
  if (!values.query) {
    errors.query = "کوئری را وارد کنید";
  }

  const errorParams = {};
  for (const key in values.params) {
    if (values.params.hasOwnProperty(key)) {
      const param = values.params[key];
      // !param.byUser &&
      if (!param.value) {
        errorParams[key] = { value: "مقدار وارد کنید" };
      }
    }
  }
  Object.keys(errorParams).length > 0 &&
    (errors = Object.assign(errors, { params: errorParams }));

  const errorFilters = {};
  for (const filter of values.filters) {
    if (!filter.key) {
      errorFilters["key"] = { value: "مقدار وارد کنید" };
    }
    if (!filter.title) {
      errorFilters["title"] = { value: "مقدار وارد کنید" };
    }
  }
  Object.keys(errorFilters).length > 0 &&
    (errors = Object.assign(errors, { filters: errorFilters }));

  return errors;
};

const handleSubmit = (values, { setSubmitting, resetForm, props }) => {
  // setSubmitting(false);
  resetForm(props.initialValues);
  props.submit(values);
};

// const wrappedWithSubscription = withSubscription(
//   { ReportContainer },
//   ReportForm
// );

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => props.initialValues,
  validate,
  handleSubmit,
  displayName: "ReportForm"
})(ReportForm);
