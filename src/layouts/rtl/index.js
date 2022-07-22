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

import { useEffect } from "react";

// @mui material components

// Material Dashboard 2 React components

// Material Dashboard 2 React example components

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

function RTL() {
  const [, dispatch] = useMaterialUIController();

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);
}

export default RTL;
