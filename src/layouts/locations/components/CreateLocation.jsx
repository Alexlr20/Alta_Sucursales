import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, Grid } from "@mui/material";
import axios from "axios";
import MDButton from "components/MDButton";
import React, { useState } from "react";
import ScheduleTable from "./ScheduleTable";
import { LocationFields } from "./LocationFields";
import { LocationSchedule } from "./LocationSchedule";
import { useEffect } from "react";

const actionButton = {
  alignSelf: "center",
  cursor: "pointer"
}

const initialFormValues = {
  nombre_sucursal: "",
  nombre_vialidad: "",
  num_exterior: "",
  num_interior: "",
  tipo_vialidad: "",
  colonia: "",
  nombre_localidad: "",
  estado: "",
  municipio: "",
  codigo_postal: "",
};

const column = [
  { heading: "Dias", value: "dia" },
  { heading: "Hora Inicio", value: "hora_inicial" },
  { heading: "Hora Final", value: "hora_final" },
  { heading: "Acciones", value: "acciones" }
];

const fieldContainer = { height: "55vh", width: "100%", paddingRight: "1rem", overflowY: "scroll" }

export default function CreateLocation({ handleShowAdd, edit, locationIdToUpdate }) {

  const [formValues, setFormValues] = useState(initialFormValues);
  const [scheduleHistory, setScheduleHistory] = useState([
    {
      dia: '',
      hora_inicial: '',
      hora_final: ''
    }
  ]);

  const [formErrors, setFormErrors] = useState("");

  useEffect(()=>{
    if(edit){
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php?id=${locationIdToUpdate}`)
            .then((resp) => {
                const { data } = resp;
                const {sucursal:s} = data;

                console.log('HOLA -> ', s[0]);

                setFormValues({
                    nombre_sucursal: s[0].nombre,
                    nombre_vialidad: s[0].nombre_vialidad,
                    num_exterior: s[0].numero_ext,
                    num_interior: s[0].numero_int,
                    tipo_vialidad: s[0].id_tipo_vialidad,
                    colonia: s[0].id_colonia,
                    nombre_localidad: s[0].nombre_localidad,
                    estado: s[0].id_edo,
                    municipio: s[0].id_ciudad,
                    codigo_postal: Number(s[0].codigo_postal)
                });

            })
            .catch((error) => console.error(error));
    }
  }, [edit, locationIdToUpdate]);

  // const validate = (val) => {
  //   const errors = {};

  //   if (!val.nombre_sucursal) errors.nombre_sucursal = true;
  //   if (!val.nombre_vialidad) errors.nombre_vialidad = true;
  //   if (!val.num_exterior) errors.num_exterior = true;
  //   if (!val.num_interior) errors.num_interior = true;
  //   if (!val.tipo_vialidad) errors.tipo_vialidad = true;
  //   if (!val.colonia) errors.colonia = true;
  //   if (!val.nombre_localidad) errors.nombre_localidad = true;
  //   if (!val.estado) errors.estado = true;
  //   if (!val.municipio) errors.municipio = true;

  //   return errors;
  // };

  const handleSubmit = () => {
    console.log('VALORES DEL FORMS', formValues);
    setFormValues((v) => ({
      ...v,
      "num_interior": formValues.num_interior === ''? null : formValues.num_interior,
      "num_exterior": Number(formValues.num_exterior),
      "codigo_postal": Number(formValues.codigo_postal)
    }));

    const requestData = JSON.stringify({...formValues, dias: scheduleHistory});

    // const requestData = JSON.stringify({
    //   ...formValues,
    //   dias: cleanedUpHistory
    // })

    console.log('REQUEST DATA -> ', requestData);

    axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/create.php', {
      requestData
    })
      .then((response) => console.log('Enviado ->', response))
      .catch((error) => console.log(error));

  };

  const clearForm = () => {
    setFormValues(initialFormValues);
  };

  const handleClick = () => {
    clearForm();
    handleShowAdd();
  };

  return (
    <Card sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ alignSelf: "flex-end", justifyContent: "center" }}>
        <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowAdd} />
      </Box>

      <Grid container sx={fieldContainer}>
        {/* Campos Sucursal */}
        <LocationFields formValues={formValues} setFormValues={setFormValues} formErrors={formErrors} setFormErrors={setFormErrors}/>      

        {/* Horarios Sucursal */}
        <LocationSchedule column={column} setScheduleHistory={setScheduleHistory}/>
      </Grid>

      <Box sx={{ alignSelf: "flex-end", marginTop: "1rem" }}>
        <MDButton mx={2} color="info" onClick={handleSubmit}>
          Agregar Sucursales
        </MDButton>

        <MDButton sx={{ marginLeft: 1 }} color="info" onClick={handleClick}>Cancelar</MDButton>
      </Box>
    </Card>
  );
}

export function ActionButtons({ id, savedDays, currentDay, setCurrentDay, history, historyState, setEditActive, idToUpdate, editActive, newStateSync }) {
  const handleClick = () => {}
  const handleDelete = () => {}

  return <div style={{ display: "flex", justifyContent: "space-evenly" }}>
    <FontAwesomeIcon icon={faPenToSquare} size='md' onClick={handleClick} style={actionButton} />
    <FontAwesomeIcon icon={faTrash} size='md' style={actionButton} onClick={handleDelete} />
  </div>
};