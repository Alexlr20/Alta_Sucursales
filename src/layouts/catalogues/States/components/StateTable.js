/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField, Card } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useState } from "react";

// import mandateData from "../SearchForm/mandateData";

// eslint-disable-next-line react/prop-types
function ActionButtons({ id, handleRefresh }) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEdit = () => {
    setOpenEdit((prev) => !prev);
  };

  console.log(id);

  const [state, setState] = useState("");
  const [stateError, setStateError] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const handleClick = () => {
    handleEdit();

    axios
      .get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php?id=${id}`)
      .then((response) => {
        const { data } = response;
        const { estado } = data;
        // console.log('GET IN STATE TABLE SI',estado[0]);
        setState(estado[0].nombre_edo);
        setCode(estado[0].codigo);
      })
      .catch((error) => {
        if (error === "AbortError") {
          console.log(error);
        }
      });
  };

  const modalStyle = {
    width: "30%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#FFF",
    padding: "1rem",
  };

  const actionButton = {
    alignSelf: "center",
    cursor: "pointer",
  };

  const handleChange = ({ target }) => {
    setState(target.value);
  };

  const handleCodeChange = ({ target }) => {
    setCode(target.value);
  };

  const validateStatesInput = () => {
    if (state.length <= 0) {
      setStateError(true);
    } else {
      setStateError(false);
    }

    if (code.length <= 0) {
      setCodeError(true);
    } else {
      setCodeError(false);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    validateStatesInput();
    if (stateError === false && codeError === false) {
      console.log("No errors :D");

      console.log(`
            id: ${id},
            nombre: ${state},
            cod: ${code}
            `);

      // axios.patch(`http://localhost:8000/states/${id}`, {
      axios
        .patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/update.php`, {
          // eslint-disable-next-line object-shorthand
          id: id,
          nombre_edo: state,
          codigo: code,
        })
        .then((response) => console.log("ENVIADO PATCH!", response))
        .catch((error) => console.log(error));

      setState("");
      setCode("");
      handleRefresh();
      handleEdit();
    }
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  const confirmDelete = (e) => {
    e.preventDefault();

    axios
      .patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/delete.php`, {
        // eslint-disable-next-line object-shorthand
        id: id,
      })
      .then((response) => console.log("ENVIADO PATCH!", response))
      .catch((error) => console.log(error));

    // .then(((response) => console.log('ESTADO BORRADO :D', response))
    // .catch(error => console.log(error))
    // )
    handleDelete();
    handleRefresh();
  };

  const buttonStyle = {
    width: "fit-content",
    color: "#FFF",
    marginTop: "1.5rem",
    backgroundColor: "#1A73E8",
  };

  return (
    <>
      <Modal open={openEdit} onClose={handleEdit}>
        <Card style={modalStyle}>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              style={{ cursor: "pointer" }}
              onClick={handleEdit}
            />
          </div>

          <Box style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Box style={{width: "70%", alignSelf: "center"}}>
              <MDTypography variant="h6" fontWeight="medium">
                Estado
              </MDTypography>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                name="codigo"
                value={state}
                onChange={handleChange}
                error={stateError}
              />
            </Box>

            {/* <Box> */}
            <Box style={{width: "70%", alignSelf: "center"}}>
              <MDTypography variant="h6" fontWeight="medium">
                Codigo
              </MDTypography>
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                name="codigo"
                value={code}
                onChange={handleCodeChange}
                error={codeError}
              />
            </Box>
          </Box>

          <Button
            style={{ alignSelf: "flex-end"}}
            sx={buttonStyle}
            variant="contained"
            onClick={handleSumbit}
          >
            Agregar Estado
          </Button>
        </Card>
      </Modal>

      <Modal open={openDelete} onClose={handleDelete}>
        <Card style={modalStyle} sx={{ display: "flex", gap: "1.5rem" }}>
          <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <FontAwesomeIcon
              icon={faXmark}
              size="lg"
              style={{ cursor: "pointer" }}
              onClick={handleDelete}
            />
          </div>

          {/* <Box style={{ display: "flex", flexDirection: "column"}}> */}
          <MDTypography variant="h6" fontWeight="medium">
            Borrar?, esta opción no es reversible
          </MDTypography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              style={{ width: "fit-content", color: "#FFF", backgroundColor: "#1A73E8" }}
              variant="contained"
              onClick={confirmDelete}
            >
              Borrar estado
            </Button>
            <Button
              style={{ width: "fit-content", color: "#FFF", backgroundColor: "#1A73E8" }}
              variant="contained"
              onClick={handleDelete}
            >
              Cancelar
            </Button>
          </Box>
          {/* </Box> */}
        </Card>
      </Modal>

      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <FontAwesomeIcon
          icon={faPenToSquare}
          size="lg"
          onClick={handleClick}
          style={actionButton}
        />
        <FontAwesomeIcon icon={faTrash} size="lg" style={actionButton} onClick={handleDelete} />
      </div>
    </>
  );
}

export default function StateTable({ allStates, handleRefresh }) {
  console.log(allStates);
  // const { columns, rows } = mandateData();

  // eslint-disable-next-line react/no-unstable-nested-components
  function TableFiller({ name, calle }) {
    return (
      <MDBox display="flex" alignItems="center">
        <MDBox ml={0} lineHeight={1} sx={{ zIndex: 1 }}>
          <MDTypography display="block" variant="caption" fontWeight="medium">
            {name}
          </MDTypography>
          <MDTypography variant="caption" fontWeight="medium">
            {calle}
          </MDTypography>
        </MDBox>
      </MDBox>
    );
  }
  console.log(allStates);

  const columns = [
    { Header: "ID", accessor: "ID", align: "left" },
    { Header: "Nombre", accessor: "Nombre", align: "left" },
    { Header: "Código", accessor: "Codigo", align: "left" },
    { Header: "Editar", accessor: "Editar", align: "left" },
  ];

  // const prefakeddata = [
  //     { id: 10, nombre: "Nuevo león", codigo: "NL"},
  // ];

  const rows = allStates.map((elem) => ({
    ID: <TableFiller name={elem.id} />,
    Nombre: <TableFiller name={elem.nombre_edo} />,
    Codigo: <TableFiller name={elem.codigo} />,
    Editar: <ActionButtons id={elem.id} handleRefresh={handleRefresh} />,

    // Fechas: <TableFiller name={elem.fecha_inicial} calle={elem.fecha_final} />,
    // Horario: <TableFiller name={elem.hora_inicial} calle={elem.hora_final} />,
    // Dias: <DatesSelect dias={elem.dias} />,
    // Visto: <TableFiller name={elem.visto} />,
    // Status: <StatusDialog status="candado" id="status_id_0" textValue="" />,
    // Detalle: (
    //   <DetailDialog
    //     detalle="detalle"
    //     id="elem.id"
    //     textValue=""
    //     fechaInicial="fechacreacion"
    //     fechaFinal="fechacreacion2"
    //     horaInicial="horacreacion"
    //     horaFinal="horacreacion2"

    //     // fechaCreacion="fechainicial - hora"
    //     // fechaModificacion="fechademod - horamod"
    //     // fechaTerminado="fechaterminada - horaterminada"
    //     // fechaAutorizacion="fechaautorizacion - horaautorizacion"
    //   />
    // ),
  }));

  return (
    <Card>
      <DataTable
        table={{ columns, rows }}
        isSorted={false}

        entriesPerPage={false}
        // showTotalEntries={false}

        // noEndBorder
      />
    </Card>
  );
}
