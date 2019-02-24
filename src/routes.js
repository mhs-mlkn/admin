import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import ReportList from "./views/Report/List";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";

export const login = {
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
  }
];
