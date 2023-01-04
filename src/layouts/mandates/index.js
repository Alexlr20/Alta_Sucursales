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
import {
  Button,
  Box,
  Card,
  Modal,
  ClickAwayListener,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import NameForm from "layouts/mandates/components/CreateMandate";
import SearchForm from "./components/SearchForm";

import { useState, useEffect } from "react";
import MandateTable from "./components/MandateTable";


const getLocationsByState = (stateId, callback) => {

  let response;
  axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php?id=${stateId}&byStateId=1`)
    .then(resp => {
      const { data } = resp;
      const { sucursal } = data;
      response = sucursal;
      callback(sucursal)
    })
    .catch(err => console.log(err))

  return response;
};

const getAreasByLocation = (locationId, callback) => {
  let response;
  axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${locationId}`)
    .then(resp => {
      const { data } = resp;
      const { organigrama } = data;
      response = organigrama;
      callback(organigrama)
    })
    .catch(err => console.log(err))

  return response;
};

const CheckBoxRow = ({ title, executeCall }) => {
  const [checked, setChecked] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  const [response, setResponse] = useState([]);
  
  const handleChange = () => {
    setChecked(prev => !prev);
  };

  const handleShowChildren = () => {
    if (executeCall && (showChildren === false)) {
      executeCall((res) => {
        setResponse(res);
      });
    }
    setShowChildren(prev => !prev);
  };

  return (
    <li>
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <MDTypography style={{cursor: "pointer"}} variant="h6" fontWeight="medium" onClick={handleShowChildren}>{title}</MDTypography>
      </Box>
      {
        showChildren &&
        <ul style={noBullet}>
          {response?.map(e => (
            <CheckBoxRow
              key={e.id}
              title={e.nombre || e.nombre_area}
              executeCall={e.nombre ? (callback) => getAreasByLocation(e.id, callback) : null}
            />
          ))}
        </ul>
      }
    </li>
  )
}

const noBullet = {
  listStyleType: 'none'
};


const modalStyle = {
  width: "50%",
  height: "50%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "1rem",
};

function Mandatos() {
  const [tasks, setTasks] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [widthOfTable, setWidthOfTable] = useState(0);

  // const [selectedStates, setSelectedStates] = useState([]);
  // const [selectedLocations, setSelectedLocations] = useState([]);
  // const [selectedAreas, setSelectedAreas] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((current) => !current);
  };

  const handleShowAdd = () => {
    if (!showFilters) {
      setShowAdd((current) => !current);
    }
  };

  const handleShowFilters = () => {
    setShowFilters((current) => !current);
  };

  
  // const [selectedCities, setSelectedCities] = useState([]);

  // const handleCityChange = (e) => {
  //   const index = selectedCities.indexOf(e.target.value);
  //   if (index === -1) {
  //     setSelectedCities([...selectedCities, e.target.value]);
  //   } else {
  //     setSelectedCities(selectedCities.filter((city) => city !== e.target.value));
  //   }
  // };

  const [allListedStates, setAllListedStates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php')
      .then((response) => {
        const { data } = response;
        const { estado } = data;
        setAllListedStates(estado);
      })
      .catch((error) => {
        console.log(error)
      });

  }, [refresh]);


  return (
    <DashboardLayout>
      <MDBox style={{ zIndex: 10 }} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
        <MDTypography variant="h6" color="white">Mandatos</MDTypography>
      </MDBox>

      <Card sx={{ marginTop: 3 }}>
        <NameForm handleRefresh={handleRefresh} handleShowAdd={handleShowAdd} />
      </Card>

      <Card sx={{ padding: 2, marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: "#4a8adf",
                  backgroundColor: "#FFF",
                  "&:hover": { borderColor: "#5f9dee" },
                }}
                onClick={handleShowFilters}
              >
                Filtrar
              </Button>
              Estado, sucursales, area Usuario en campo aparte
            </Grid>

            {showFilters && (
              <ClickAwayListener onClickAway={handleShowFilters}>
                <Box mb={2}>
                  <SearchForm widthOfTable={widthOfTable} handleShowFilter={handleShowFilters} />
                </Box>
              </ClickAwayListener>
            )}

            <Modal open={showAdd} onClose={handleShowAdd}>
              <Card sx={modalStyle}>
                <div style={{height: "100%", overflowY: "scroll"}}>

                  <ul style={noBullet}>
                    {
                      allListedStates.map(e => (
                      <CheckBoxRow
                        key={e.id}
                        title={e.nombre_edo}
                      />
                      ))
                    }

                    {allListedStates.map(e => (
                      <CheckBoxRow
                        key={e.id}
                        title={e.nombre_edo}
                        executeCall={(callback) => getLocationsByState(e.id, callback)}
                      // children={}
                      />
                    ))}
                  </ul>
                </div>
              </Card>
            </Modal>
            {tasks && <MandateTable setWidthOfTable={setWidthOfTable} tasks={tasks} />}
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  );
}

export default Mandatos;
