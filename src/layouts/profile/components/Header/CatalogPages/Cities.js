import { useState } from "react";
import { Grid, Divider, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
// import CatalogRepository from "repository/CatalogRepository";
import CitiesTable from "../CitiesTable";

export default function Cities() {
  // const { columns, rows } = new CatalogRepository().getCountries();
  const { columns, rows } = CitiesTable();
  const [age, setAge] = useState("");
  const [estado, setEstado] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    setEstado(event.target.value);
  };
  return (
    <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
      <Divider orientation="horizontal" sx={{ mx: 0 }} />
      <MDBox pt={3}>
        <MDTypography>Cuidad</MDTypography>
        <Divider />
        <MDTypography>Pais</MDTypography>
        <FormControl variant="filled" size="medium" sx={{ mb: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-standard-label" />
          <Select id="demo-simple-select-standard" value={age} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <MDTypography>Estado</MDTypography>
        <FormControl variant="filled" size="medium" sx={{ mb: 1 }} fullWidth>
          <InputLabel id="demo-simple-select-standard-label" />
          <Select id="demo-simple-select-standard" value={estado} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Nuevo León">Nuevo León</MenuItem>
            <MenuItem value=" Coahuila"> Coahuila</MenuItem>
            <MenuItem value="México">México</MenuItem>
          </Select>
        </FormControl>
        <MDTypography>Nombre de cuidad</MDTypography>
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
