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
import { Card } from "@mui/material";
import { useState } from "react";

function KPIs() {
  const [aprobados] = useState(11);
  const [sinAprobar] = useState(11);
  const [terminados] = useState(11);

  const [accion] = useState(11);
  const [informativos] = useState(11);
  const [metas] = useState(11);

  return (
    <DashboardLayout>
      <MDBox
        style={{ zIndex: 10 }}
        py={3}
        px={2}
        mb={3}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Graficas
        </MDTypography>
      </MDBox>

      <Card sx={{ padding: "2rem" }}>
        <MDTypography color="icon">Mandatos</MDTypography>
        <MDBox mt={6} mb={6}>
          <VerticalBarChart
            description=""
            chart={{
              labels: ["Mandatos"],
              datasets: [
                {
                  label: "Aprobados",
                  data: [aprobados],
                  color: "success",
                },
                {
                  label: "Sin Aprobar",
                  data: [sinAprobar],
                  color: "warning",
                },
                {
                  label: "Terminados",
                  data: [terminados],
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
                    label: "Acción",
                    data: [accion],
                    color: "warning",
                  },
                  {
                    label: "Informativos",
                    data: [informativos],
                    color: "success",
                  },
                  {
                    label: "Metas",
                    data: [metas],
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
      </Card>
    </DashboardLayout>
  );
}

export default KPIs;
