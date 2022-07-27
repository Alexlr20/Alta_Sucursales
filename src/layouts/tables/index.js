/* eslint-disable jsx-a11y/label-has-associated-control */
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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import directionTable from "layouts/tables/data/directionsTable";
import MDInput from "components/MDInput";
import { Divider, FormLabel, Icon, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MDButton from "components/MDButton";

function Sucursales() {
  const { columns, rows } = directionTable();

  return (
    <DashboardLayout>
      <MDBox
        py={3}
        px={2}
        mb={4}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Alta de Sucursales
        </MDTypography>
      </MDBox>
      <Card p={10}>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <MDBox pt={3} px={3} sx={{ width: "50%" }}>
            <MDTypography>Nombre de Sucursal</MDTypography>
            <MDBox pb={1} pt={1}>
              <TextField fullWidth />
            </MDBox>
            <MDTypography>Direccion</MDTypography>
            <MDBox pb={1} pt={1}>
              <TextField fullWidth />
            </MDBox>
            <MDBox sx={{ display: "none" }}>
              <FormLabel className="block">Horario de entrada</FormLabel>
              <MDBox sx={{ display: "flex", justifyContent: "space-around" }}>
                <MDButton disabled>L</MDButton>
                <MDButton disabled>M</MDButton>
                <MDButton disabled>M</MDButton>
                <MDButton disabled>J</MDButton>
                <MDButton disabled>V</MDButton>
                <MDButton disabled>S</MDButton>
                <MDButton disabled>D</MDButton>
              </MDBox>
              <MDBox>
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
              </MDBox>
              <MDBox>
                <FormLabel className="block">Horario de salida</FormLabel>
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
                <MDInput type="time" sx={{ width: "14.2857142857%" }} />
              </MDBox>
            </MDBox>
            <MDBox pt={2}>
              <MDButton mx={2} color="info">
                Agregar Sucursales
              </MDButton>
              <MDButton sx={{ marginLeft: 1 }} color="info">
                Cancelar
              </MDButton>
              <Divider />
              <MDTypography>Buscar Sucursales</MDTypography>
              <MDBox pt={2}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>search</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </MDBox>
            </MDBox>
            <MDBox pt={2}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </MDBox>
          <MDBox pt={2} pb={3}>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="map"
                  width="200%"
                  height="750px"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                />
              </div>
            </div>
          </MDBox>
        </Grid>
        <Divider />
      </Card>
      <Footer />
    </DashboardLayout>
  );
}

export default Sucursales;
