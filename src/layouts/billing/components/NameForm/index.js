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
import * as React from "react";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Billing page components

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function NameForm() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={2}>
        <MDBox display="flex" flexDirection="column" m={2}>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="h6" fontWeight="medium">
              Tipo de instrucción
            </MDTypography>
            <select>
              <option disabled value="">
                <em>Seleccionar tipo</em>
              </option>
              <option value="Insctrucciones"> Insctrucciones</option>
              <option value="Acciones"> Acciones</option>
              <option value="Informacion"> Informacion</option>
            </select>
            <MDTypography variant="h6" fontWeight="medium">
              Nombre
            </MDTypography>
            <TextField />
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

export default NameForm;
