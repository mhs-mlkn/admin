import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import ReportList from "./views/Report/List/List";
import ReportEdit from "./views/Report/Edit/Edit";
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
  path: "/admin/login",
  component: Login,
  invisible: true
};

export default [
  {
    title: "داشبورد",
    path: "/admin/dashboard",
    component: Dashboard,
    icon: DashboardIcon
  },
  {
    title: "لیست گزارشات",
    path: "/admin/reports",
    component: ReportList,
    icon: ListIcon
  },
  {
    title: "ایجاد گزارش",
    path: "/admin/reports/create",
    component: ReportEdit,
    icon: AddIcon,
    invisible: true
  },
  {
    title: "ویرایش گزارش",
    path: "/admin/reports/:id/edit",
    matchTest: path => RegExp("/admin/reports/\\d+/edit", "g").test(path),
    component: ReportEdit,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "مشاهده گزارش",
    path: "/admin/reports/:id/view",
    matchTest: path => RegExp("/admin/reports/\\d+/view", "g").test(path),
    component: ReportPreview,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "لیست هشدار ها",
    path: "/admin/reports/:id/alerts",
    matchTest: path => RegExp("/admin/reports/\\d+/alerts", "g").test(path),
    component: AlertList,
    icon: NotificationsIcon,
    invisible: true
  },
  {
    title: "ایجاد هشدار",
    path: "/admin/reports/:id/alerts/new",
    matchTest: path => RegExp("/admin/reports/\\d+/alerts/new", "g").test(path),
    component: AlertEdit,
    icon: NotificationsIcon,
    invisible: true
  },
  {
    title: "ویرایش هشدار",
    path: "/admin/reports/:id/alerts/:alertId/edit",
    matchTest: path =>
      RegExp("/admin/reports/\\d+/alerts/\\d+/edit", "g").test(path),
    component: AlertEdit,
    icon: NotificationsIcon,
    invisible: true
  }
];
