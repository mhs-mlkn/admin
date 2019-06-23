import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import COLORS from "../../constants/colors";

const getDataKeys = data => Object.keys(data).filter(key => key !== "name");

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5 + 18;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Chart extends PureComponent {
  render() {
    const { data, width, height } = this.props;
    const keys = getDataKeys(data[0] || {});
    return (
      <PieChart width={width} height={height}>
        {keys.length > 0 && (
          <Pie
            data={data}
            dataKey={keys[0]}
            label={renderCustomizedLabel}
            labelLine={false}
            paddingAngle={3}
            // innerRadius={70}
            // outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % 19]["500"]} />
            ))}
          </Pie>
        )}
        <Tooltip wrapperStyle={{ left: "0" }} />
        <Legend />
      </PieChart>
    );
  }
}

export default Chart;
