import { Grid, Divider } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
// import CatalogRepository from "repository/CatalogRepository";
import CountriesTable from "../CountriesTable";

export default function Countries() {
  // const { columns, rows } = new CatalogRepository().getCountries();
  const { columns, rows } = CountriesTable();
 
  return (
    <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
      <Divider orientation="horizontal" sx={{ mx: 0 }} />
      <MDBox pt={3}>
        <MDTypography>Pais</MDTypography>
        <Divider />
        <MDTypography>Nombre</MDTypography>
        <MDInput />
        <MDTypography>Codigo</MDTypography>
        <MDInput />

        <Divider />
        <MDButton color="info">Guardar</MDButton>
      </MDBox>
      <MDBox m={10}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Grid>
  );
}
