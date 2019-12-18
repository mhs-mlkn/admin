import React, { useEffect } from "react";
import clx from "classnames";
import get from "lodash/get";
import defaultsDeep from "lodash/defaultsDeep";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ScalarIcon, defaultOptions, getDisplay } from ".";

const styles = {
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  title: {
    marginRight: 36,
    marginBottom: 16
  },
  value: {
    alignSelf: "center"
  },
  icon: {
    alignSelf: "center"
  },
  subtitle: {
    alignSelf: "center"
  }
};

const Scalar = props => {
  const {
    id,
    name,
    data,
    icon,
    colorTheme,
    options,
    classes,
    theme: muiTheme
  } = props;

  useEffect(() => {
    defaultsDeep(options, defaultOptions);
  }, [options]);

  const themes = {
    default: {
      root: { backgroundColor: "transparent" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    light: {
      root: { backgroundColor: "transparent" },
      title: { color: muiTheme.palette.secondary.main },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    dark: {
      root: { backgroundColor: muiTheme.palette.background.paper },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    vintage: {
      root: { backgroundColor: "#fef8ef" },
      title: { color: muiTheme.palette.secondary.main },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.primary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    macarons: {
      root: { backgroundColor: "rgba(50,50,50,0.5)" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.primary.main }
    },
    shine: {
      root: { backgroundColor: "#5b1d20" },
      title: { color: muiTheme.palette.primary.main },
      value: { color: muiTheme.palette.primary.main },
      icon: { color: muiTheme.palette.secondary.main },
      subtitle: { color: muiTheme.palette.secondary.main }
    },
    roma: {
      root: { backgroundColor: "#001852" },
      title: { color: muiTheme.palette.text.secondary },
      value: { color: muiTheme.palette.secondary.main },
      icon: { color: muiTheme.palette.error.main },
      subtitle: { color: muiTheme.palette.text.secondary }
    },
    infographic: {
      root: { backgroundColor: "#27727b" },
      title: { color: muiTheme.palette.text.secondary },
      value: { color: "inherit" },
      icon: { color: muiTheme.palette.error.main },
      subtitle: { color: muiTheme.palette.text.secondary }
    }
  };

  const getColor = path =>
    get(options, path, false) || get(themes[colorTheme], path);

  const backgroundColor = getColor("root.backgroundColor");
  const titleColor = getColor("title.color");
  const valueColor = getColor("value.color");
  const iconColor = getColor("icon.color");
  const subtitleColor = getColor("subtitle.color");

  const rootStyles = { ...themes[colorTheme].root, backgroundColor };

  const titleStyles = {
    ...themes[colorTheme].title,
    ...get(options, "title", {}),
    color: titleColor
  };

  const valueStyles = {
    ...themes[colorTheme].value,
    ...get(options, "value", {}),
    color: valueColor
  };

  const iconStyles = {
    ...themes[colorTheme].icon,
    ...get(options, "icon", {}),
    color: iconColor
  };

  const subtitleStyles = {
    ...themes[colorTheme].subtitle,
    ...get(options, "subtitle", {}),
    color: subtitleColor
  };

  return (
    <div className={classes.root} style={rootStyles} id={`report-${id}`}>
      <Typography
        variant="body1"
        component="span"
        color="primary"
        className={clx(classes.title)}
        style={{ display: getDisplay(options, "title"), ...titleStyles }}
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        component="span"
        color="primary"
        className={clx(classes.value)}
        style={{ display: getDisplay(options, "value"), ...valueStyles }}
      >
        {data.value}
      </Typography>
      <div
        className={clx(classes.icon)}
        style={{ display: getDisplay(options, "icon") }}
      >
        <ScalarIcon icon={icon} style={iconStyles} />
      </div>
      <Typography
        variant="subtitle1"
        component="span"
        color="primary"
        className={clx(classes.subtitle)}
        style={{
          display: getDisplay(options, "subtitle"),
          ...subtitleStyles
        }}
      >
        {data.title}
      </Typography>
    </div>
  );
};

const WithTheme = withTheme()(Scalar);
export default withStyles(styles)(WithTheme);
