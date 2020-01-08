import get from "lodash/get";
import { formatChartValue, primary, fontFamily } from "./options";

export default function lineOptions(report, savedOptions) {
  const direction = "rtl";
  const name = get(report, "name", "");

  const options = {
    title: {
      show: true,
      text: name,
      textAlign: "left",
      [direction === "rtl" ? "right" : "left"]: "32px",
      textStyle: {
        fontSize: 18,
        fontWeight: "lighter",
        color: primary[500]
      }
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "shadow" // 'line' | 'shadow'
      }
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color: "default" }
    },
    grid: {
      left: 30,
      right: "4%",
      bottom: 35,
      containLabel: true
    },
    xAxis: {
      show: true,
      type: "category",
      splitLine: { show: false },
      name: "",
      nameLocation: "end",
      nameGap: 0,
      nameRotate: 0,
      nameTextStyle: {
        fontWeight: "normal",
        fontSize: 12,
        align: "center",
        verticalAlign: "top",
        lineHeight: 50
      },
      axisLabel: {
        rotate: 0,
        inside: false,
        label: "",
        devideBy: 1,
        formatter: value => value
      },
      axisLine: {
        lineStyle: { color: "default" }
      }
    },
    yAxis: {
      show: true,
      type: "value",
      name: "",
      nameLocation: "center",
      nameGap: 55,
      nameRotate: 90,
      nameTextStyle: {
        fontWeight: "bold",
        fontSize: 16,
        align: null,
        verticalAlign: null,
        lineHeight: null
      },
      axisLabel: {
        rotate: 0,
        inside: false,
        label: "",
        devideBy: 1,
        formatter: value => value
      },
      axisLine: {
        lineStyle: { color: "default" }
      }
    },
    textStyle: {
      fontFamily
    }
  };

  const xAxisLabel = get(
    savedOptions,
    "xAxis.axisLabel",
    options.xAxis.axisLabel
  );
  const yAxisLabel = get(
    savedOptions,
    "yAxis.axisLabel",
    options.yAxis.axisLabel
  );

  options.xAxis.axisLabel.formatter = value =>
    formatChartValue(value, xAxisLabel);

  options.yAxis.axisLabel.formatter = value =>
    formatChartValue(value, yAxisLabel);

  return options;
}
