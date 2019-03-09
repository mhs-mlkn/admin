import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import ReportList from "./views/Report/List/List";
import ReportEdit from "./views/Report/Edit/Edit";
import ReportPreview from "./views/Report/List/Preview";

import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

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
    component: ReportEdit,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "ویرایش گزارش",
    path: "/admin/reports/:id/view",
    component: ReportPreview,
    icon: EditIcon,
    invisible: true
  }
];
