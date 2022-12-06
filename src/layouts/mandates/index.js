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





const CheckBoxRow = ({ title }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(prev => !prev);
  };
  return (
    <li>
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center"}}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <MDTypography variant="h6" fontWeight="medium">{title}</MDTypography>
      </Box>
    </li>
  )
}



// const test = {
//   estados: [
//   {
//     selected: false,
//     id: 1,
//     nombre: 'Estado 01',
//     sucursal: [
//       {
//         selected: false,
//         id: 1,
//         nombre: 'Sucursal 01',
//         areas: [
//           {
//             selected: false,
//             id: 1,
//             nombre: 'Area 01'
//           },
//           {
//             selected: false,
//             id: 2,
//             nombre: 'Area 02'
//           },
//         ]
//       },
//     ]
//   },
//   {
//     selected: false,
//     id: 2,
//     nombre: 'Estado 02',
//     sucursal: [
//       {
//         selected: false,
//         id: 1,
//         nombre: 'Sucursal 01',
//         areas: [
//           {
//             selected: false,
//             id: 1,
//             nombre: 'Area 01'
//           },
//           {
//             selected: false,
//             id: 2,
//             nombre: 'Area 02'
//           },
//         ]
//       },
//       {
//         selected: false,
//         id: 1,
//         nombre: 'Sucursal 02',
//         areas: [
//           {
//             selected: false,
//             id: 1,
//             nombre: 'Area 01'
//           }
//         ]
//       }
//     ]
//   },
// ]
// };











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


  const [selectedCities, setSelectedCities] = useState([]);
  const handleCityChange = (e) => {
    const index = selectedCities.indexOf(e.target.value);
    if (index === -1) {
      setSelectedCities([...selectedCities, e.target.value]);
    } else {
      setSelectedCities(selectedCities.filter((city) => city !== e.target.value));
    }
  };


  // estados.map(e => console.log(e.estado));

  const noBullet = {
    listStyleType: 'none'
  };



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
                <ul style={noBullet}>
                  <CheckBoxRow title='ola'/>

                  <ul style={noBullet}>
                    <CheckBoxRow title='ola 1.1' />

                    <ul style={noBullet}>
                      <CheckBoxRow title='Ola 1.1.1' />
                    </ul>

                  </ul>

                  <CheckBoxRow title='ola2' />
                </ul>
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
