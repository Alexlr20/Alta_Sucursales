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
import Grid from "@mui/material/Grid";

import { Checkbox, FormLabel, Card, TextField, FormControl } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
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
    <Card>
      <Grid item p={5} xs={12}>
        <Grid item xs={6.7}>
          <MDBox
            component="form"
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { sm: "1fr 1fr " },
              gap: 0,
            }}
          >
            <FormControl variant="standard">
              <MDTypography variant="h5" fontWeight="medium">
                Fecha inicial
              </MDTypography>
              <TextField type="date" sx={{ marginTop: 3, marginRight: 3 }} />
            </FormControl>
            <FormControl variant="standard">
              <MDTypography variant="h5" fontWeight="medium">
                Fecha final
              </MDTypography>
              <TextField type="date" sx={{ marginTop: 3 }} />
            </FormControl>
          </MDBox>
        </Grid>
        <MDBox mt={2}>
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
          <MDBox display="flex" justifyContent="flex-end">
            <MDButton color="info">Guardar</MDButton>
            <MDButton sx={{ marginLeft: 3, marginRight: 1 }} color="info">
              Cancelar
            </MDButton>
          </MDBox>
        </MDBox>
      </Grid>
    </Card>
  );
}

export default TipoInstruccion;
