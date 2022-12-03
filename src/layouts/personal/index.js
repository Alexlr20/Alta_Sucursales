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
import { Button, Card, Grid, Icon, InputAdornment, Modal, TextField } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import "../../styles/Table.css";
import CreatePersonal from "./components/CreatePersonal";
import PersonalTable from "./components/PersonalTable";
import UpdatePersonal from "./components/UpdatePersonal";
// import PersonalTable  from "./components/PersonalTable";

// const OrganigramaImg = require("./Organigrama.jpg");

// Dashboard components

function Personal() {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [personal, setPersonal] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  const handleShowEdit = () => {
    setShowEdit(prev => !prev);
  };

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((current) => !current);
  };

    useEffect(() => {
        // axios.get('http://localhost:8000/states/')
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php')
            .then((response) => {
                const { data } = response;
                const { personal: p } = data;
                console.log('ESTADWtff', p);
                setPersonal(p);
                // setIsPending(false);
                // setError(null);
            })
            .catch((err) => console.log(err));

    }, [refresh]);


  const handleShowCreate = () => {
    setShowCreate((current) => !current);
  };

  const handleSearchChange = ({ target }) => {
    setSearchInput(target.value);
  };

  const [idToUpdate, setIdToUpdate] = useState(0);
  const [employeeIsUser, setEmployeeIsUser] = useState(false);

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
      <MDBox
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        mb={4}
      >
        <MDTypography variant="h6" color="white">
          Personal
        </MDTypography>
      </MDBox>

      <Card sx={{ padding: 2, height: "77vh" }}>
        <Grid container direction="column">
          {/* <MDBox mb={2}>
        <CreatePersonal />
      </MDBox> */}
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

            <Grid item>
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
              <CreatePersonal handleShowCreate={handleShowCreate} handleRefresh={handleRefresh}/>
            </MDBox>
          </Modal>

          <Modal open={showEdit} onClose={handleShowEdit}>
            <MDBox mt={2} sx={modalStyle}>
              <UpdatePersonal idToUpdate={idToUpdate} employeeIsUser={employeeIsUser} handleShowEdit={handleShowEdit} handleRefresh={handleRefresh}/>
            </MDBox>
          </Modal>

          <MDBox mb={2} mt={2}>
            {/* {error && <div>{error}</div>} */}
            {/* {isPending && <div>Cargando...</div>} */}
            {personal && <PersonalTable personal={personal} handleShowEdit={handleShowEdit} setIdToUpdate={setIdToUpdate} setEmployeeIsUser={setEmployeeIsUser}/>}
          </MDBox>
        </Grid>
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default Personal;
