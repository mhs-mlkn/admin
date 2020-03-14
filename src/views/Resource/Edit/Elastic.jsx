import React, { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { FormikTextField } from "../../../components/FormikInputs";
import container from "../../../containers/Resource.container";

const defaultValues = {
  name: "",
  ip: "",
  port: "",
  clusterNames: "",
  node: "",
  homePath: "",
  keyStorePassword: "",
  trustStorePassword: ""
};

const Elastic = props => {
  const { enqueueSnackbar } = useSnackbar();
  const [keyStore, setKeyStore] = useState();
  const [trustStore, setTrustStore] = useState();
  const keyRef = useRef();
  const trustRef = useRef();

  const handleChangeFile = name => e => {
    // console.log(e.target.files[0]);

    if (name === "keyStore") {
      setKeyStore(e.target.files[0]);
    } else if (name === "trustStore") {
      setTrustStore(e.target.files[0]);
    }
  };

  const handleReset = formikBag => () => {
    setKeyStore(null);
    setTrustStore(null);
    keyRef.current.value = null;
    trustRef.current.value = null;

    formikBag.resetForm(defaultValues);
  };

  const submit = values => {
    if (!keyStore || !trustStore) {
      return enqueueSnackbar(
        "انتخاب فایل های keystore و trustStore الزامی است",
        { variant: "error" }
      );
    }
    const formData = new FormData();
    formData.append("keyStore", keyStore);
    formData.append("trustStore", trustStore);
    formData.append("name", values.name);
    formData.append("address", values.ip);
    formData.append("port", values.port);
    formData.append("clusterNames", values.clusterNames);
    formData.append("nodeName", values.node);
    formData.append("homePath", values.homePath);
    formData.append("keyStorePassword", values.keyStorePassword);
    formData.append("trustStorePassword", values.trustStorePassword);
    container
      .createElastic(formData)
      .then(res => props.onSubmit())
      .catch(error =>
        enqueueSnackbar("عملیات با خطا مواجه شد", { variant: "error" })
      );
  };

  const validation = values => {
    let errors = {};
    const ipRegex = RegExp(
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
    );
    if (!values.name) {
      errors.name = "نام را وارد کنید";
    }
    if (!values.ip) {
      errors.ip = "آدرس را وارد کنید";
    } else if (!ipRegex.test(values.ip)) {
      errors.ip = "آدرس ip نامعتبر است";
    }
    if (!values.port) {
      errors.port = "پورت را وارد کنید";
    } else if (values.port < 1 || values.port > 65535) {
      errors.port = "پورت نامعتبر است";
    }
    if (!values.clusterNames) {
      errors.clusterNames = "مقدار وارد کنید";
    }
    if (!values.node) {
      errors.node = "مقدار وارد کنید";
    }
    if (!values.homePath) {
      errors.homePath = "مقدار وارد کنید";
    }
    if (!values.keyStorePassword) {
      errors.keyStorePassword = "مقدار وارد کنید";
    }
    if (!values.trustStorePassword) {
      errors.trustStorePassword = "مقدار وارد کنید";
    }
    return errors;
  };

  const renderForm = formikBag => {
    return (
      <Form autoComplete="off">
        <Grid container spacing={16} style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <input
              ref={keyRef}
              name="keyStore"
              accept=".jks"
              style={{ display: "none" }}
              id="keyStore-button-file"
              type="file"
              onChange={handleChangeFile("keyStore")}
            />
            <label htmlFor="keyStore-button-file">
              <Button
                variant="contained"
                color={!!keyStore ? "primary" : "secondary"}
                component="span"
              >
                {keyStore ? keyStore.name : "انتخاب keyStore"}
              </Button>
            </label>
            <input
              ref={trustRef}
              name="trustStore"
              accept=".jks"
              style={{ display: "none" }}
              id="trustStore-button-file"
              type="file"
              onChange={handleChangeFile("trustStore")}
            />
            <label htmlFor="trustStore-button-file">
              <Button
                variant="contained"
                color={!!trustStore ? "primary" : "secondary"}
                component="span"
              >
                {trustStore ? trustStore.name : "انتخاب trustStore"}
              </Button>
            </label>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="name">
              {innerProps => <FormikTextField {...innerProps} label="name" />}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="ip">
              {innerProps => <FormikTextField {...innerProps} label="ip" />}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="port">
              {innerProps => (
                <FormikTextField
                  {...innerProps}
                  label="port"
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 65535,
                    maxLength: 5
                  }}
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="clusterNames">
              {innerProps => (
                <FormikTextField {...innerProps} label="clusterNames" />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="node">
              {innerProps => <FormikTextField {...innerProps} label="node" />}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="homePath">
              {innerProps => (
                <FormikTextField {...innerProps} label="homePath" />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="keyStorePassword">
              {innerProps => (
                <FormikTextField
                  {...innerProps}
                  label="keyStorePassword"
                  type="password"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Field name="trustStorePassword">
              {innerProps => (
                <FormikTextField
                  {...innerProps}
                  label="trustStorePassword"
                  type="password"
                />
              )}
            </Field>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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

export default Elastic;
