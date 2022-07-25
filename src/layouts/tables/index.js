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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import MDInput from "components/MDInput";
import "./styles.css";
import { Divider, FormLabel } from "@mui/material";
import MDButton from "components/MDButton";

function Tables() {
  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card p={10}>
        <MDBox
          py={3}
          px={2}
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
        >
          <MDTypography variant="h6" color="white">
            Alta de Sucursales
          </MDTypography>
        </MDBox>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <MDBox pt={2} px={3} sx={{ width: "50%" }}>
            <MDBox>
              <FormLabel className="block">Nombre de Sucursal</FormLabel>
              <MDInput type="text" label="Nombre" fullWidth />
              <FormLabel className="block">Dirrecion</FormLabel>
              <MDInput type="text" label="Dirrecion" fullWidth />
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
            <MDBox pt={2} px={2}>
              <MDButton mx={2} color="info">
                Agregar Sucursales
              </MDButton>
              <MDButton sx={{ marginLeft: 1 }} color="info">
                Cancelar
              </MDButton>
              <Divider />
              <MDTypography>Listado de Sucursales</MDTypography>
              <MDBox pt={2} px={2}>
                <MDInput type="text" label="Listado de Sucursales" fullWidth />
              </MDBox>
            </MDBox>
            <MDBox pt={3}>
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

export default Tables;
