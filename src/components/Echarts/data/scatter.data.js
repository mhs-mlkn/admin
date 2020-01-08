export default function scatterData(report, data) {
  const grouped = data.rows.reduce((series, row) => {
    const name = row.cols[0];
    series[name] = series[name] ? series[name] : [];
    series[name].push(row.cols.slice(1));
    return series;
  }, {});

  const series = [];
  for (let key in grouped) {
    series.push({
      type: "scatter",
      name: key,
      data: grouped[key],
      symbolSize: data => {
        return data.length > 2 ? data[data.length - 1] : 10;
      }
    });
  }

  return {
    series
  };
}
