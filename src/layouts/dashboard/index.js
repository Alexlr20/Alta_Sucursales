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

// Dashboard components

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={20} px={20}>
        <img
          src="src\layouts\dashboard\Organigrama.jpg"
          alt="organigrama"
          width="500px"
          height="600px"
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
