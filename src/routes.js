/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Organigrama from "layouts/orgchart";
import Sucursales from "layouts/locations";
import Mandatos from "layouts/mandates";
// import RTL from "layouts/rtl";
import KPIs from "layouts/KPIs";
// import Catalogos from "layouts/profile";

// @mui icons
import Personal from "layouts/personal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartColumn,
  faLayerGroup,
  faList,
  faMapLocationDot,
  faSitemap,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// import { Catalogues } from "layouts/catalogues";
// import { Mandatos2 } from "layouts/mandates_copy";
import { Catalogues } from "layouts/catalogues";

const routes = [
  {
    type: "collapse",
    name: "Sucursales",
    key: "Sucursales",
    // icon: <Icon fontSize="small">table_view</Icon>,
    icon: <FontAwesomeIcon icon={faMapLocationDot} />,
    route: "/sucursales",
    component: <Sucursales />,
  },
  {
    type: "collapse",
    name: "Organigrama",
    key: "Organigrama",
    // icon: <Icon fontSize="small">dashboard</Icon>,
    icon: <FontAwesomeIcon icon={faSitemap} />,
    route: "/organigrama",
    component: <Organigrama />,
  },
  {
    type: "collapse",
    name: "Personal",
    key: "personal",
    // icon: <Icon fontSize="small">login</Icon>,
    icon: <FontAwesomeIcon icon={faUsers} />,
    route: "/personal",
    component: <Personal />,
  },
  {
    type: "collapse",
    name: "Mandatos",
    key: "Mandatos",
    icon: <FontAwesomeIcon icon={faList} />,
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/mandatos",
    component: <Mandatos />,
  },
  // {
  //   type: "collapse",
  //   name: "Chat",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/https://ddsoftware.tech/chatplugin/fullchat/index.html",
  //   component: <RTL />,
  // },
  {
    type: "collapse",
    name: "KPIs",
    key: "KPIs",
    icon: <FontAwesomeIcon icon={faChartColumn} />,
    // icon: <Icon fontSize="small">notifications</Icon>,
    route: "/kpis",
    component: <KPIs />,
  },
  // {
  //   type: "collapse",
  //   name: "Catalogos",
  //   key: "Catalogos",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/catalogos",
  //   component: <Catalogos />,
  // },
  {
    type: "collapse",
    name: "Catálogos",
    key: "catalogues",
    icon: <FontAwesomeIcon icon={faLayerGroup} />,
    route: "/catalogos",
    component: <Catalogues />,
    // collapse: [
    //   {
    //     type: "collapse",
    //     name: "Estados",
    //     key: "states",
    //     icon: <FontAwesomeIcon icon={faLayerGroup} />,
    //     route: "estados",
    //     component: <State />,
    //   }
    // ]
  },
  // {
  //   type: "collapse",
  //   name: "Estados",
  //   key: "states",
  //   icon: <FontAwesomeIcon icon={faLayerGroup} />,
  //   route: "/catalogos/estados",
  //   component: <State />,
  // }
];

export default routes;
