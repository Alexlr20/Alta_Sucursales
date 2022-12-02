/* eslint-disable no-unused-vars */
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

// import SearchContextProvider from "context/SearchContext";
// import SearchContextProvider from "context/SearchContext";
import { useEffect, useState } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
// import DataTable from "examples/Tables/DataTable";

// Data
// import MDInput from "components/MDInput";
import { Modal } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import MDButton from "components/MDButton";
// import { useState } from "react";
import LocationForm from "./components/CreateLocation";
import SearchForm from "./components/SearchForm";
import Locations from "./components/Locations";
// import Geocoding from "./components/Geocoding";

function Sucursales() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  
  useEffect(() => {
    // axios.get('http://localhost:8000/states/')
    axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php')
        .then((response) => {
            const { data } = response;
            const {sucursal} = data;
            console.log('DATA FROM LOCALITIES -> ',sucursal);

            const formatedData = sucursal?.map(e => ({
              id: e.id,
              nombre_sucursal: e.nombre,
              direccion: `${e.tipo === 'Avenida'? 'Av. ':''} ${e.nombre_vialidad} ${e.numero_ext}, ${e.numero_int === '' || e.numero_int === 'NULL' ? '' : `${e.numero_int},`} ${e.nombre_colonia}, ${e.codigo_postal}, ${e.nombre_ciud}, ${e.nombre_edo}`
            }));

            console.log('FormatedData -> ', formatedData);

            setLocations(formatedData);
            setIsPending(false);
            setError(null);
        })
        .catch((err) => {
          console.log(err)
          setIsPending(false);
          setError(err.message);
        });

        

}, []);


// useEffect(() => {
//   // setTableReady(true);
//   const abortCont = new AbortController();

//   fetch("http://localhost:8000/locations", { signal: abortCont.signal })
//     .then((res) => {
//       if (!res.ok) {
//         // error coming back from server
//         throw Error("could not fetch the data for that resource");
//       }
//       return res.json();
//     })
//     .then((t) => {
//       console.log("LOCATIONSINFETCH", t);
//       setLocations(t);
//       setIsPending(false);
//       setError(null);
//     })
//     .catch((err) => {
//       if (err.name === "AbortError") {
//         // eslint-disable-next-line no-console
//         console.log("fetch aborted");
//       } else {
//         // auto catches network / connection error
//         setIsPending(false);
//         setError(err.message);
//       }
//     });

//   return () => abortCont.abort();
// }, []);




  const handleShowAdd = () => {
    setShowAdd((current) => !current);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = ({ target }) => {
    setSearchInput(target.value);
    // eslint-disable-next-line no-console
    console.log(searchInput);
  };

  return (
    <DashboardLayout>
      <MDBox
        py={3}
        px={2}
        mb={4}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
      >
        <MDTypography variant="h6" color="white">
          Alta de Sucursales
        </MDTypography>
      </MDBox>

      {/* <SearchContextProvider> */}
      <Card sx={{ borderRadius: "0.5rem", height: "77vh" }}>
        <div style={{ display: "flex" }}>
          <MDBox pt={3} px={3} style={{ width: "50%", padding: "1rem" }}>



            <Modal open={showAdd} onClose={handleShowAdd}>
              <Card sx={modalStyle} style={{ width: "50%" }}>
                <LocationForm handleShowAdd={handleShowAdd} />
              </Card>
            </Modal>

            

            <SearchForm
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
              showAdd={showAdd}
              handleShowAdd={handleShowAdd}
              setShowAdd={setShowAdd}
            />

            <Grid item>
              {error && <div>{error}</div>}
              {isPending && <div>Cargando...</div>}
              {locations && (
                <Locations
                  locations={locations}
                  searchInput={searchInput}
                  handleShowAdd={handleShowAdd}
                />
              )}
            </Grid>
          </MDBox>

          <div className="mapouter" style={{ width: "50%" }}>
            <div className="gmap_canvas">
              {/* <iframe
                title="map"
                width="100%"
                height="750px"
                id="gmap_canvas"
                src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
              /> */}

              <iframe
                src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                title="map"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "-webkit-fill-available",
                  border: "none",
                  overflow: "hidden",
                  margin: "0",
                  borderRadius: "0 0.5rem 0.5rem 0",
                }}
              />
            </div>
          </div>
        </div>

        {/* <Grid sx={{ display: "flex", flexDirection: "row" }}> */}
        {/* <MDBox pt={3} px={3}>
            <Modal open={showAdd} onClose={handleShowAdd}>
              <Card sx={modalStyle}>
                <LocationForm handleShowAdd={handleShowAdd} />
              </Card>
            </Modal>

            <SearchForm
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
              showAdd={showAdd}
              handleShowAdd={handleShowAdd}
              setShowAdd={setShowAdd}
            />

            <Grid item>
              {error && <div>{error}</div>}
              {isPending && <div>Loading...</div>}
              {locations && (
                <Locations
                  locations={locations}
                  searchInput={searchInput}
                  handleShowAdd={handleShowAdd}
                />
              )}
            </Grid>
          </MDBox> */}

        {/* <Geocoding /> */}

        {/* <MDBox pt={2} pb={3}>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  title="map"
                  width="200%"
                  height="750px"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  // src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback=iniciarMap"

                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                />
              </div>
            </div>
          </MDBox> */}
        {/* </Grid> */}
        {/* <Divider /> */}
      </Card>
      {/* </SearchContextProvider> */}

      <Footer />
    </DashboardLayout>
  );
}

export default Sucursales;
