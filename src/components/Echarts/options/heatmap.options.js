import get from "lodash/get";
import { primary, fontFamily } from "./options";

export default function heatmapOptions(report, savedOptions) {
  const direction = "rtl";
  const name = get(report, "name", "");

  return {
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
      position: "top"
    },
    animation: true,
    grid: {
      height: "50%",
      y: "10%"
    },
    xAxis: {
      type: "category",
      splitNumber: 20,
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: "category",
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "15%"
      // inRange: {
      //   color: ["#121122", "rgba(3,4,5,0.4)", "red"]
      // }
    },
    textStyle: {
      fontFamily
    }
  };
}
