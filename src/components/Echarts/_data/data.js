import get from "lodash/get";
import barData from "./bar.data";
import lineData from "./line.data";
import areaData from "./area.data";
import pieData from "./pie.data";
import gaugeData from "./gauge.data";
import treemapData from "./treemap.data";
import heatmapData from "./heatmap.data";

export default function getData(report, data) {
  const reportType = get(report, "type", "BAR");

  switch (reportType) {
    case "AREA":
      return areaData(report, data);
    case "BAR":
      return barData(report, data);
    case "LINE":
      return lineData(report, data);
    case "PIE":
      return pieData(report, data);
    case "GAUGE":
      return gaugeData(report, data);
    case "HEATMAP":
      return heatmapData(report, data);
    case "TREEMAP":
      return treemapData(report, data);

    default:
      return data;
  }
}
