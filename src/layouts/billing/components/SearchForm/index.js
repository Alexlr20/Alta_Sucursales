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
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
// import Transaction from "layouts/billing/components/Transaction";

function SearchForm() {
  return (
    <Card>
      <MDBox p={3}>
        <MDBox p={3} display="flex" flexDirection="column">
          <MDTypography variant="h5" fontWeight="medium">
            BUSQUEDA
          </MDTypography>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginTop: 3, marginBottom: 2 }}>
            Elige una Sucursal
          </MDTypography>
          <MDBox display="flex" justifyContent="space-evenly">
            <MDTypography variant="h6" fontWeight="medium" sx={{ marginTop: 1 }}>
              Fecha inicial
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium" sx={{ marginTop: 1 }}>
              Fecha final
            </MDTypography>
            <MDInput />
            <MDButton color="info">Buscar</MDButton>
            <MDButton color="info">Exportar CSV</MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SearchForm;
