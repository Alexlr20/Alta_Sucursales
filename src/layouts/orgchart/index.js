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

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, MenuItem, Modal, Select, Box, Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { OrgPopUp } from "./components/OrgPopUp";

import Table from "./components/OrgTable";

import "../../styles/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { EditPopUp } from "./components/EditPopUp";
import { StatusDropdown } from "components/dropdrowns/StatusDropdown";



// const getFormatedAreas = (areasFromTree) => {
//   const idMapping = areasFromTree.reduce((acc, el, i) => {
//     acc[el.nombre_area] = i;
//     return acc;
//   }, {});

//   let root;
//   areasFromTree.forEach((el) => {
//     if (el.responde_a === null) {
//       root = el;
//       return;
//     }
//     const parentEl = areasFromTree[idMapping[el.responde_a]];
//     parentEl.children = [...(parentEl.children || []), el] ? [...(parentEl.children || []), el] : null;
//   });


//   const arrPedorro = [];
//   const getAllAreas = (allAreas) => {
//     console.log('AllAreas in GetAllAreas -> ', allAreas);
//     arrPedorro.push(allAreas);

//     allAreas?.map((area) => {
//       if (area.children) {
//         return getAllAreas(area.children);
//       }

//       return {
//         nombre_area: area.nombre_area,
//         responde_a: area.responde_a
//       }
//     });
//   }

//   const allReturnedAreas = getAllAreas([root]);

//   console.log('Areas de organigrama en arbol -> ', root);
//   console.log('Areas de organigrama después -> ', allReturnedAreas);
//   console.log('Array pedorro -> ', arrPedorro.flatMap(e => e));

//   return arrPedorro.flatMap(e => e);
// };




const ActionButtons = ({ area_id, setShowEdit, setShowDelete, setAreaId }) => {
  return (
    <div style={{ gap: "1rem", alignSelf: "center" }}>
      <FontAwesomeIcon icon={faPenToSquare} size="sm" style={{ cursor: "pointer", marginRight: '2rem' }}
        onClick={() => {
          setShowEdit(true)
          console.log('AREA ID->', area_id)
          setAreaId(area_id);
        }}
      />
      <FontAwesomeIcon icon={faTrash} size="sm" style={{ cursor: "pointer" }}
        onClick={() => {
          setAreaId(area_id);
          setShowDelete(true);
        }}
      />
    </div>
  )
}


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const modalStyle2 = {
  width: "30%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "1rem"
};

function Organigrama() {
  const [areas, setAreas] = useState([]);

  const [locationValues, setLocationValues] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [areaId, setAreaId] = useState(0);

  const [statusValue, setStatusValue] = useState('nonSuspended');

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((current) => !current);
  };

  useEffect(() => {
    console.log('STATUS VALUE IN USE EFFECT ->> ',statusValue);

    if (selectedLocation !== '' && statusValue === 'nonSuspended') {
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}`)
        .then((response) => {
          const { data } = response;
          const { organigrama } = data;
          console.log('organigramawtff -> ', organigrama);
          // const x = getFormatedAreas(organigrama);
          // setAreas(x);
          setAreas(organigrama);
        })
        .catch((error) => console.log(error));
    }

    if (selectedLocation !== '' && statusValue === 'suspended') {
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}&suspended=1`)
        .then((response) => {
          const { data } = response;
          const { organigrama } = data;
          console.log('organigramawtff -> ', organigrama);
              setAreas(organigrama);
        })
        .catch((error) => console.log(error));
    }

    if (selectedLocation !== '' && statusValue === 'all') {
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}&all=1`)
        .then((response) => {
          const { data } = response;
          const { organigrama } = data;
          console.log('organigramawtff -> ', organigrama);
          setAreas(organigrama);
        })
        .catch((error) => console.log(error));
    }

  }, [selectedLocation, statusValue, refresh]);


  useEffect(() => {
    axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php')
      .then((response) => {
        const { data } = response;
        const { sucursal } = data;
        const formatedData = sucursal?.map(e => ({
          id: e.id,
          nombre_sucursal: e.nombre,
        }));

        setLocationValues(formatedData);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const column = [
    { heading: "Area", value: "nombre_area" },
    { heading: "Responde a", value: "responde_a" },
    { heading: "Acciones", value: "acciones" },
  ];

  const rows = areas?.map((elem) => ({
    nombre_area: elem.nombre_area,
    responde_a: elem.responde_a,
    acciones: <ActionButtons area_id={elem.id} setAreaId={setAreaId} setShowEdit={setShowEdit} setShowDelete={setShowDelete} />
  }));


  const handleClick = () => setShowPopUp((current) => !current);
  const handleShowEdit = () => setShowEdit(prev => !prev);
  const handleShowDelete = () => setShowDelete(prev => !prev);
  const handleInputChange = ({ target }) => setSelectedLocation(() => target.value);

  const confirmDelete = (e) => {
    e.preventDefault();
    axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/delete.php', {
      id: areaId,
    })
      .then((response) => console.log('Borrado :D', response))
      .catch(error => {
        if (error.message === 'Request failed with status code 503') alert('La sucursal no se puede borrar por que ya se está utilizando');
        console.log(error)
      })

    handleShowDelete();
    handleRefresh();
  };



  return (
    <DashboardLayout>
      <MDBox py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mb={4}>
        <MDTypography variant="h6" color="white">Organigrama</MDTypography>
      </MDBox>
      <MDBox mt={4} className="org-chart">
        <Card sx={{ padding: "1rem", height: "77vh" }}>

          {/* Seleccionar sucursal */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr",
                columnGap: "1rem",
              }}

            // style={{ display: "flex", }}
            >
              <MDTypography variant="h6" fontWeight="medium">Seleccionar Sucursal:</MDTypography>
              <Select name="area" value={selectedLocation} onChange={handleInputChange}>
                {
                  locationValues?.map((location) => (
                    <MenuItem key={location.id} value={location.id}>
                      {location.nombre_sucursal}
                    </MenuItem>
                  ))
                }
              </Select>
            </Box>

            <Box sx={{ display: "flex", gap: "1rem" }}>
              {
                selectedLocation &&
                <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />
              }

              <Button variant="contained" disabled={!selectedLocation} onClick={handleClick} sx={{ color: "#FFF" }} size="small">
                {" "}Area +{" "}
              </Button>
            </Box>

          </Box>

          <Modal
            open={showPopUp}
            onClose={handleClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <OrgPopUp
                close={setShowPopUp}
                handleClose={handleClick}
                handleRefresh={handleRefresh}
                selectedLocation={selectedLocation}
              />
            </Box>
          </Modal>


          <Modal
            open={showEdit}
            onClose={() => setShowEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <EditPopUp
                areaId={areaId}
                close={setShowEdit}
                handleClose={handleShowEdit}
                handleRefresh={handleRefresh}
                selectedLocation={selectedLocation}
              />
            </Box>
          </Modal>

          <Modal open={showDelete} onClose={handleShowDelete}>
            <Card style={modalStyle2} sx={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleShowDelete} />
              </div>

              <MDTypography variant="h6" fontWeight="medium" style={{ textAlign: "center" }} >Borrar?, esta opción no es reversible</MDTypography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={confirmDelete}>Borrar ciudad</Button>
                <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleShowDelete}>Cancelar</Button>
              </Box>
            </Card>
          </Modal>

          <div style={{ overflowY: "scroll", display: "block" }}>
            {areas && <Table data={rows} column={column} />}
          </div>

        </Card>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Organigrama;