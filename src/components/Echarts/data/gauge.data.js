import get from "lodash/get";

function gaugeData(report, data) {
  const name = get(data, "cols.0.key", "");

  const series = [
    {
      name,
      type: "gauge",
      title: { show: false },
      radius: "75%",
      startAngle: 225,
      endAngle: -45,
      clockwise: true,
      min: 0,
      max: 100,
      detail: { show: false, formatter: "{value}" },
      axisLine: {
        lineStyle: {
          color: [
            [0.2, "#91c7ae"],
            [0.8, "#63869e"],
            [1, "#c23531"]
          ]
        }
      },
      data: data.rows.map(row => ({
        name: row.cols[0],
        value: row.cols[1]
      }))
    }
  ];

  return {
    series
  };
}

export default gaugeData;
