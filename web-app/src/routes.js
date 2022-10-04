import Index from "views/Index.js";
import Register from "views/Register.js";
import ForgotPassword from "views/forgotPassword.js";
import Login from "views/Login.js";
import Project from "views/Project.js";
import Administration from "views/Administration.js";
import EmailForgotPassword from "views/EmailForgotPassword";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "general",
    root: "/general",
    display: true,
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "admin",
    root: "/admin",
    display: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/EmailForgotPassword",
    name: "EmailForgotPassword",
    icon: "ni ni-circle-08 text-pink",
    component: EmailForgotPassword,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "auth",
    root: "/auth",
  },
  {
    path: "/projects/:id",
    name: "Project",
    component: Project,
    layout: "admin",
    root: "/admin",
    display: false,
  },
  {
    path: "/administration",
    name: "Administration",
    icon: "ni ni-collection text-red",
    component: Administration,
    layout: "admin",
    root: "/admin",
    display: true,
  },
];
export default routes;
