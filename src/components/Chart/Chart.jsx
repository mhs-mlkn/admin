import React from "react";
import { ResponsiveContainer } from "recharts";
import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import RadarChart from "./RadarChart";
import ScatterChart from "./ScatterChart";

const Chart = props => {
  const { type, aspect = 0, ...rest } = props;

  const getChart = type => {
    switch (type) {
      case "LINE":
        return <LineChart {...rest} />;

      case "SCATTER":
        return <ScatterChart {...rest} />;

      case "AREA":
        return <AreaChart {...rest} />;

      case "BAR":
        return <BarChart {...rest} />;

      case "PIE":
        return <PieChart {...rest} />;

      case "RADAR":
        return <RadarChart {...rest} />;

      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer aspect={aspect}>{getChart(type)}</ResponsiveContainer>
  );
};

export default Chart;
