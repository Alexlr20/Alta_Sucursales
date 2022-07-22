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

import React from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components

import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React base styles

// Images

import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Divider } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import PaisesTable from "./PaisesTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { columns, rows } = PaisesTable();
  return (
    <MDBox position="relative" mb={5}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={0}>
          <AppBar position="static">
            <MDBox sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Paises" {...a11yProps(0)} />
                <Tab label="Estado" {...a11yProps(1)} />
                <Tab label="Cuidades" {...a11yProps(2)} />
                <Tab label="Zonas" {...a11yProps(3)} />
                <Tab label="Perfiles" {...a11yProps(4)} />
                <Tab label="Groups" {...a11yProps(5)} />
                <Tab label="Empleados" {...a11yProps(6)} />
                <Tab label="Usuarios" {...a11yProps(7)} />
                <Tab label="Comisiones" {...a11yProps(8)} />
                <Tab label="Monedas y TC" {...a11yProps(9)} />
                <Tab label="Servicios" {...a11yProps(10)} />
                <Tab label="Contactos" {...a11yProps(11)} />
                <Tab label="Usuarios App" {...a11yProps(12)} />
              </Tabs>
            </MDBox>
            <TabPanel value={value} index={0}>
              <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <MDTypography>Paises</MDTypography>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <MDTypography>Estado</MDTypography>
                  <Divider />
                  <MDTypography>Pais</MDTypography>
                  <select>
                    <option>Seleccionar Pais</option>
                  </select>
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
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <MDTypography>Cuidades</MDTypography>
                  <Divider />
                  <MDTypography>Pais</MDTypography>
                  <select>
                    <option>Seleccionar Pais</option>
                  </select>
                  <MDTypography>Nombre</MDTypography>
                  <select>
                    <option>Seleccionar Estado</option>
                  </select>
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
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <MDTypography>Zona</MDTypography>
                  <Divider />
                  <MDTypography>Aeropuerto</MDTypography>
                  <select>
                    <option>Seleccionar Aeropuerto</option>
                  </select>
                  <MDTypography>Nombre</MDTypography>
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
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Grid item xs={12} md={6} xl={15} sx={{ display: "flex" }}>
                <Divider orientation="horizontal" sx={{ mx: 0 }} />
                <MDBox pt={3}>
                  <MDTypography>Nombre</MDTypography>
                  <MDInput />
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
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
            </TabPanel>
            <TabPanel value={value} index={5}>
              Item five
            </TabPanel>
            <TabPanel value={value} index={6}>
              Item six
            </TabPanel>
            <TabPanel value={value} index={7}>
              Item seven
            </TabPanel>
            <TabPanel value={value} index={8}>
              Item eight
            </TabPanel>
            <TabPanel value={value} index={9}>
              Item nine
            </TabPanel>
            <TabPanel value={value} index={10}>
              Item ten
            </TabPanel>
            <TabPanel value={value} index={11}>
              Item eleven
            </TabPanel>
            <TabPanel value={value} index={12}>
              Item twelfe
            </TabPanel>
          </AppBar>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default BasicTabs;
