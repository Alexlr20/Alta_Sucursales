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

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const OrganigramaImg = require("./Organigrama.jpg");

// Dashboard components

function Organigrama() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
        <MDTypography variant="h6" color="white">
          Organigrama
        </MDTypography>
      </MDBox>
      <MDBox pt={5}>
        <img src={OrganigramaImg} alt="organigrama" width="100%" style={{ objectFit: "contain" }} />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Organigrama;
