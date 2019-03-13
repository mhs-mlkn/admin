import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Input from "../../../components/FormikInputs";
import EditContainer from "./EditReport.container";
import ErrorMessage from "./ErrorMessage";

const epmtyFilter = {
  key: "",
  title: "",
  type: "TEXT",
  operator: "EQ",
  required: false
};

const FILTERS_HEADERS = ["نام", "عنوان", "نوع", "عملگر", "الزامی؟", ""];

class ReportFiltersForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
  };

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
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <FieldArray
              name="filters"
              render={arrayHelpers => (
                <Card>
                  <CardHeader
                    color="primary"
                    action={
                      <IconButton
                        onClick={() => arrayHelpers.push(epmtyFilter)}
                      >
                        <Add />
                      </IconButton>
                    }
                    title="فیلتر گزارش"
                  />
                  <CardContent>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {FILTERS_HEADERS.map((header, key) => (
                            <TableCell
                              style={{ padding: "0 10px" }}
                              key={key}
                              align="left"
                            >
                              {header}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filters.map((f, i) => (
                          <TableRow key={i}>
                            <TableCell style={{ padding: "0 10px" }}>
                              <Input
                                name={`filters.${i}.key`}
                                label=""
                                value={f.key}
                                {...props}
                              />
                              <ErrorMessage name={`filters.${i}.key`} />
                            </TableCell>
                            <TableCell style={{ padding: "0 10px" }}>
                              <Input
                                name={`filters.${i}.title`}
                                label=""
                                value={f.title}
                                {...props}
                              />
                              <ErrorMessage name={`filters.${i}.title`} />
                            </TableCell>
                            <TableCell style={{ padding: "0 10px" }}>
                              <Input
                                select
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
                              </Input>
                            </TableCell>
                            <TableCell style={{ padding: "0 10px" }}>
                              <Input
                                select
                                name={`filters.${i}.operator`}
                                label=""
                                value={filters[i].operator}
                                {...props}
                              >
                                <MenuItem value="EQ">EQ (مساوی)</MenuItem>
                                <MenuItem value="NEQ">NEQ (نامساوی)</MenuItem>
                                <MenuItem value="GT">GT (بزرگتر)</MenuItem>
                                <MenuItem value="GTE">
                                  GTE (بزرگترمساوی)
                                </MenuItem>
                                <MenuItem value="LT">LT (کوچکتر)</MenuItem>
                                <MenuItem value="LTE">
                                  LTE (کوچکترمساوی)
                                </MenuItem>
                                <MenuItem value="IN">IN (عضویت)</MenuItem>
                                <MenuItem value="StartsWith">
                                  StartsWith (شروع با)
                                </MenuItem>
                                <MenuItem value="EndsWith">
                                  EndsWith (خاتمه با)
                                </MenuItem>
                                <MenuItem value="Contains">
                                  Contains (شاملِ)
                                </MenuItem>
                                <MenuItem value="BETWEEN">
                                  BETWEEN (بین)
                                </MenuItem>
                              </Input>
                            </TableCell>
                            <TableCell style={{ padding: "0 10px" }}>
                              <Checkbox
                                name={`filters.${i}.required`}
                                checked={filters[i].required}
                                onChange={props.handleChange}
                              />
                            </TableCell>
                            <TableCell style={{ padding: "0 10px" }}>
                              <IconButton
                                onClick={() => arrayHelpers.remove(i)}
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary">
              ذخیره
            </Button>
            <Button type="button" onClick={() => EditContainer.setTab(2)}>
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

export default ReportFiltersForm;
