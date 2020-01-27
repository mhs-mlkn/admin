import React, { Component } from "react";
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
          suggestion.label.indexOf(inputValue) !== -1;

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
  render = () => {
    const {
      classes,
      suggestions,
      label,
      placeholder,
      onChange,
      initialSelectedItem
    } = this.props;

    return (
      <Downshift
        onChange={onChange}
        itemToString={item => (item ? item.label : "")}
        initialSelectedItem={initialSelectedItem}
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
              classes,
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
