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
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import sucursalTable from "layouts/billing/components/SearchForm/sucursalTable";

function SearchForm() {
  const { columns, rows } = sucursalTable();
  return (
    <Stack spacing={3}>
      <Card>
        <MDBox p={3}>
          <MDBox p={3} display="flex" flexDirection="column">
            <MDTypography variant="h5" fontWeight="medium">
              BUSQUEDA
            </MDTypography>
            <MDTypography variant="h6" fontWeight="medium" sx={{ marginTop: 3, marginBottom: 2 }}>
              Elige una Sucursal
            </MDTypography>
            <MDBox display="flex">
              <MDTypography variant="h6" fontWeight="medium" sx={{ marginTop: 1, marginRight: 2 }}>
                Fecha inicial
              </MDTypography>
              <MDInput />
              <MDTypography
                variant="h6"
                fontWeight="medium"
                sx={{ marginTop: 1, marginRight: 2, marginLeft: 2 }}
              >
                Fecha final
              </MDTypography>
              <MDInput />
            </MDBox>
            <MDBox display="flex" justifyContent="flex-end">
              <MDButton color="info">Buscar</MDButton>
              <MDButton sx={{ marginLeft: 3 }} color="info">
                Exportar CSV
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      <Card>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </Card>
    </Stack>
  );
}

export default SearchForm;
