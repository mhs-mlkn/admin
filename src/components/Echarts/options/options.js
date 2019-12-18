import get from "lodash/get";
import merge from "lodash/merge";
import getBarOpitons from "./bar.options";
import getPieOpitons from "./pie.options";
import getGaugeOpitons from "./gauge.options";
import getTreemapOpitons from "./treemap.options";
import getHeatmapOptions from "./heatmap.options";

export default function chartOptions(report) {
  const type = get(report, "type", "BAR");
  const barOptions = getBarOpitons(report);
  const pieOptions = getPieOpitons(report);
  const gaugeOptions = getGaugeOpitons(report);
  const treemapOptions = getTreemapOpitons(report);
  const heatmapOptions = getHeatmapOptions(report);

  const toolbox = {
    toolbox: {
      show: true,
      orient: "vertical",
      itemSize: 15,
      itemGap: 10,
      showTitle: true,
      left: -4,
      top: 25,
      feature: {
        saveAsImage: {
          show: true,
          title: "ذخیره",
          pixelRatio: 1
        }
      }
    }
  };

  const dataZoom = {
    toolbox: {
      feature: {
        dataZoom: {
          show: true,
          title: {
            zoom: "بزرگنمایی",
            back: "بازنشانی"
          }
        }
      }
    }
  };

  const options = {
    BAR: barOptions,
    AREA: barOptions,
    LINE: barOptions,
    PIE: pieOptions,
    GAUGE: gaugeOptions,
    TREEMAP: treemapOptions,
    HEATMAP: heatmapOptions,
    SCATTER: barOptions,
    RADAR: barOptions,
    SCALAR: barOptions,
    TABLE: barOptions
  };

  return merge({}, options[type], toolbox, type === "PIE" ? {} : dataZoom);
}
