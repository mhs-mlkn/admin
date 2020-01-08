import get from "lodash/get";
import { primary, fontFamily } from "./options";

export default function radarOptions(instance, savedOptions) {
  const direction = "rtl";
  const name = get(instance, "name", "");

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
    radar: {
      radius: "75%",
      shape: "polygon"
    },
    textStyle: {
      fontFamily
    }
  };
}
