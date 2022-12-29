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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Button, Modal } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import LocationForm from "./components/CreateLocation";
import SearchForm from "./components/SearchForm";
import Locations from "./components/Locations";
import EditLocation from "./components/EditLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Box } from "@mui/system";

const modalStyle2 = {
  width: "30%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "1rem"
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
};

function Sucursales() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  const [locationIdToUpdate, setLocationIdToUpdate] = useState(0);
  const [locationIdToDelete, setLocationIdToDelete] = useState(0);

  const [statusValue, setStatusValue] = useState('nonSuspended');


  useEffect(() => {
    if (statusValue === 'nonSuspended') {
      console.log('statusValue in nonsupended', statusValue);
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php')
        .then((response) => {
          const { data } = response;
          const { sucursal } = data;

          const formatedData = sucursal?.map(e => ({
            id: e.id,
            nombre_sucursal: e.nombre,
            direccion: `${e.tipo === 'Avenida' ? 'Av. ' : ''} ${e.nombre_vialidad} ${e.numero_ext}, ${e.numero_int === '' || e.numero_int === 'NULL' ? '' : `${e.numero_int},`} ${e.nombre_colonia}, ${e.codigo_postal}, ${e.nombre_ciud}, ${e.nombre_edo}`
          }));

          setLocations(formatedData);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err)
          setIsPending(false);
          setError(err.message);
        });
    }

    if (statusValue === 'suspended') {
      console.log('statusValue in nonsupended', statusValue);
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php?suspended=1')
        .then((response) => {
          const { data } = response;
          const { sucursal } = data;

          const formatedData = sucursal?.map(e => ({
            id: e.id,
            nombre_sucursal: e.nombre,
            direccion: `${e.tipo === 'Avenida' ? 'Av. ' : ''} ${e.nombre_vialidad} ${e.numero_ext}, ${e.numero_int === '' || e.numero_int === 'NULL' ? '' : `${e.numero_int},`} ${e.nombre_colonia}, ${e.codigo_postal}, ${e.nombre_ciud}, ${e.nombre_edo}`
          }));

          setLocations(formatedData);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err)
          setIsPending(false);
          setError(err.message);
        });
    }

    if (statusValue === 'all') {
      console.log('statusValue in nonsupended', statusValue);
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php?allStatus=1')
        .then((response) => {
          const { data } = response;
          const { sucursal } = data;
          const formatedData = sucursal?.map(e => ({
            id: e.id,
            nombre_sucursal: e.nombre,
            direccion: `${e.tipo === 'Avenida' ? 'Av. ' : ''} ${e.nombre_vialidad} ${e.numero_ext}, ${e.numero_int === '' || e.numero_int === 'NULL' ? '' : `${e.numero_int},`} ${e.nombre_colonia}, ${e.codigo_postal}, ${e.nombre_ciud}, ${e.nombre_edo}`
          }));

          setLocations(formatedData);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          console.log(err)
          setIsPending(false);
          setError(err.message);
        });
    }
  }, [statusValue]);


  const handleShowAdd = () => {
    setShowAdd((current) => !current);
  };

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = ({ target }) => setSearchInput(target.value);

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => setShowEdit(prev => !prev);

  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(prev => !prev);

  const confirmDelete = (id) => {
    axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/delete.php', {
      id: id,
    })
      .then((response) => console.log('Borrado :D', response))
      .catch(error => {
        console.log(error)
        if (error.message === 'Request failed with status code 503') alert('La sucursal no se puede borrar por que ya se está utilizando');
      })
    setShowDelete(false);
  };

  return (
    <DashboardLayout>
      <MDBox py={3} px={2} mb={4} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
        <MDTypography variant="h6" color="white">
          Alta de Sucursales
        </MDTypography>
      </MDBox>

      <Card sx={{ borderRadius: "0.5rem", height: "35rem" }}>
        <div style={{ display: "flex" }}>

          {/* Lado izquierdo */}
          <MDBox pt={3} px={3} style={{ width: "50%", padding: "1rem" }}>

            <Modal open={showAdd} onClose={handleShowAdd}>
              <Card sx={modalStyle} style={{ width: "50%" }}>
                <LocationForm handleShowAdd={handleShowAdd} />
              </Card>
            </Modal>

            <Modal open={showEdit} onClose={handleShowEdit}>
              <Card sx={modalStyle} style={{ width: "50%" }}>
                <EditLocation handleShowAdd={handleShowEdit} locationIdToUpdate={locationIdToUpdate} />
              </Card>
            </Modal>

            <Modal open={showDelete} onClose={handleShowDelete}>
              <Card style={modalStyle2} sx={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                  <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleShowDelete} />
                </div>

                <MDTypography variant="h6" fontWeight="medium" style={{ textAlign: "center" }}>Borrar?, esta opción no es reversible</MDTypography>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={() => confirmDelete(locationIdToDelete)}>Borrar ciudad</Button>
                  <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleShowDelete}>Cancelar</Button>
                </Box>
              </Card>
            </Modal>

            <SearchForm
              searchInput={searchInput}
              handleSearchChange={handleSearchChange}
              showAdd={showAdd}
              handleShowAdd={handleShowAdd}
              setShowAdd={setShowAdd}
              statusValue={statusValue}
              setStatusValue={setStatusValue}
            />

            <Grid item>
              {error && <div>{error}</div>}
              {isPending && <div>Cargando...</div>}
              {locations && (
                <Locations
                  locations={locations}
                  searchInput={searchInput}
                  handleShowEdit={handleShowEdit}
                  setLocationIdToUpdate={setLocationIdToUpdate}
                  handleShowDelete={handleShowDelete}
                  setLocationIdToDelete={setLocationIdToDelete}
                />
              )}
            </Grid>
          </MDBox>

          {/* Lado derecho */}
          <div className="mapouter" style={{ width: "50%" }}>
            <div className="gmap_canvas">
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
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default Sucursales;
