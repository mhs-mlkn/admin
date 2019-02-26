import React, { PureComponent } from "react";

class Preview extends PureComponent {
  render = () => {
    const { reportType, chartType } = this.props;
    switch (reportType) {
      case "Table":
        return Preview;

      case "Scalar":
        return reportType;

      case "Timeline":
        return reportType;

      default:
        return `${reportType} - ${chartType}`;
    }
  };
}

export default Preview;
