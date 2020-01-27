import React, { Component } from "react";
import get from "lodash/get";
import Downshift from "downshift";
import deburr from "lodash/deburr";
import { withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Close from "@material-ui/icons/Close";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
      margin="normal"
      variant="outlined"
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    ((selectedItem || {}).label || "").indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(suggestions, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          // suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
          suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !==
            -1;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const styles = theme => ({
  root: {
    flexGrow: 1
    // height: 250
  },
  container: {
    flexGrow: 1,
    position: "relative",
    paddingRight: theme.spacing.unit
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  }
});

class IntegrationDownshift extends Component {
  getSelectedItem = () => {
    const { suggestions, name, formikProps } = this.props;
    // const selectedId = formikProps.values[name];
    const selectedId = get(formikProps.values, name);
    const item = suggestions.find(s => s.id === +selectedId);
    return item || null;
  };

  render = () => {
    const {
      classes,
      suggestions,
      name,
      label,
      placeholder,
      formikProps
    } = this.props;

    return (
      <Downshift
        onChange={selection =>
          formikProps.setFieldValue(name, selection ? selection.id : "")
        }
        itemToString={item => (item ? item.label : "")}
        initialSelectedItem={this.getSelectedItem()}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
          clearSelection
        }) => (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              name,
              label,
              placeholder,
              InputProps: getInputProps({
                endAdornment: selectedItem && (
                  <InputAdornment position="end">
                    <IconButton onClick={clearSelection}>
                      <Close fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              })
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(suggestions, inputValue).map(
                    (suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        highlightedIndex,
                        selectedItem
                      })
                  )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  };
}

export default withStyles(styles)(IntegrationDownshift);
