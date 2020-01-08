import get from "lodash/get";
import barData from "./bar.data";
import lineData from "./line.data";
import areaData from "./area.data";
import scatterData from "./scatter.data";
import pieData from "./pie.data";
import radarData from "./radar.data";
import gaugeData from "./gauge.data";
import treemapData from "./treemap.data";
import heatmapData from "./heatmap.data";

export default function chartData(report, data) {
  const reportType = get(report, "type", "BAR");

  const _data = {
    AREA: areaData,
    BAR: barData,
    GAUGE: gaugeData,
    HEATMAP: heatmapData,
    LINE: lineData,
    PIE: pieData,
    RADAR: radarData,
    SCATTER: scatterData,
    TREEMAP: treemapData,
    SCALAR: () => data,
    TABLE: () => data
  };

  return _data[reportType](report, data);
}
