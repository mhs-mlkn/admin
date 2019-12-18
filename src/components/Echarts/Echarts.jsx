import React, { useEffect, useState } from "react";
import get from "lodash/get";
import ReactEcharts from "echarts-for-react";
import { withTheme } from "@material-ui/core/styles";

const Echarts = props => {
  const { options, loading, chartTheme } = props;
  const [updated, setUpdated] = useState(false);
  const {
    palette: { type, primary }
  } = props.theme;

  useEffect(() => {
    const type = get(options, "legend.type", "scroll");
    if (type === "plain") {
      setUpdated(true);
      setTimeout(() => setUpdated(false), 10);
    }
  }, [options]);

  if (updated) {
    return <div>Appliying ...</div>;
  }

  return (
    <ReactEcharts
      option={options}
      showLoading={loading}
      theme={chartTheme}
      loadingOption={{
        text: "درحال بارگذاری",
        textColor: props.theme.palette.text.primary,
        color: primary.main,
        maskColor:
          type === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0)"
      }}
      // onChartReady={onChartReady}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default withTheme()(Echarts);
