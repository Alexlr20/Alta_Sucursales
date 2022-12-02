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
  // Typography,
  // FormGroup,
  // FormControl,
  // FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DataTable from "layouts/locations/components/DataTable";

// Billing page components
import NameForm from "layouts/mandates/components/CreateMandate";
import SearchForm from "layouts/mandates/components/SearchForm";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import MandateTable from "./components/MandateTable";

function Mandatos() {
  // eslint-disable-next-line no-unused-vars
  const [isPending, setIsPending] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((current) => !current);
  };

  // const filterRef = useRef();
  useEffect(() => {
    // setTableReady(true);
    const abortCont = new AbortController();

    fetch("http://localhost:8000/mandates", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((t) => {
        setTasks(t);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // eslint-disable-next-line no-console
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [refresh]);

  const handleShowAdd = () => {
    if (!showFilters) {
      setShowAdd((current) => !current);
    }
  };

  const handleShowFilters = () => {
    setShowFilters((current) => !current);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "1rem",
  };

  const [widthOfTable, setWidthOfTable] = useState(0);

  const estados = [
    {
      estado: "Nuevo Leon",
    },
    {
      estado: "Sinaloa",
    },
  ];

  const municipios = [
    {
      municipio: "Municipio 1",
    },
    {
      municipio: "Municipio 2",
    },
  ];

  const sucursales = [{ sucursal: "Sucursal 1" }, { sucursal: "Sucursal 2" }];

  const areas = [{ area: "Area 1" }, { area: "Area 2" }];

  const usuarios = [{ usuario: "Usuario 1" }, { usuario: "Usuario 2" }];

  const [selectedCities, setSelectedCities] = useState([]);
  const handleCityChange = (e) => {
    const index = selectedCities.indexOf(e.target.value);
    if (index === -1) {
      setSelectedCities([...selectedCities, e.target.value]);
    } else {
      setSelectedCities(selectedCities.filter((city) => city !== e.target.value));
    }
  };

  const [selectedStates, setSelectedStates] = useState([]);
  const handleStateChange = (e) => {
    const index = selectedStates.indexOf(e.target.value);
    if (index === -1) {
      setSelectedStates([...selectedStates, e.target.value]);
    } else {
      setSelectedStates(selectedStates.filter((state) => state !== e.target.value));
    }
  };

  const [selectedLocations, setSelectedLocations] = useState([]);
  const handleLocationChange = (e) => {
    const index = selectedLocations.indexOf(e.target.value);
    if (index === -1) {
      setSelectedLocations([...selectedLocations, e.target.value]);
    } else {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== e.target.value));
    }
  };

  const [selectedAreas, setSelectedAreas] = useState([]);
  const handleAreaChange = (e) => {
    const index = selectedAreas.indexOf(e.target.value);
    if (index === -1) {
      setSelectedAreas([...selectedAreas, e.target.value]);
    } else {
      setSelectedAreas(selectedAreas.filter((area) => area !== e.target.value));
    }
  };

  const [selectedUsers, setSelectedUsers] = useState([]);
  const handleUserChange = (e) => {
    const index = selectedUsers.indexOf(e.target.value);
    if (index === -1) {
      setSelectedUsers([...selectedUsers, e.target.value]);
    } else {
      setSelectedUsers(selectedUsers.filter((user) => user !== e.target.value));
    }
  };

  // estados.map(e => console.log(e.estado));

  return (
    <DashboardLayout>
      <MDBox
        style={{ zIndex: 10 }}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Mandatos
        </MDTypography>
      </MDBox>

      <Card sx={{ marginTop: 3 }}>
        <NameForm handleRefresh={handleRefresh} handleShowAdd={handleShowAdd} />
      </Card>

      <Card sx={{ padding: 2, marginTop: 3 }}>
        {/* <MDBox mt={4}> */}
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
              {/* <Button variant="contained" sx={{ color: "#FFF" }} onClick={handleShowAdd}>
                Agregar Mandato
              </Button> */}
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
                <Box>
                  <ul>
                    {estados.map((edo) => (
                      <li>
                        <Checkbox
                          value={edo.estado}
                          name={edo.estado}
                          checked={selectedStates.includes(edo.estado)}
                          onChange={handleStateChange}
                        />
                        <label htmlFor={edo.estado}>{edo.estado}</label>
                        <ul>
                          {municipios.map((mun) => (
                            <li>
                              <Checkbox
                                value={mun.municipio}
                                checked={selectedCities.includes(mun.municipio)}
                                onChange={handleCityChange}
                              />
                              <label htmlFor={mun.municipio}>{mun.municipio}</label>
                              <ul>
                                {sucursales.map((suc) => (
                                  <li>
                                    <Checkbox
                                      value={suc.sucursal}
                                      checked={selectedLocations.includes(suc.sucursal)}
                                      onChange={handleLocationChange}
                                    />
                                    <label htmlFor={suc.sucursal}>{suc.sucursal}</label>
                                    <ul>
                                      x
                                      {areas.map((area) => (
                                        <li>
                                          <Checkbox
                                            value={area.area}
                                            checked={selectedAreas.includes(area.area)}
                                            onChange={handleAreaChange}
                                          />
                                          <label htmlFor={area.area}>{area.area}</label>
                                          <ul>
                                            {usuarios.map((usr) => (
                                              <li>
                                                <Checkbox
                                                  value={usr.usuario}
                                                  checked={selectedUsers.includes(usr.usuario)}
                                                  onChange={handleUserChange}
                                                />
                                                <label htmlFor={usr.usuario}>{usr.usuario}</label>
                                              </li>
                                            ))}
                                          </ul>
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Card>
            </Modal>

            {error && <div>{error}</div>}
            {isPending && <div>Cargando...</div>}

            {tasks && <MandateTable setWidthOfTable={setWidthOfTable} tasks={tasks} />}

            {/* {tasks && <DataTable data={tasks} />} */}
          </Grid>
        </Grid>
        {/* </MDBox> */}
      </Card>
    </DashboardLayout>
  );
}

export default Mandatos;
