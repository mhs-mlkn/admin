import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import ReportList from "./views/Report/List/List";
import ReportEdit from "./views/Report/Edit/Edit";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";

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
  }
];
