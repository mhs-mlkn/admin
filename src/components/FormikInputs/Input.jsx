import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { get } from "lodash";

const styles = theme => ({
  textField: {
    paddingRight: theme.spacing.unit
  }
});

const Input = props => {
  const {
    name,
    label,
    value = "",
    margin = "normal",
    select = false,
    multiline = false,
    type = "text",
    classes
  } = props;
  const touched = get(props.touched, name);
  const error = get(props.errors, name);
  const hasError = !!error;
  const handleChange = e => {
    props.handleChange(e);
    props.onChange && props.onChange(e);
  };
  return (
    <TextField
      select={select}
      multiline={multiline}
      name={name}
      id={`${name}-id`}
      label={label}
      value={get(props.values, name) || value}
      type={type}
      onChange={handleChange}
      margin={margin}
      variant="outlined"
      fullWidth
      error={touched && hasError}
      helperText={touched && hasError && (get(error, "value") || error)}
      placeholder={props.placeholder}
      style={props.style}
      disabled={props.disabled}
      inputProps={{
        name: name,
        id: `${name}-id`,
        onChange: handleChange,
        onBlur: props.handleBlur,
        style: props.style
      }}
      className={classes.textField}
    >
      {props.children}
    </TextField>
  );
};

export default withStyles(styles)(Input);
