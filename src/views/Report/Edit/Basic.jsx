import React, { Component } from "react";
import { Formik, Form } from "formik";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "components/CustomButtons/Button.jsx";
import Input from "components/Formik/Input";
import Select from "components/Formik/Select";
import Textarea from "components/Formik/Textarea";
import ReportContainer from "containers/Report.container";
import EditContainer from "./EditReport.container";

class ReportBasicForm extends Component {
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
      <Form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <Input name="name" label="نام" {...props} />
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Select name="source" label="نوع دیتابیس" {...props}>
                  {dbTypes.map((db, i) => (
                    <MenuItem value={db} key={i}>
                      {db}
                    </MenuItem>
                  ))}
                </Select>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Select name="dataSource" label="اتصال دیتابیس" {...props}>
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
              <GridItem xs={12} sm={6} md={3}>
                <Select name="drillDownId" label="گزارش تکمیلی" {...props}>
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
                <Textarea name="description" label="توضیحات" {...props} />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary">
              بعدی
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

export default ReportBasicForm;
