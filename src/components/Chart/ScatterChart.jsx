import React from "react";
import {
  ScatterChart,
  Scatter,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip
} from "recharts";
import COLORS from "../../constants/colors";

function getDataMin(data = [], keys = []) {
  let min = Number.MAX_SAFE_INTEGER;
  for (const item of data) {
    for (const key of keys) {
      const val = item[key];
      min = val < min ? val : min;
    }
  }
  return min;
}

function getDataRange(data = [], key) {
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  for (const item of data) {
    const val = item[key];
    min = val < min ? val : min;
    max = val > max ? val : max;
  }
  return [min, max];
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const getDataKeys = data => Object.keys(data).filter(key => key !== "name");

const Chart = props => {
  const { data, width, height } = props;
  const keys = getDataKeys(data[0] || {});

  return (
    <ScatterChart
      data={data}
      width={width}
      height={height}
      margin={{ top: 5, right: 10 }}
    >
      <XAxis dataKey="name" />

      <YAxis dataKey={keys[0]} domain={[getDataMin(data, keys), "dataMax"]} />

      {keys.length > 1 && (
        <ZAxis dataKey={keys[1]} range={getDataRange(data, keys[1])} />
      )}
      <CartesianGrid
        stroke="transparent"
        strokeDasharray="3 3"
        vertical={false}
        horizontalFill={["#555555", "#444444"]}
        fillOpacity={0.2}
      />
      <Tooltip
        wrapperStyle={{ left: "0" }}
        formatter={(value, name) => [formatNumber(value), name]}
      />
      <Scatter data={data} name={props.name}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % 19]["500"]} />
        ))}
      </Scatter>
    </ScatterChart>
  );
};

export default Chart;
