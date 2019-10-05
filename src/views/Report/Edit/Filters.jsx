import React, { Component } from "react";
import { Formik, Form, FieldArray } from "formik";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
// import Checkbox from "@material-ui/core/Checkbox";
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
import AutoSuggest from "./AutoSuggest";

const epmtyFilter = {
  key: "",
  title: "",
  validValueType: "NONE",
  validValue: "",
  type: "TEXT",
  operator: "EQ",
  required: false
};

const FILTERS_HEADERS = [
  "نام",
  "عنوان",
  "نمایش",
  "مقادیر لیست",
  "نوع",
  "عملگر",
  ""
];

class ReportFiltersForm extends Component {
  componentDidMount = () => {
    document.getElementById("mainPanel").scrollTop = 0;
  };

  componentDidUpdate = preProps => {
    // console.log(preProps);
  };

  submit = async (values, { resetForm }) => {
    const initialValues = EditContainer.getReport();
    resetForm(initialValues);
    await EditContainer.setReport(values);
    await EditContainer.setTab(4);
  };

  validate = values => {
    let errors = {};
    const filterErrors = [];
    for (const index in values.filters) {
      const filter = values.filters[index];
      if (!(filter.key && filter.title)) {
        filterErrors.push({});
      }
      if (!filter.key) {
        filterErrors[index]["key"] = { value: "مقدار وارد کنید" };
      }
      if (!filter.title) {
        filterErrors[index]["title"] = { value: "مقدار وارد کنید" };
      }
    }
    Object.keys(filterErrors).length > 0 &&
      (errors = Object.assign(errors, { filters: filterErrors }));
    return errors;
  };

  renderForm = formikProps => {
    const { filters } = formikProps.values;
    return (
      <Form>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <FieldArray
              name="filters"
              render={arrayHelpers => (
                <div>
                  <div style={{ display: "flex", padding: "16px" }}>
                    <h3 style={{ flexGrow: 1 }}>فیلتر گزارش</h3>
                    <div>
                      <IconButton
                        color="primary"
                        onClick={() => arrayHelpers.push(epmtyFilter)}
                      >
                        <Add />
                      </IconButton>
                    </div>
                  </div>
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
                        <TableRow key={i} style={{ verticalAlign: "top" }}>
                          <TableCell style={{ padding: "0 10px" }}>
                            <Input
                              name={`filters.${i}.key`}
                              label=""
                              value={f.key}
                              {...formikProps}
                            />
                          </TableCell>
                          <TableCell style={{ padding: "0 10px" }}>
                            <Input
                              name={`filters.${i}.title`}
                              label=""
                              value={f.title}
                              {...formikProps}
                            />
                          </TableCell>
                          <TableCell style={{ padding: "0 10px" }}>
                            <Input
                              select
                              name={`filters.${i}.validValueType`}
                              label=""
                              value={filters[i].validValueType}
                              {...formikProps}
                            >
                              <MenuItem value="NONE">نرمال</MenuItem>
                              <MenuItem value="CONST_LIST">
                                لیست (دستی)
                              </MenuItem>
                              <MenuItem value="QUERY_LIST">
                                لیست (گزارش)
                              </MenuItem>
                            </Input>
                          </TableCell>
                          <TableCell style={{ padding: "0 10px" }}>
                            {filters[i].validValueType === "NONE" && null}
                            {filters[i].validValueType === "CONST_LIST" && (
                              <Input
                                name={`filters.${i}.validValue`}
                                label=""
                                value={f.validValue}
                                multiline
                                placeholder="هر گرینه در یک خط"
                                style={{ overflow: "hidden" }}
                                {...formikProps}
                              />
                            )}
                            {filters[i].validValueType === "QUERY_LIST" && (
                              <AutoSuggest
                                name={`filters.${i}.validValue`}
                                label=""
                                placeholder="قسمتی از نام گزارش را تایپ کنید"
                                formikProps={{ ...formikProps }}
                                suggestions={this.props.suggestions}
                              />
                            )}
                          </TableCell>
                          <TableCell style={{ padding: "0 10px" }}>
                            <Input
                              select
                              name={`filters.${i}.type`}
                              label=""
                              value={filters[i].type}
                              {...formikProps}
                            >
                              <MenuItem value="TEXT">TEXT</MenuItem>
                              <MenuItem value="DECIMAL">DECIMAL</MenuItem>
                              <MenuItem value="FLOAT">FLOAT</MenuItem>
                              <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                              <MenuItem value="DATE">DATE</MenuItem>
                              <MenuItem value="DATE_STRING">
                                DATE STRING
                              </MenuItem>
                            </Input>
                          </TableCell>
                          <TableCell style={{ padding: "0 10px" }}>
                            <Input
                              select
                              name={`filters.${i}.operator`}
                              label=""
                              value={filters[i].operator}
                              {...formikProps}
                            >
                              <MenuItem value="EQ">EQ (مساوی)</MenuItem>
                              <MenuItem value="NEQ">NEQ (نامساوی)</MenuItem>
                              <MenuItem value="GT">GT (بزرگتر)</MenuItem>
                              <MenuItem value="GTE">GTE (بزرگترمساوی)</MenuItem>
                              <MenuItem value="LT">LT (کوچکتر)</MenuItem>
                              <MenuItem value="LTE">LTE (کوچکترمساوی)</MenuItem>
                              <MenuItem value="IN">IN (عضویت)</MenuItem>
                              <MenuItem value="START_WITH">
                                StartsWith (شروع با)
                              </MenuItem>
                              <MenuItem value="END_WITH">
                                EndsWith (خاتمه با)
                              </MenuItem>
                              <MenuItem value="CONTAIN">
                                Contains (شاملِ)
                              </MenuItem>
                              <MenuItem value="BETWEEN">BETWEEN (بین)</MenuItem>
                            </Input>
                          </TableCell>
                          {/* <TableCell style={{ padding: "0 10px" }}>
                              <Checkbox
                                name={`filters.${i}.required`}
                                checked={filters[i].required}
                                onChange={props.handleChange}
                              />
                            </TableCell> */}
                          <TableCell
                            style={{
                              padding: "0 10px",
                              verticalAlign: "middle"
                            }}
                          >
                            <IconButton
                              onClick={() => arrayHelpers.remove(i)}
                              color="secondary"
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <br />
            <br />
            <Button type="submit" color="primary" variant="contained">
              بعدی
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={() => EditContainer.setTab(2)}
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

export default ReportFiltersForm;
