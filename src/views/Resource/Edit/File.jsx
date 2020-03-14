import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import MuiTableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import { FormikTextField } from "../../../components/FormikInputs";
import container from "../../../containers/Resource.container";

const defaultValues = {
  name: "",
  url: "",
  fileType: "JSON", // JSON | XML | CSV
  columns: []
};

const COLUMNS_HEADERS = ["ایندکس", "نام", "نوع", "مسیر", ""];

const defaultColumn = {
  index: 0,
  name: "",
  type: "VARCHAR",
  path: ""
};

const TableCell = withStyles(theme => ({
  root: {
    padding: "4px 8px 4px 4px"
  },
  head: {
    padding: "4px 4px 4px 8px",
    backgroundColor: theme.palette.grey["800"],
    fontSize: "14px"
  }
}))(MuiTableCell);

const File = props => {
  const { enqueueSnackbar } = useSnackbar();

  const handleReset = formikBag => () => {
    formikBag.resetForm(defaultValues);
  };

  const submit = values => {
    values.type = "FILE";
    values.dataSourceColumnVOS = values.columns;
    container
      .createFile(values)
      .then(res => props.onSubmit())
      .catch(error =>
        enqueueSnackbar("عملیات با خطا مواجه شد", { variant: "error" })
      );
  };

  const validation = values => {
    let errors = {};
    const columnsErrors = [];
    if (!values.name) {
      errors.name = "نام را وارد کنید";
    }
    if (!values.url) {
      errors.url = "آدرس را وارد کنید";
    }
    for (const index in values.columns) {
      const col = values.columns[index];
      if (!(col.index && col.name && col.path)) {
        columnsErrors.push({});
      }
      if (col.index < 1) {
        columnsErrors[index]["index"] = "مقدار بزرگتر از یک وارد کنید";
      }
      if (!col.name) {
        columnsErrors[index]["name"] = "مقدار وارد کنید";
      }
      if (values.fileType !== "CSV" && !col.path) {
        columnsErrors[index]["path"] = "مقدار وارد کنید";
      }
    }
    Object.keys(columnsErrors).length > 0 &&
      (errors = Object.assign(errors, { columns: columnsErrors }));
    return errors;
  };

  const renderForm = formikBag => {
    const { columns } = formikBag.values;
    return (
      <Form autoComplete="off" noValidate>
        <Grid container spacing={16}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ marginTop: 16 }}
          >
            <Button type="submit" variant="contained" color="primary">
              ذخیره
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset(formikBag)}
            >
              پاک
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="name">
              {innerProps => <FormikTextField {...innerProps} label="name" />}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={5}>
            <Field name="url">
              {innerProps => (
                <FormikTextField
                  {...innerProps}
                  label="url"
                  style={{ direction: "ltr" }}
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="fileType">
              {innerProps => (
                <FormikTextField {...innerProps} label="fileType" select>
                  <MenuItem value="JSON">JSON</MenuItem>
                  <MenuItem value="XML">XML</MenuItem>
                  <MenuItem value="CSV">CSV</MenuItem>
                </FormikTextField>
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <FieldArray
              name="columns"
              render={arrayHelpers => (
                <div>
                  <div style={{ display: "flex", padding: "16px" }}>
                    <Typography variant="h5" style={{ flexGrow: 1 }}>
                      ستون های فایل
                    </Typography>
                    <div>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => arrayHelpers.push(defaultColumn)}
                      >
                        <AddIcon />
                      </Button>
                    </div>
                  </div>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {COLUMNS_HEADERS.map((header, key) => (
                          <TableCell key={key}>{header}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {columns.map((f, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Field name={`columns.${i}.index`}>
                              {innerProps => (
                                <FormikTextField
                                  {...innerProps}
                                  type="number"
                                  inputProps={{ min: 1 }}
                                />
                              )}
                            </Field>
                          </TableCell>
                          <TableCell>
                            <Field name={`columns.${i}.name`}>
                              {innerProps => (
                                <FormikTextField {...innerProps} />
                              )}
                            </Field>
                          </TableCell>
                          <TableCell>
                            <Field name={`columns.${i}.type`}>
                              {innerProps => (
                                <FormikTextField {...innerProps} select>
                                  <MenuItem value="INT">INT</MenuItem>
                                  <MenuItem value="VARCHAR">VARCHAR</MenuItem>
                                  <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                                </FormikTextField>
                              )}
                            </Field>
                          </TableCell>
                          <TableCell>
                            <Field name={`columns.${i}.path`}>
                              {innerProps => (
                                <FormikTextField
                                  {...innerProps}
                                  disabled={formikBag.values.fileType === "CSV"}
                                  style={{ direction: "ltr" }}
                                />
                              )}
                            </Field>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              onClick={() => arrayHelpers.remove(i)}
                              color="secondary"
                            >
                              <CloseIcon fontSize="small" />
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
        </Grid>
      </Form>
    );
  };

  return (
    <Formik
      initialValues={defaultValues}
      enableReinitialize
      onSubmit={submit}
      validate={validation}
      render={renderForm}
    />
  );
};

export default File;
