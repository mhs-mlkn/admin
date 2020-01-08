import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const themes = [
  "default",
  "light",
  "dark",
  "vintage",
  "macarons",
  "shine",
  "roma",
  "infographic"
];

const ThemeMenu = props => {
  const { theme = "default", onChange } = props;

  const handleSelectTheme = e => {
    onChange(e.target.value);
  };

  return (
    <TextField
      select
      value={theme}
      onChange={handleSelectTheme}
      variant="outlined"
      label="انتخاب تِم"
      size="small"
      margin="dense"
      style={{ width: 110 }}
    >
      {themes.map(t => (
        <MenuItem key={t} value={t} selected={t === theme}>
          {t}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ThemeMenu;
