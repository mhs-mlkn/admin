import React, { useEffect, useState } from "react";
import merge from "lodash/merge";
import chartOptions from "./options";
import chartData from "./data";
import Echarts from "./Echarts";

const Chart = props => {
  const { report, data, theme } = props;
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      ...merge(
        {},
        options,
        chartOptions(report),
        chartData(report, data || { cols: [], rows: [], totalCount: 0 })
      )
    });
  }, [data, report.type]);

  return <Echarts options={options} loading={false} chartTheme={theme} />;
};

export default Chart;
