import React from "react";
import get from "lodash/get";
import { Scalar, getData } from ".";

const ScalarWrapper = props => {
  const { report, data, options, colorTheme, icon } = props;

  const id = get(report, "id", 1);
  const name = get(report, "name", "");
  const scalarData = getData(data);

  return (
    <Scalar
      id={id}
      name={name}
      icon={icon}
      colorTheme={colorTheme}
      data={scalarData}
      options={options}
    />
  );
};

export default ScalarWrapper;
