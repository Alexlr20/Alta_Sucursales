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

function Tables() {
  const { columns, rows } = authorsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card p={10}>
              <MDBox
                mx={2}
                mt={-3}
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

              <MDBox pt={2} pb={3} px={2}>
                <FormLabel className="block">Nombre de Sucursal</FormLabel>
                <MDInput type="text" label="Nombre" />
                <FormLabel className="block">Dirrecion</FormLabel>
                <MDInput type="text" label="Dirrecion" />
                <FormLabel className="block">Horario</FormLabel>
                <Grid>
                  <MDInput type="time" />
                  <MDInput type="time" />
                  <MDInput type="time" />
                  <MDInput type="time" />
                  <MDInput type="time" />
                  <MDInput type="time" />
                  <MDInput type="time" />
                </Grid>
              </MDBox>
              <MDBox pt={2} pb={3} px={2}>
                <FormLabel className="block">Horario</FormLabel>
                <MDInput type="time" />
                <MDInput type="time" />
                <MDInput type="time" />
                <MDInput type="time" />
                <MDInput type="time" />
                <MDInput type="time" />
                <MDInput type="time" />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Listado de Sucursales
                </MDTypography>
              </MDBox>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
                <MDBox>
                  <div className="mapouter">
                    <div className="gmap_canvas">
                      <iframe
                        title="map"
                        width="600"
                        height="500"
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
