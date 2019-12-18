import React from "react";
import { getIcon } from ".";

const ScalarIcon = props => {
  const { icon, style } = props;
  const Icon = getIcon(icon);

  return <Icon color="primary" style={style} />;
};

export default ScalarIcon;
