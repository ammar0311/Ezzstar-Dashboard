// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Writers List",
    key: "writers~list",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Writers~List",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Write Blog",
    key: "Write Blog",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Write~Blog",
    component: <Billing />,
  },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    // type: "collapse",
    // name: "Read Blog",
    // key: "read~blog",
    // icon: <Icon fontSize="small">person</Icon>,
    route: "/Read~Blog",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login Out</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    //   type: "collapse",
    //   name: "Sign Up",
    //   key: "sign-up",
    //   icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
