import React from "react";
import get from "lodash/get";
import InputMask from "react-input-mask";
import TextField from "@material-ui/core/TextField";

const MaskedInput = props => {
  const { mask, field, form, meta, ...textFieldProps } = props;
  const touched = get(form.touched, field.name);
  const error = get(form.errors, field.name);
  const hasError = touched && !!error;
  const value = get(field, "value", "");

  return (
    <InputMask
      mask={mask}
      maskPlaceholder={null}
      value={value}
      onChange={field.onChange}
    >
      <TextField
        variant="outlined"
        fullWidth
        helperText={hasError ? error : ""}
        error={hasError}
        {...textFieldProps}
        name={field.name}
      />
    </InputMask>
  );
};

export default MaskedInput;
