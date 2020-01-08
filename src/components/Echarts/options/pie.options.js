import get from "lodash/get";
import { primary, fontFamily } from "./options";

export default function pieOptions(report, savedOptions) {
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
      show: true,
      trigger: "item",
      // formatter: "{a} <br/>{b} : {c} ({d}%)"
      formatter: params => {
        const { name, value, percent, encode } = params;
        const value2 = value[encode.value[0]];
        return `${name} : ${value2} (${percent}%)`;
      }
    },
    legend: {
      show: true,
      type: "scroll",
      top: "bottom",
      left: direction === "rtl" ? "left" : "right",
      textStyle: { color: "default" }
    },
    textStyle: {
      fontFamily
    }
  };
}
