import React, { PureComponent } from "react";
import Table from "../../../components/Table/Table";
import { data, columns } from "../../../mockdata";

class Preview extends PureComponent {
  render = () => {
    const { reportType, chartType } = this.props;
    switch (reportType) {
      case "Table":
        return (
          <Table
            cols={columns}
            rows={data.slice(0, 4)}
            count={data.length}
            rowsPerPage={10}
            page={0}
          />
        );

      case "Scalar":
        return <span>{reportType}</span>;

      case "Timeline":
        return <span>{reportType}</span>;

      default:
        return `${reportType} - ${chartType}`;
    }
  };
}

export default Preview;
