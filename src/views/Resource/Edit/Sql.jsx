import React from "react";
import { Formik, Form, Field } from "formik";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { FormikTextField } from "../../../components/FormikInputs";
import container from "../../../containers/Resource.container";

const defaultValues = {
  name: "",
  url: "",
  driver: "OJDBC6_V11",
  username: "",
  password: ""
};

const Sql = props => {
  const { enqueueSnackbar } = useSnackbar();

  const handleReset = formikBag => () => {
    formikBag.resetForm(defaultValues);
  };

  const submit = values => {
    container
      .createSql(values)
      .then(res => props.onSubmit())
      .catch(error =>
        enqueueSnackbar("عملیات با خطا مواجه شد", { variant: "error" })
      );
  };

  const validation = values => {
    let errors = {};
    if (!values.name) {
      errors.name = "نام را وارد کنید";
    }
    if (!values.url) {
      errors.url = "آدرس را وارد کنید";
    }
    if (!values.username) {
      errors.username = "نام کاربری را وارد کنید";
    }
    if (!values.password) {
      errors.password = "گذرواژه را وارد کنید";
    }
    return errors;
  };

  const renderForm = formikBag => {
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
          <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
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
            <Field name="username">
              {innerProps => (
                <FormikTextField {...innerProps} label="username" />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="password">
              {innerProps => (
                <FormikTextField {...innerProps} label="password" />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="driver">
              {innerProps => (
                <FormikTextField {...innerProps} label="driver" select>
                  <MenuItem value="MYSQL_CONNECTOR_V8">
                    MYSQL_CONNECTOR_V8
                  </MenuItem>
                  <MenuItem value="OJDBC6_V11">OJDBC6_V11</MenuItem>
                  <MenuItem value="IMPALAJDBC4_V2">IMPALAJDBC4_V2</MenuItem>
                  <MenuItem value="H2_V1">H2_V1</MenuItem>
                </FormikTextField>
              )}
            </Field>
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

export default Sql;
