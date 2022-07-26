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
import { TextField, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Billing page components

import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function NameForm() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox p={2}>
        <MDBox display="flex" flexDirection="column" m={2}>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="h6" fontWeight="medium">
              Tipo de instrucción
            </MDTypography>
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
            <MDTypography variant="h6" fontWeight="medium">
              Nombre
            </MDTypography>
            <TextField />
            <MDTypography variant="h6" fontWeight="medium">
              Meta
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Detalle
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Hora inicial
            </MDTypography>
            <MDInput />
            <MDTypography variant="h6" fontWeight="medium">
              Hora final
            </MDTypography>
            <MDInput />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default NameForm;
