import React from "react";
import { Formik, Form, Field } from "formik";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { FormikTextField } from "../../../components/FormikInputs";
import container from "../../../containers/Resource.container";

const defaultValues = {
  name: "",
  url: ""
};

const OData = props => {
  const { enqueueSnackbar } = useSnackbar();

  const handleReset = formikBag => () => {
    formikBag.resetForm(defaultValues);
  };

  const submit = values => {
    container
      .createOData(values)
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

export default OData;
