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
import Grid from "@mui/material/Grid";

import { Checkbox, FormLabel } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Images
// import masterCardLogo from "assets/images/logos/mastercard.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function TipoInstruccion() {
  // eslint-disable-next-line no-unused-vars
  const [controller] = useMaterialUIController();

  return (
    <Card id="delete-account">
      <MDBox p={5}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={11}>
            <MDBox display="flex" justifyContent="space-between">
              <MDBox sx={{ marginLeft: 3 }}>
                <MDTypography variant="h5" fontWeight="medium">
                  Fecha inicial
                </MDTypography>
                <MDInput type="date" color="info" />
              </MDBox>
              <MDBox sx={{ marginLeft: 3 }}>
                <MDTypography variant="h5" fontWeight="medium">
                  Fecha final
                </MDTypography>
                <MDInput type="date" />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDBox p={0} mt={2} display="flex" sx={{ justifyContent: "start" }}>
          <FormLabel sx={{ marginLeft: 2.5 }}>D</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>L</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>M</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>M</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>J</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>V</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>S</FormLabel>
          <FormLabel sx={{ marginLeft: 5 }}>Todos</FormLabel>
        </MDBox>
        <MDBox>
          <Checkbox sx={{ marginLeft: 1 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 2 }} defaultChecked />
          <Checkbox sx={{ marginLeft: 4.5 }} defaultChecked />
          <MDBox display="flex" justifyContent="flex-end" p={0}>
            <MDButton color="info">Guardar</MDButton>
            <MDButton sx={{ marginLeft: 3 }} color="info">
              Cancelar
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TipoInstruccion;
