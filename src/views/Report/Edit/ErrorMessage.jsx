import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Field, getIn } from "formik";

const ErrorMessage = ({ name }) => {
  return (
    <Field
      name={name}
      render={({ form }) => {
        const hasError = getIn(form.errors, name);
        const hasTouched = getIn(form.touched, name);
        return !!hasTouched && !!hasError ? (
          <FormHelperText error>مقدار وارد کنید</FormHelperText>
        ) : null;
      }}
    />
  );
};

export default ErrorMessage;
