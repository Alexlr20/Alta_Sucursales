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
import * as React from "react";
import { FormControl, Select, MenuItem, Grid, Card, TextField } from "@mui/material";
// Material Dashboard 2 React components

// Billing page components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function NameForm() {
  const [type, setType] = React.useState("");

  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <MDBox sx={{ flexGrow: 1 }}>
      <Card>
        <Grid container spacing={2} p={2} m={2}>
          <Grid item xs={3}>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr" },
                gap: 12.9,
              }}
            >
              <div />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Tipo de instrucción
                </MDTypography>
                <Select value={type} onChange={handleChange} multiline>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Instrucciones">Instrucciones</MenuItem>
                  <MenuItem value="Acciones">Acciones</MenuItem>
                  <MenuItem value="Informacion">Informacion</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={7.5} sx={{ marginLeft: 10 }}>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard" sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Nombre
                </MDTypography>
                <TextField fullWidth />
              </FormControl>
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Meta
                </MDTypography>
                <TextField fullWidth />
              </FormControl>
            </MDBox>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard" sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Hora inicial
                </MDTypography>
                <TextField fullWidth type="date" />
              </FormControl>
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Hora final
                </MDTypography>
                <TextField fullWidth type="date" />
              </FormControl>
            </MDBox>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Detalle
                </MDTypography>
                <TextField fullWidth multiline rows={4} />
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
    </MDBox>
  );
}

export default NameForm;
