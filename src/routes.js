import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import ReportList from "./views/Report/List/List";
import ReportEdit from "./views/Report/Edit/Edit";
import ReportGrid from "./views/Report/Grid/Grid";
import ReportPreview from "./views/Report/List/Preview";
import AlertList from "./views/Alert/List/List";
import AlertEdit from "./views/Alert/Edit/Edit";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NotificationsIcon from "@material-ui/icons/Notifications";

export const loginRoute = {
  title: "ورود",
  path: "/login",
  component: Login,
  invisible: true
};

export default [
  {
    title: "داشبورد",
    path: "/dashboard",
    component: Dashboard,
    icon: DashboardIcon
  },
  {
    title: "لیست گزارشات",
    path: "/reports",
    component: ReportList,
    icon: ListIcon
  },
  {
    title: "ایجاد گزارش",
    path: "/reports/create",
    component: ReportEdit,
    icon: AddIcon,
    invisible: true
  },
  {
    title: "ویرایش گزارش",
    path: "/reports/:id/edit",
    matchTest: path => RegExp("/reports/\\d+/edit", "g").test(path),
    component: ReportEdit,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "مشاهده گزارش",
    path: "/reports/:id/view",
    matchTest: path => RegExp("/reports/\\d+/view", "g").test(path),
    component: ReportPreview,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "لیست هشدار ها",
    path: "/reports/:id/alerts",
    matchTest: path => RegExp("/reports/\\d+/alerts", "g").test(path),
    component: AlertList,
    icon: NotificationsIcon,
    invisible: true
  },
  {
    title: "ایجاد هشدار",
    path: "/reports/:id/alerts/new",
    matchTest: path => RegExp("/reports/\\d+/alerts/new", "g").test(path),
    component: AlertEdit,
    icon: NotificationsIcon,
    invisible: true
  },
  {
    title: "ویرایش هشدار",
    path: "/reports/:id/alerts/:alertId/edit",
    matchTest: path => RegExp("/reports/\\d+/alerts/\\d+/edit", "g").test(path),
    component: AlertEdit,
    icon: NotificationsIcon,
    invisible: true
  },
  {
    title: "datasources",
    path: "/datasources",
    component: ReportGrid,
    icon: ListIcon
  }
];
