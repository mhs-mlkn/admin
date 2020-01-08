import get from "lodash/get";
import merge from "lodash/merge";
import getAreaOpitons from "./area.options";
import getBarOpitons from "./bar.options";
import getGaugeOpitons from "./gauge.options";
import getHeatmapOptions from "./heatmap.options";
import getLineOpitons from "./line.options";
import getPieOpitons from "./pie.options";
import getRadarOpitons from "./radar.options";
import getScatterOpitons from "./scatter.options";
import getTreemapOpitons from "./treemap.options";
import primary from "@material-ui/core/colors/blue";

const fontFamily = "Yekan";

export { primary, fontFamily };

export function formatNumber(num) {
  return (num || "").toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatChartValue(value, opt) {
  return `${formatNumber(value / +opt.devideBy || value)} ${opt.label}`;
}

export default function chartOptions(report, savedOptions = {}) {
  const type = get(report, "type", "BAR");

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
          show: false,
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
    AREA: getAreaOpitons,
    BAR: getBarOpitons,
    GAUGE: getGaugeOpitons,
    HEATMAP: getHeatmapOptions,
    LINE: getLineOpitons,
    PIE: getPieOpitons,
    RADAR: getRadarOpitons,
    SCATTER: getScatterOpitons,
    TREEMAP: getTreemapOpitons,
    SCALAR: () => ({}),
    TABLE: () => ({})
  };

  return merge(
    {},
    options[type](report, savedOptions),
    toolbox,
    type === "PIE" ? {} : dataZoom
  );
}
