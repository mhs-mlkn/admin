import get from "lodash/get";
import primary from "@material-ui/core/colors/cyan";

const fontFamily = "IRANSans";

export default function getBarOptions(report) {
  const direction = "rtl";
  const name = get(report, "name", "");
  const color = "#eee";

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
      show: true,
      trigger: "item"
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color }
    },
    textStyle: {
      fontFamily
    }
  };
}
