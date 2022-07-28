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

import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import MDBox from "components/MDBox";

function KPIs() {
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
          Graficas
        </MDTypography>
      </MDBox>
      <MDTypography color="icon">Mandatos</MDTypography>
      <MDBox mt={6} mb={6}>
        <VerticalBarChart
          description=""
          chart={{
            labels: ["Mandatos"],
            datasets: [
              {
                label: "Instrucciones",
                data: [11],
                color: "success",
              },
              {
                label: "Acciones",
                data: [4],
                color: "warning",
              },
              {
                label: "Informacion",
                data: [1],
                color: "error",
              },
            ],
          }}
        />
      </MDBox>

      <MDBox mt={0} display="flex">
        <MDBox width="50%">
          <MDTypography color="icon">Tipos de Mandatos</MDTypography>
          <VerticalBarChart
            description=""
            chart={{
              labels: ["Tipo de Mandatos"],
              datasets: [
                {
                  label: "Sin Aprobar",
                  data: [5],
                  color: "warning",
                },
                {
                  label: "Aprobados",
                  data: [10],
                  color: "success",
                },
                {
                  label: "Terminados",
                  data: [0],
                  color: "error",
                },
              ],
            }}
          />
        </MDBox>
        <MDBox width="50%">
          <MDTypography color="icon">Tipos de mandatos por fecha</MDTypography>
          <VerticalBarChart
            description=""
            chart={{
              labels: ["Sin Aprobar", "Aprobados", "Terminados"],
              datasets: [
                {
                  label: "a",
                  color: "success",
                  data: [4, 6, 0],
                },
                {
                  label: "b",
                  color: "warning",
                  data: [1, 3, 0],
                },
                {
                  label: "c",
                  color: "error",
                  data: [0, 1, 0],
                },
              ],
            }}
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default KPIs;
