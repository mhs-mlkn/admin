import React, { useState } from "react";
import {
  AreaChart,
  Area,
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
    <AreaChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 5, right: 10 }}
    >
      {keys.map((key, i) => (
        <Area
          type="monotone"
          dataKey={key}
          key={key}
          stroke={COLORS[i % 19]["500"]}
          fill={COLORS[i % 19]["500"]}
          opacity={opacity[key]}
        />
      ))}
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip wrapperStyle={{ left: "0" }} />
      <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </AreaChart>
  );
};

export default Chart;
