import React, { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
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
    <BarChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 5, right: 10 }}
    >
      {keys.map((key, i) => (
        <Bar
          type="monotone"
          dataKey={key}
          key={key}
          stroke={COLORS[i % 19]["500"]}
          fill={COLORS[i % 19]["500"]}
          opacity={opacity[key]}
        />
      ))}
      <CartesianGrid
        stroke="transparent"
        strokeDasharray="3 3"
        vertical={false}
        horizontalFill={["#555555", "#444444"]}
        fillOpacity={0.2}
      />
      <XAxis
        dataKey="name"
        label={{
          angle: 0,
          position: "insideBottomRight"
        }}
      />
      <YAxis
        label={{
          angle: -90,
          position: "insideLeft"
        }}
      />
      <Tooltip wrapperStyle={{ left: "0" }} cursor={{ fill: "#FFF1" }} />
      <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </BarChart>
  );
};

export default Chart;
