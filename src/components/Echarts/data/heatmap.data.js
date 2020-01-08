function heatmapData(report, data) {
  const series = [
    {
      type: "heatmap",
      label: {
        normal: {
          show: true
        }
      },
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      data: data.rows.map(row => row.cols)
    }
  ];

  return {
    series
  };
}

export default heatmapData;
