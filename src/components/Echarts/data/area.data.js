export default function areaData(report, data) {
  const length = data.cols.length === 0 ? 0 : data.cols.length - 1;

  return {
    dataset: {
      dimensions: data.cols.map(c => c.key),
      source: data.rows.map(r => r.cols)
    },
    series: Array(length).fill({
      type: "line",
      areaStyle: { opacity: 0.3 },
      label: {
        show: false,
        position: "top"
      }
    })
  };
}
