import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Button from "components/CustomButtons/Button.jsx";
import Select from "components/Formik/Select";
import Input from "components/Formik/Input";
import EditContainer from "./EditReport.container";
import ErrorMessage from "./ErrorMessage";

const epmtyFilter = {
  key: "نام فیلد",
  title: "عنوان",
  type: "TEXT",
  operator: "EQ",
  required: false
};

class ReportFiltersForm extends Component {
  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    this.props.onSubmit(EditContainer.state.report);
  };

  validate = values => {
    let errors = {};
    const filterErrors = {};
    for (const filter of values.filters) {
      if (!filter.key) {
        filterErrors["key"] = { value: "مقدار وارد کنید" };
      }
      if (!filter.title) {
        filterErrors["title"] = { value: "مقدار وارد کنید" };
      }
    }
    Object.keys(filterErrors).length > 0 &&
      (errors = Object.assign(errors, { filters: filterErrors }));
    return errors;
  };

  renderForm = props => {
    const { filters } = props.values;
    return (
      <Form>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <FieldArray
              name="filters"
              render={arrayHelpers => (
                <Card>
                  <CardHeader
                    color="primary"
                    actionIcon={<Add />}
                    onAction={() => arrayHelpers.push(epmtyFilter)}
                  >
                    <h4 className="cardTitleWhite">فیلتر گزارش</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={[
                        "نام",
                        "عنوان",
                        "نوع",
                        "عملگر",
                        "الزامی؟",
                        ""
                      ]}
                      tableData={
                        filters.length === 0
                          ? [["", "", "", "", "", ""]]
                          : filters.map((f, i) => [
                              <>
                                <Input
                                  name={`filters.${i}.key`}
                                  label=""
                                  value={f.key}
                                  {...props}
                                />
                                <ErrorMessage name={`filters.${i}.key`} />
                              </>,
                              <>
                                <Input
                                  name={`filters.${i}.title`}
                                  label=""
                                  value={f.title}
                                  {...props}
                                />
                                <ErrorMessage name={`filters.${i}.title`} />
                              </>,
                              <Select
                                name={`filters.${i}.type`}
                                label=""
                                value={filters[i].type}
                                {...props}
                              >
                                <MenuItem value="TEXT">TEXT</MenuItem>
                                <MenuItem value="DECIMAL">DECIMAL</MenuItem>
                                <MenuItem value="FLOAT">FLOAT</MenuItem>
                                <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                                <MenuItem value="DATE">DATE</MenuItem>
                              </Select>,
                              <Select
                                name={`filters.${i}.operator`}
                                label=""
                                value={filters[i].operator}
                                {...props}
                              >
                                <MenuItem value="EQ">EQ</MenuItem>
                                <MenuItem value="NEQ">NEQ</MenuItem>
                                <MenuItem value="GT">GT</MenuItem>
                                <MenuItem value="GTE">GTE</MenuItem>
                                <MenuItem value="LT">LT</MenuItem>
                                <MenuItem value="LTE">LTE</MenuItem>
                                <MenuItem value="IN">IN</MenuItem>
                                <MenuItem value="LIKE">LIKE</MenuItem>
                                <MenuItem value="BETWEEN">BETWEEN</MenuItem>
                              </Select>,
                              <Checkbox
                                name={`filters.${i}.required`}
                                checked={filters[i].required}
                                onChange={props.handleChange}
                              />,
                              <IconButton
                                className="tableAction"
                                onClick={() => arrayHelpers.remove(i)}
                              >
                                <Close />
                              </IconButton>
                            ])
                      }
                    />
                  </CardBody>
                </Card>
              )}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary">
              ایجاد
            </Button>
            <Button type="button" onClick={() => EditContainer.setTab(2)}>
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

export default ReportFiltersForm;
