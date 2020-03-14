import React from "react";
import get from "lodash/get";
import TextField from "@material-ui/core/TextField";

class FormikInput extends React.Component {
  render() {
    const { field, form, meta, children, ...textFieldProps } = this.props;
    const error = get(form.errors, field.name);
    const touched = get(form.touched, field.name);
    const hasError = touched && !!error;
    const value = get(field, "value", "");

    return (
      <TextField
        variant="outlined"
        fullWidth
        helperText={hasError ? error : ""}
        error={hasError}
        {...textFieldProps}
        name={field.name}
        inputProps={{ ...field, ...textFieldProps.inputProps, value }}
      >
        {children}
      </TextField>
    );
  }
}

export default FormikInput;
