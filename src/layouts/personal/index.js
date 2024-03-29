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

// @mui material components

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Card, Grid, Icon, InputAdornment, Modal, TextField } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import "../../styles/Table.css";
import CreatePersonal from "./components/CreatePersonal";
import PersonalTable from "./components/PersonalTable";
import UpdatePersonal from "./components/UpdatePersonal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { StatusDropdown } from "components/dropdrowns/StatusDropdown";

const modalStyle2 = {
  width: "30%",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "1rem"
};

function Personal() {
  const [personal, setPersonal] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [idToDelete, setIdToDelete] = useState(0);

  const [showEdit, setShowEdit] = useState(false);

  const [statusValue, setStatusValue] = useState('nonSuspended');


  const handleShowEdit = () => {
    setShowEdit(prev => !prev);
  };

  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(prev => !prev);
  };

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((current) => !current);
  };



  useEffect(() => {
    if(statusValue === 'nonSuspended'){
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php')
        .then((response) => {
          const { data } = response;
          const { personal: p } = data;
          console.log('ESTADWtff', p);
          setPersonal(p);
        })
        .catch((err) => console.log(err));
    }

    if(statusValue === 'suspended'){
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php?suspended=1')
        .then((response) => {
          const { data } = response;
          const { personal: p } = data;
          console.log('ESTADWtff', p);
          setPersonal(p);
        })
        .catch((err) => console.log(err));
    }

    if(statusValue === 'all'){
      axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php?all=1')
        .then((response) => {
          const { data } = response;
          const { personal: p } = data;
          console.log('ESTADWtff', p);
          setPersonal(p);
        })
        .catch((err) => console.log(err));
    }

  }, [statusValue, refresh]);


  const handleShowCreate = () => {
    setShowCreate((current) => !current);
  };

  const handleSearchChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const [idToUpdate, setIdToUpdate] = useState(0);
  const [employeeIsUser, setEmployeeIsUser] = useState(false);

  const confirmDelete = () => {
    axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/delete.php', {
      id: idToDelete,
    })
      .then((response) => console.log('Borrado :D', response))
      .catch(error => {
        if (error.message == 'Request failed with status code 503') {
          alert('El empleado no se puede ocultar por que ya está en uso');
        }
        console.log(error)
      })

    handleShowDelete();
    handleRefresh();
  };

  const modalStyle = {
    width: "80%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    borderRadius: "1rem",
  };

  return (
    <DashboardLayout>
      <MDBox py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info" mb={4}>
        <MDTypography variant="h6" color="white">Personal</MDTypography>
      </MDBox>

      <Card sx={{ padding: 2, height: "77vh" }}>
        <Grid container direction="column">
          <Grid container justifyContent="space-between">
            <Grid item xs={4}>
              <TextField
                fullWidth
                sx={{ backgroundColor: "#FFF" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>search</Icon>
                    </InputAdornment>
                  ),
                }}
                value={searchInput}
                onChange={handleSearchChange}
              />
            </Grid>

            <Grid item style={{ display: "flex", gap: "1rem" }}>
              <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue} />


              <Button
                sx={{ color: "#FFF", alignSelf: "flex-end" }}
                variant="contained"
                onClick={handleShowCreate}
              >
                Agregar Personal
              </Button>
            </Grid>
          </Grid>

          <Modal open={showCreate} onClose={handleShowCreate}>
            <MDBox mt={2} sx={modalStyle}>
              <CreatePersonal handleShowCreate={handleShowCreate} handleRefresh={handleRefresh} />
            </MDBox>
          </Modal>

          <Modal open={showEdit} onClose={handleShowEdit}>
            <MDBox mt={2} sx={modalStyle}>
              <UpdatePersonal idToUpdate={idToUpdate} employeeIsUser={employeeIsUser} handleShowEdit={handleShowEdit} handleRefresh={handleRefresh} />
            </MDBox>
          </Modal>

          <Modal open={showDelete} onClose={handleShowDelete}>
            <Card style={modalStyle2} sx={{ display: "flex", gap: "1.5rem" }}>
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleShowDelete} />
              </div>

              <MDTypography variant="h6" fontWeight="medium" style={{ textAlign: "center" }} >Borrar?, esta opción no es reversible</MDTypography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={confirmDelete}>Ocultar empleado</Button>
                <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleShowDelete}>Cancelar</Button>
              </Box>
            </Card>
          </Modal>




          <MDBox mb={2} mt={2}>
            {personal &&
              <PersonalTable
                personal={personal}
                handleShowEdit={handleShowEdit}
                setIdToUpdate={setIdToUpdate}
                setEmployeeIsUser={setEmployeeIsUser}
                handleShowDelete={handleShowDelete}
                setIdToDelete={setIdToDelete}
              />}
          </MDBox>
        </Grid>
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default Personal;
