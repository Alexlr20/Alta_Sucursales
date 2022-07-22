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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import MDBox from "components/MDBox";

function Notifications() {
  // const [successSB, setSuccessSB] = useState(false);
  // const [infoSB, setInfoSB] = useState(false);
  // const [warningSB, setWarningSB] = useState(false);
  // const [errorSB, setErrorSB] = useState(false);

  // const openSuccessSB = () => setSuccessSB(true);
  // const closeSuccessSB = () => setSuccessSB(false);
  // const openInfoSB = () => setInfoSB(true);
  // const closeInfoSB = () => setInfoSB(false);
  // const openWarningSB = () => setWarningSB(true);
  // const closeWarningSB = () => setWarningSB(false);
  // const openErrorSB = () => setErrorSB(true);
  // const closeErrorSB = () => setErrorSB(false);

  // const alertContent = (name) => (
  //   <MDTypography variant="body2" color="white">
  //     A simple {name} alert with{" "}
  //     <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
  //       an example link
  //     </MDTypography>
  //     . Give it a click if you like.
  //   </MDTypography>
  // );

  // const renderSuccessSB = (
  //   <MDSnackbar
  //     color="success"
  //     icon="check"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={successSB}
  //     onClose={closeSuccessSB}
  //     close={closeSuccessSB}
  //     bgWhite
  //   />
  // );

  // const renderInfoSB = (
  //   <MDSnackbar
  //     icon="notifications"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={infoSB}
  //     onClose={closeInfoSB}
  //     close={closeInfoSB}
  //   />
  // );

  // const renderWarningSB = (
  //   <MDSnackbar
  //     color="warning"
  //     icon="star"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={warningSB}
  //     onClose={closeWarningSB}
  //     close={closeWarningSB}
  //     bgWhite
  //   />
  // );

  // const renderErrorSB = (
  //   <MDSnackbar
  //     color="error"
  //     icon="warning"
  //     title="Material Dashboard"
  //     content="Hello, world! This is a notification message"
  //     dateTime="11 mins ago"
  //     open={errorSB}
  //     onClose={closeErrorSB}
  //     close={closeErrorSB}
  //     bgWhite
  //   />
  // );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        style={{ zIndex: 10 }}
        mx={1}
        mt={2}
        mb={4}
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
            labels: ["Instrucciones", "Acciones", "Informacion"],
            datasets: [
              {
                label: "Sales by age",
                color: "info",
                data: [11, 4, 1],
              },
            ],
          }}
        />
      </MDBox>
      <MDTypography color="icon">Tipos de Mandatos</MDTypography>
      <MDBox mt={6}>
        <VerticalBarChart
          description=""
          chart={{
            labels: ["Sin Aprobar", "Aprobados", "Terminados"],
            datasets: [
              {
                label: "Sales by age",
                color: "info",
                data: [5, 10, 1],
              },
            ],
          }}
        />
      </MDBox>
      <MDTypography color="icon">Tipos de Mandatos</MDTypography>
      <MDBox mt={6}>
        <VerticalBarChart
          description=""
          chart={{
            labels: ["Sin Aprobar", "Aprobados", "Terminados"],
            datasets: [
              {
                label: "a",
                color: "info",
                data: [4, 6, 0],
              },
              {
                label: "b",
                color: "info",
                data: [1, 3, 0],
              },
              {
                label: "c",
                color: "info",
                data: [0, 1, 0],
              },
            ],
          }}
        />
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
