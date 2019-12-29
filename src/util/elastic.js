import { JSONPath } from "jsonpath-plus";
import uniq from "lodash/uniq";
import get from "lodash/get";
import keys from "lodash/keys";
import values from "lodash/values";
import moment from "moment-jalaali";


// const temp = `{
//   xAxis: {
//     source: "aggregations.2.buckets[*]",
//     path: "key",
//     type: "DATE"
//   },
//  series: {
//       source: "3.buckets[*]",
//       path: "key",
//       value: "4.buckets.fasokhan.5.buckets.input.doc_count",
//       type: "STRING" | "NUMBER" | "DATE"
//     }
// }`;

export default function processElastic(response, template) {
  // eslint-disable-next-line
  template = eval("(" + template + ")");
  const seriesPath = `${template.xAxis.source}.${template.series.source}.${template.series.path}`;
  const series = !!template.series.title ? {[template.series.title]: 0} : uniq(JSONPath(seriesPath, response)).reduce(
    (values, cur) => ({ ...values, [cur]: 0 }),
    {}
  );

  const data = JSONPath(template.xAxis.source, response).map(xItem => {
    const values = JSONPath(template.series.source, xItem).reduce(
      (values, cur) => {
        return {
          ...values,
          [!!template.series.title ? template.series.title : get(cur, template.series.path)]: get(cur, template.series.value, 0)
        };
      },
      series
    );

    const xValue = get(xItem, template.xAxis.path);
    return {
      [template.xAxis.title || "name"]:
        template.xAxis.type === "DATE"
          ? moment(xValue).format("jYYYY/jMM/jDD")
          : xValue,
      ...values
    };
  });

  return {
    cols: keys(data[0]).map((key, i) => {
        return {
          key,
          type: i === 0 ? (template.xAxis.type || "STRING") : (template.series.type || "NUMBER")
        }
    }),
    rows: data.map(row => ({cols: values(row)})),
    totalCount: data.length
  }
}