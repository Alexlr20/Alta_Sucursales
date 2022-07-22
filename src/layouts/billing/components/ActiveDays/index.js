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
import { FormLabel } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// Billing page components

function ActiveDays() {
  return (
    <Card id="delete-account">
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Dias Activos
        </MDTypography>
        <MDBox>
          <MDInput type="checkbox" margin="dense" />
          <FormLabel> Todos</FormLabel>
        </MDBox>
      </MDBox>
      <MDBox>
        <MDBox p={0} m={3} display="flex" sx={{ justifyContent: "space-between" }}>
          <FormLabel>Domingo </FormLabel>
          <FormLabel>Lunes </FormLabel>
          <FormLabel>Martes </FormLabel>
          <FormLabel>Miercoles </FormLabel>
          <FormLabel>Jueves </FormLabel>
          <FormLabel>Viernes </FormLabel>
          <FormLabel>Sabado </FormLabel>
        </MDBox>
        <MDBox p={0} m={3} display="flex" sx={{ justifyContent: "space-between" }}>
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
          <MDButton variant="gradient" color="secondary" />
        </MDBox>
        <MDBox display="flex" justifyContent="flex-end" m={3} pt={2} pr={2}>
          <MDButton color="info">Guardar</MDButton>
          <MDButton color="info">Cancelar</MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ActiveDays;
