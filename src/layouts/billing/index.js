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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/TipoInstruccion";
import Invoices from "layouts/billing/components/NameForm";

import SearchForm from "layouts/billing/components/SearchForm";
import MDTypography from "components/MDTypography";
import Table from "./components/Table";

function Billing() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
          Alta de Sucursales
        </MDTypography>
      </MDBox>

      <MDBox mt={2}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Grid item xs={12}>
                <Invoices />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={8}>
              <PaymentMethod />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid item xs={12} md={15}>
            <SearchForm />
          </Grid>
        </MDBox>
        <MDBox>
          <Table />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
