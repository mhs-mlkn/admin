import React, { useEffect, useState } from "react";
import merge from "lodash/merge";
import get from "lodash/get";
import omit from "lodash/omit";
import { JsonEditor as Editor } from "jsoneditor-react";
import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ThemeMenu from "./ThemeMenu";
import chartOptions from "./options";
import chartData from "./data";
import Echarts from "./Echarts";
import "./themes/dark";
import "./themes/vintage";
import "./themes/macarons";
import "./themes/shine";
import "./themes/roma";
import "./themes/infographic";
import Api from "../../api/report.api";

const styles = createStyles(() => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: 16,
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DefaultConfig = {
  refreshInterval: 0,
  theme: "default",
  icon: "info",
  options: {}
};

const DefaultConfigString = JSON.stringify(DefaultConfig);

function parseConfig(config = "") {
  try {
    return JSON.parse(config || DefaultConfigString);
  } catch (error) {
    return { ...DefaultConfig };
  }
}

let _options = undefined;

const Chart = props => {
  const { report, data, classes } = props;
  const [options, setOptions] = useState({});
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    _options = undefined;
    const config = parseConfig(report.config);
    report.config = config;
    setTheme(get(config, "theme", "default"));
    const options = get(config, "options", {});
    setOptions({
      ...merge(
        {},
        chartOptions(report, options),
        chartData(report, data || { cols: [], rows: [], totalCount: 0 }),
        options
      )
    });
  }, [data, report.type]);

  const toggleSettingsModal = () => {
    setOpen(!open);
  };

  const handleThemeChange = theme => {
    setTheme(theme);
    report.config.theme = theme;
  };

  const handleOptionsChange = value => {
    _options = value;
  };

  const handleApplyClick = () => {
    if (!!_options) {
      report.config.options = _options;
      setOptions({
        ...merge(
          {},
          chartOptions(report, _options),
          chartData(report, data || { cols: [], rows: [], totalCount: 0 }),
          _options
        )
      });
    }
    toggleSettingsModal();
  };

  const handleSaveClick = () => {
    Api.update({ ...report, config: JSON.stringify(report.config) });
  };

  return (
    <Grid container spacing={16}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Grid container spacing={16} alignItems="center">
          <Grid item>
            <ThemeMenu theme={theme} onChange={handleThemeChange} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleSettingsModal}
            >
              تنظیمات
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveClick}
            >
              ذخیره
            </Button>
          </Grid>
        </Grid>
        <Divider variant="middle" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ height: "80vh", backgroundColor: "#343a40" }}
      >
        <Echarts options={options} loading={false} chartTheme={theme} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Dialog
          fullScreen={false}
          fullWidth
          open={open}
          onClose={toggleSettingsModal}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar variant="dense" disableGutters>
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleSettingsModal}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                تنظیمات نمودار
              </Typography>
              <Button autoFocus color="inherit" onClick={handleApplyClick}>
                اعمال
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container>
            <div
              className="jsoneditor-wrapper"
              style={{ display: "flex", width: "100%" }}
            >
              <Editor
                value={omit(options, [
                  "dataset",
                  "radar",
                  "toolbox.feature.saveAsImage",
                  "legend.textStyle"
                ])}
                mode="form"
                onChange={handleOptionsChange}
                htmlElementProps={{
                  style: { direction: "ltr", height: "100%", flexGrow: 1 }
                }}
              />
            </div>
          </Grid>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Chart);
