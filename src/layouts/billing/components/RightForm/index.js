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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Billing page components

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function RightForm() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          sx={{ justifyContent: "center" }}
          p={0}
          m={2}
        >
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="h6" fontWeight="medium">
              Nombre
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Meta
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Detalle
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Hora inicial
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Hora final
            </MDTypography>
            <MDInput />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default RightForm;
