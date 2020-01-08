function radarData(report, data) {
  const series = [
    {
      type: "radar",
      areaStyle: { opacity: 0 },
      data: data.rows.map(row => ({
        name: row.cols[0],
        value: row.cols.slice(1)
      }))
    }
  ];

  return {
    radar: {
      indicator: data.cols.slice(1).map(col => ({ name: col.key }))
    },
    series
  };
}

export default radarData;
