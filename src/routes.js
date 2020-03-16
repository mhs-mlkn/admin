import React from "react";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import ReportList from "./views/Report/List/List";
import ReportEdit from "./views/Report/Edit/Edit";
import Composite from "./views/Report/Composite/Composite";
import ReportPreview from "./views/Report/List/Preview";
import CompositePreview from "./views/Report/Composite/Preview";
import AlertList from "./views/Alert/List/List";
import AlertEdit from "./views/Alert/Edit/Edit";
import { Resources, ResourceList, ResourceEdit } from "./views/Resource";

import HomeIcon from "@material-ui/icons/Home";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import ListIcon from "@material-ui/icons/List";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NotificationsIcon from "@material-ui/icons/Notifications";
import StorageIcon from "@material-ui/icons/Storage";

export const loginRoute = {
  title: "ورود",
  path: "/login",
  component: Login,
  invisible: true
};

export default [
  {
    title: "خانه",
    path: "/home",
    component: Home,
    icon: HomeIcon
  },
  {
    title: "گزارش های من",
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
    title: "ایجاد گزارش ترکیبی",
    path: "/reports/composite/create",
    component: Composite,
    icon: ListIcon,
    invisible: true
  },
  {
    title: "ویرایش گزارش ترکیبی",
    path: "/reports/composite/:id/edit",
    component: Composite,
    icon: ListIcon,
    invisible: true
  },
  {
    title: "مشاهده گزارش ترکیبی",
    path: "/reports/composite/:id/view",
    component: CompositePreview,
    icon: EditIcon,
    invisible: true
  },
  {
    title: "منابع داده",
    path: "/resources",
    component: Resources,
    matchTest: path => path.startsWith("/resources"),
    icon: StorageIcon,
    invisible: false
  },
  {
    title: "ایجاد منابع داده",
    path: "/resources/create/:type",
    component: ResourceEdit,
    icon: StorageIcon,
    invisible: true
  },
  {
    title: "گزارش ها",
    path: "/manage/reports",
    component: () => <ReportList userRole="SUPER_ADMIN" />,
    icon: ListIcon,
    role: "SUPER_ADMIN"
  },
  {
    title: "منابع داده",
    path: "/manage/resources",
    component: () => <ResourceList userRole="SUPER_ADMIN" />,
    icon: StorageIcon,
    role: "SUPER_ADMIN"
  },
  {
    title: "داشبورد ها",
    path: "/manage/dashboards",
    component: () => <ResourceList userRole="SUPER_ADMIN" />,
    icon: StorageIcon,
    role: "SUPER_ADMIN"
  }
];
