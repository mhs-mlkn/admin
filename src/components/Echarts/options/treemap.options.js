import get from "lodash/get";
import primary from "@material-ui/core/colors/cyan";

const fontFamily = "IRANSans";

export default function getTreemapOptions(report) {
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
      formatter: "{a} <br/>{b} : {c}"
    },
    textStyle: {
      fontFamily
    }
  };
}
