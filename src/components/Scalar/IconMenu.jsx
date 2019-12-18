import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getIcon } from ".";

const icons = [
  "info",
  "notifications",
  "error",
  "warning",
  "checkbox",
  "favorite",
  "message",
  "email",
  "accountbox",
  "schedule",
  "attachmoney",
  "euro",
  "trendingup",
  "trendingdown"
];

const IconMenu = props => {
  const { icon, onChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTheme = icon => () => {
    onChange(icon);
  };

  const Icon = getIcon(icon);

  const getMenuItemIcon = icon => {
    const MenuIcon = getIcon(icon);
    return (
      <Tooltip title={icon}>
        <MenuIcon fontSize="small" />
      </Tooltip>
    );
  };

  return (
    <>
      <IconButton
        size="small"
        color="primary"
        title={`انتخاب آیکون (${icon})`}
        onClick={handleClick}
      >
        <Icon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {icons.map(ico => (
          <MenuItem
            key={ico}
            selected={ico === icon}
            onClick={handleSelectTheme(ico)}
          >
            {getMenuItemIcon(ico)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default IconMenu;
