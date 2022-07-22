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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Images
// import masterCardLogo from "assets/images/logos/mastercard.png";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function TipoInstruccion() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card id="delete-account">
      <MDBox p={5}>
        <Grid container spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={10} md={10}>
              <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
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
                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                  <Tooltip title="Edit Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small" />
                  </Tooltip>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={5}>
              <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <MDBox>
                  <MDTypography variant="h5" fontWeight="medium">
                    Fecha inicial
                  </MDTypography>
                  <MDInput type="date" color="info" />
                </MDBox>
                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                  <Tooltip title="Edit Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small" />
                  </Tooltip>
                </MDBox>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={5}>
              <MDBox
                borderRadius="lg"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
              >
                <MDBox>
                  <MDTypography variant="h5" fontWeight="medium">
                    Fecha final
                  </MDTypography>
                  <MDInput type="date" />
                </MDBox>
                <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                  <Tooltip title="Edit Card" placement="top">
                    <Icon sx={{ cursor: "pointer" }} fontSize="small" />
                  </Tooltip>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default TipoInstruccion;
