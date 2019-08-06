import React, { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  Legend
} from "recharts";
import COLORS from "../../constants/colors";

const getDataKeys = data => Object.keys(data).filter(key => key !== "name");

const Chart = props => {
  const [opacity, setOpacity] = useState({});
  const { data, width, height } = props;
  const keys = getDataKeys(data[0] || {});

  const handleMouseEnter = o => {
    const { dataKey } = o;
    setOpacity({
      ...opacity,
      [dataKey]: 0.5
    });
  };

  const handleMouseLeave = o => {
    const { dataKey } = o;
    setOpacity({
      ...opacity,
      [dataKey]: 1
    });
  };

  return (
    <RadarChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 5, right: 10 }}
    >
      {keys.map((key, i) => (
        <Radar
          type="monotone"
          dataKey={key}
          key={key}
          stroke={COLORS[i % 19]["500"]}
          fill={COLORS[i % 19]["500"]}
          opacity={opacity[key]}
        />
      ))}
      <PolarGrid />
      <PolarAngleAxis
        dataKey="name"
        tick={{ fill: "#e5e5e5", textAnchor: "start" }}
      />
      {/* <PolarRadiusAxis /> */}
      <Tooltip wrapperStyle={{ left: "0" }} />
      <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </RadarChart>
  );
};

export default Chart;
