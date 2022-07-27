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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Billing page components
import NameForm from "layouts/billing/components/NameForm";

import SearchForm from "layouts/billing/components/SearchForm";
import MDTypography from "components/MDTypography";
import Table from "./components/Table";
import TipoInstruccion from "./components/TipoInstruccion";

function Mandatos() {
  return (
    <DashboardLayout>
      <MDBox
        style={{ zIndex: 10 }}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Mandatos
        </MDTypography>
      </MDBox>

      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NameForm />
          </Grid>
          <Grid item xs={12}>
            <TipoInstruccion />
          </Grid>
          <Grid item xs={12}>
            <SearchForm />
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Mandatos;
