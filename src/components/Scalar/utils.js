import get from "lodash/get";
import InfoIcon from "@material-ui/icons/Info";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MessageIcon from "@material-ui/icons/Message";
import EmailIcon from "@material-ui/icons/Email";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ScheduleIcon from "@material-ui/icons/Schedule";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EuroIcon from "@material-ui/icons/EuroSymbol";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";

export function getData(data) {
  const title = get(data, "cols.0.key", "");
  const value = get(data, "rows.0.cols.0", "");

  return {
    title,
    value
  };
}

export function getDisplay(options, field) {
  const isVisible = get(options, `${field}.show`, true);
  return isVisible ? "block" : "none";
}

export function getIcon(iconName) {
  switch (iconName) {
    case "info":
      return InfoIcon;
    case "error":
      return ErrorIcon;
    case "warning":
      return WarningIcon;
    case "checkbox":
      return CheckBoxIcon;
    case "notifications":
      return NotificationsIcon;
    case "favorite":
      return FavoriteIcon;
    case "message":
      return MessageIcon;
    case "email":
      return EmailIcon;
    case "accountbox":
      return AccountBoxIcon;
    case "schedule":
      return ScheduleIcon;
    case "attachmoney":
      return AttachMoneyIcon;
    case "euro":
      return EuroIcon;
    case "trendingup":
      return TrendingUpIcon;
    case "trendingdown":
      return TrendingDownIcon;

    default:
      return InfoIcon;
  }
}
