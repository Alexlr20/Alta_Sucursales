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

import { FormLabel } from "@mui/material";

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
        <Grid container spacing={1}>
          <Grid item xs={10} md={10}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <MDBox>
                <MDTypography variant="h5" fontWeight="medium">
                  Tipo de instrucción
                </MDTypography>

                <select color="info">
                  <option value="SeleccionarTipo">Seleccionar Tipo</option>
                  <option value="Instrucciones">Instrucciones</option>
                  <option value="Acciones">Acciones</option>
                  <option value="Informacion">Informacion</option>
                </select>
              </MDBox>
              <MDButton color="info">Sucursales</MDButton>
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
          <MDBox display="flex" justifyContent="flex-end" p={2}>
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
