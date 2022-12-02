/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { History } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  // FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  // Typography,
} from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useEffect, useRef, useState } from "react";
import ScheduleTable from "./ScheduleTable";
// import MemoizedScheduleTable from "./ScheduleTable";
// import ScheduleTable from "./ScheduleTable";

const actionButton = {
  alignSelf: "center",
  cursor: "pointer"
}



export default function LocationForm({ handleShowAdd }) {
  const history = [];
  const [historyState, setHistoryState] = useState([]);
  
  const [allListedStates, setAllListedStates] = useState([]);
  const [allListedCities, setAllListedCities] = useState([]);

  const [allListedLocalities, setAllListedLocalities] = useState([]);

  const [scheduleCounter, setScheduleCounter] = useState(1);
  const [editActive, setEditActive] = useState(false);
  // const [idToUpdate, setIdToUpdate] = useState(0);

  const idToUpdate = useRef(scheduleCounter);
  
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
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php")
      .then((resp) => {
        const { data } = resp;
        const { estado } = data;
        console.log("RESPUESTA DE AXIOS ESTADOS", estado);
        setAllListedStates(estado);
      })
      .catch((error) => console.error(error));

    console.log(allListedStates);
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?byStateId=1&id=${formValues.estado}`
      )
      .then((response) => {
        const { data } = response;
        const { ciudad } = data;
        setAllListedCities(ciudad);
      })
      .catch((error) => console.log(error));
  }, [formValues.estado]);

  useEffect(() => {
    axios
      .get(
        // `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?byStateId=1&id=${formValues.estado}`
        `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/read.php?byCityId=1&id=${formValues.municipio}`
      )
      .then((response) => {
        const { data } = response;
        const { colonia } = data;
        console.log('RESPUETACOLONIASI', colonia);
        // const { ciudad } = data;
        setAllListedLocalities(colonia);
      })
      .catch((error) => console.log(error));
  }, [formValues.estado, formValues.municipio]);

  const [allListedRoadTypes, setAllListedRoadTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php')
      .then(resp => {
        const { data } = resp;
        // eslint-disable-next-line prettier/prettier, camelcase
        const { tipo_vialidad } = data;
        setAllListedRoadTypes(tipo_vialidad);
        console.log(allListedRoadTypes);
      })
      .catch()

  }, []);

  // eslint-disable-next-line no-unused-vars
  const validate = (val) => {
    const errors = {};

    if (!val.nombre_sucursal) errors.nombre_sucursal = true;
    // if (!val.direccion) errors.direccion = true;

    if (!val.nombre_vialidad) errors.nombre_vialidad = true;
    if (!val.num_exterior) errors.num_exterior = true;
    if (!val.num_interior) errors.num_interior = true;
    if (!val.tipo_vialidad) errors.tipo_vialidad = true;
    if (!val.colonia) errors.colonia = true;
    if (!val.nombre_localidad) errors.nombre_localidad = true;
    if (!val.estado) errors.estado = true;
    if (!val.municipio) errors.municipio = true;

    return errors;
  };

  const handleSubmit = () => {
    console.log(formValues);
    console.log(historyState);
    console.log(historyState.flatMap((e) => e));


    // if (!Object.values(validate(formValues)).includes(true)) {
    //   // console.log("No hay errores en el formulario :D");

    //   const newLocation = {
    //     nombre_sucursal: formValues.nombre_sucursal,
    //     direccion: {
    //       nombre_vialidad: formValues.nombre_vialidad,
    //       numero_interior: formValues.num_interior,
    //       numero_exterior: formValues.num_exterior,
    //       tipo_vialidad: formValues.tipo_vialidad,
    //       colonia: formValues.colonia,
    //       nombre_localidad: formValues.nombre_localidad,
    //       estado: formValues.estado,
    //       municipio: formValues.municipio,
    //     }
    //   };

    //   console.log(newLocation);

    //   // fetch("http://localhost:8000/locations", {
    //   //   method: "POST",
    //   //   headers: { "Content-Type": "application/json" },
    //   //   body: JSON.stringify(newLocation),
    //   // }).then(() => {
    //   //   console.log("New location added :");
    //   // });

    //   // setFormValues(initialFormValues);
    // }

    // else {
    //   console.log("formValues -> ", formValues);
    //   console.log("formErrors -> ", validate(formValues));
    // }
  };

  const clearForm = () => {
    setFormValues(initialFormValues);
  };

  const handleClick = () => {
    clearForm();
    handleShowAdd();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'estado':
        setFormValues((v) => ({
          ...v,
          "municipio": "",
          "colonia": "",
          [name]: value,
        }));
        break;

      case 'municipio':
        setFormValues((v) => ({
          ...v,
          "colonia": "",
          [name]: value,
        }));
        break;

      default:
        setFormValues((v) => ({
          ...v,
          [name]: value,
        }));
        break;
    }


  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newFormErrors = { ...formErrors };
    delete newFormErrors[name];

    setFormErrors(newFormErrors);
  };

  const initialCheckboxValues = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    all: false,
    hora_inicial: "",
    hora_final: "",
  };

  // const validateCheckboxes = (val) => {
  //   const errors = {};

  //   if (!Object.values(val).includes(true)) {
  //     errors.err = true;
  //   }

  //   return errors;
  // };

  // const [values, setValues] = useState(initialCheckboxValues);

  const [currentDay, setCurrentDay] = useState(initialCheckboxValues);


  const handleChange = (e) => {
    const { name, checked } = e.target;
    setCurrentDay({ ...currentDay, [name]: checked });
    // handleInputChange(values);
  };

  // const [savedDays, setSavedDays] = useState(initialCheckboxValues);
  const savedDays = useRef(initialCheckboxValues);
  // eslint-disable-next-line no-unused-vars
  const [daysHistory, setDaysHistory] = useState({});

  const handleUpdateDay = () => {
    console.log('OLASISOYYO',historyState);
    console.log(editActive? 'ON UPDATEEEE' : 'UPDATE DISABLED');
    console.log('ID EN ESTADO ON UPDATE', idToUpdate.current);

    if (!Object.values(currentDay).includes(true)) {
      return;
    }

    if (currentDay.hora_final === "" || currentDay.hora_inicial === "") {
      return;
    }
    
    console.log(!Object.keys(currentDay).includes(false));

    const currentSchedule = {
      scheduleId: idToUpdate.current,
      dia: [],
      hora_inicial: "",
      hora_final: "",
    };

    const dayForUse = Object.fromEntries(
      Object.entries(currentDay).filter(([, value]) => value === true)
    );

    const daysToTranslate = Array.from(Object.keys(dayForUse));

    const translatedDays = daysToTranslate.map((e) => {
      if (e === "monday") return "Lunes";
      if (e === "tuesday") return "Martes";
      if (e === "wednesday") return "Miercoles";
      if (e === "thursday") return "Jueves";
      if (e === "friday") return "Viernes";
      if (e === "saturday") return "Sábado";
      if (e === "sunday") return "Domingo";
      if (e === "all") return "Todos";
      return null;
    });
    
    currentSchedule.dia = translatedDays.join(", ");
    currentSchedule.hora_inicial = currentDay.hora_inicial;
    currentSchedule.hora_final = currentDay.hora_final;
    // eslint-disable-next-line react/jsx-no-bind
    currentSchedule.acciones = <ActionButtons id={currentSchedule.scheduleId} savedDays={savedDays.current} currentDay={currentDay} setCurrentDay={setCurrentDay} history={history} historyState={historyState} setHistoryState={setHistoryState} setEditActive={setEditActive} idToUpdate={idToUpdate.current} editActive={editActive} />;
    
    // history.push(currentSchedule);
    // console.log("HISTORIAAAL -> ", history);

    const savedDaysArr = history.map((e) => e.dia);
    console.log("SAVEDDAYS", savedDaysArr);
    if (savedDaysArr.findIndex((e) => e.includes("Domingo")) !== -1) daysHistory.sunday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Lunes")) !== -1) daysHistory.monday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Martes")) !== -1) daysHistory.tuesday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Miercoles")) !== -1) daysHistory.wednesday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Jueves")) !== -1) daysHistory.thursday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Viernes")) !== -1) daysHistory.friday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Sábado")) !== -1) daysHistory.saturday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Todos")) !== -1) daysHistory.all = true;
    // console.log("DAYSHISTORY", daysHistory);

    console.log('SAVEDDAYSANTESDESIIIIII', savedDays);
    // setSavedDays(()=>daysHistory);
    savedDays.current = daysHistory;
    console.log('SAVEDDAYSDESPUESDESIIIIIII', savedDays);
    // console.log("Saved days in days history", savedDays);
    setCurrentDay(initialCheckboxValues);
    console.log("AL FINAL HISTORIAL -> ", history);
    console.log('CURRENT SCHEDULEEE',currentSchedule);

    // setScheduleCounter(prev => prev + 1);

    console.log('HISTORY STATE --->', historyState);

    const newState = historyState.map((e, i, arr) => {

      console.log('Index of element in history', i);
      console.log('Id to be updated', idToUpdate.current);
      console.log('Element in history', e);
      console.log('ScheduleID in element', e?.scheduleId);
      console.log('ScheduleID equal to idToUpdate?', e.scheduleId === idToUpdate.current);
      console.log('Whole array', arr);

      // console.log('Element in history', e[idToUpdate - 1]);

      // if(e[i].scheduleId === idToUpdate){
      if(e.scheduleId === idToUpdate.current){
        return {
          scheduleId: idToUpdate.current,
          dia: currentSchedule.dia,
          hora_inicial: currentSchedule.hora_inicial,
          hora_final: currentSchedule.hora_final,
          acciones: currentSchedule.acciones
        }
      }
      return e;
    });

    console.log('NEWSTATEEE', newState);

    

    // setHistoryState((prev) => [...prev, history]);
    // console.log('POR ESTO ES QUE TRUENA', [...newState]);
    // console.log('POR ESTO ES QUE TRUENA', [newState.flatMap(e => e)][0]);

    // setHistoryState([...newState]);


    // setHistoryState([newState.flatMap(e => e)][0]);

    

    // setHistoryState((prev) => [...prev, newState]);

    console.log('olaCOMOESTAS1', history);
    console.log('olaCOMOESTAS2', historyState);

    // setEditActive(prev => !prev);
    setEditActive(false);
  };

  const handleAddDay = () => {
    // console.log('some',currentDay.some(e => e.includes(true)))
    if (!Object.values(currentDay).includes(true)) {
      return;
    }

    if (currentDay.hora_final === "" || currentDay.hora_inicial === "") {
      return;
    }

    // console.log(Object.values(currentDay));
    console.log(!Object.keys(currentDay).includes(false));

    // let scheduleCounter = 1;

    const currentSchedule = {
      scheduleId: scheduleCounter,
      dia: [],
      hora_inicial: "",
      hora_final: "",
    };

    const dayForUse = Object.fromEntries(
      Object.entries(currentDay).filter(([, value]) => value === true)
    );

    const daysToTranslate = Array.from(Object.keys(dayForUse));

    const translatedDays = daysToTranslate.map((e) => {
      if (e === "monday") return "Lunes";
      if (e === "tuesday") return "Martes";
      if (e === "wednesday") return "Miercoles";
      if (e === "thursday") return "Jueves";
      if (e === "friday") return "Viernes";
      if (e === "saturday") return "Sábado";
      if (e === "sunday") return "Domingo";
      if (e === "all") return "Todos";
      return null;
    });

    currentSchedule.dia = translatedDays.join(", ");
    currentSchedule.hora_inicial = currentDay.hora_inicial;
    currentSchedule.hora_final = currentDay.hora_final;


    history.push(currentSchedule);
    // console.log("HISTORIAAAL -> ", history);

    const savedDaysArr = history.map((e) => e.dia);
    // console.log("SAVEDDAYS", savedDaysArr);
    if (savedDaysArr.findIndex((e) => e.includes("Domingo")) !== -1) daysHistory.sunday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Lunes")) !== -1) daysHistory.monday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Martes")) !== -1) daysHistory.tuesday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Miercoles")) !== -1) daysHistory.wednesday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Jueves")) !== -1) daysHistory.thursday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Viernes")) !== -1) daysHistory.friday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Sábado")) !== -1) daysHistory.saturday = true;
    if (savedDaysArr.findIndex((e) => e.includes("Todos")) !== -1) daysHistory.all = true;
    // console.log("DAYSHISTORY", daysHistory);

    console.log('SAVEDDAYSANTESDESIIIIII', savedDays);
    // setSavedDays(()=>daysHistory);
    savedDays.current = daysHistory;
    console.log('SAVEDDAYSDESPUESDESIIIIIII', savedDays);
    // console.log("Saved days in days history", savedDays);
    setCurrentDay(initialCheckboxValues);
    console.log("AL FINAL HISTORIAL -> ", history);

    console.log(currentSchedule);

    // Checkpoint
    setScheduleCounter(prev => prev + 1);


    setHistoryState((prev) => [...prev, history]);

    currentSchedule.acciones = <ActionButtons id={currentSchedule.scheduleId} savedDays={savedDays.current} currentDay={currentDay} setCurrentDay={setCurrentDay} history={history} historyState={historyState} setHistoryState={setHistoryState} setEditActive={setEditActive} idToUpdate={idToUpdate.current} editActive={editActive}/>;
    console.log('olaCOMOESTAS1', history);
    console.log('olaCOMOESTAS2', historyState);

  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;

    setCurrentDay((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const disabledLabel = {
    color: "#dbdbdc",
  };

  const column = [
    { heading: "Dias", value: "dia" },
    { heading: "Hora Inicio", value: "hora_inicial" },
    { heading: "Hora Final", value: "hora_final" },
    { heading: "Acciones", value: "acciones" }
  ];

  return (
    <Card sx={{ padding: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ alignSelf: "flex-end", justifyContent: "center" }}>
        <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowAdd} />
      </Box>

      <Grid
        container
        sx={{ height: "55vh", width: "100%", paddingRight: "1rem", overflowY: "scroll" }}
      >
        {/* Campos Sucursal */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            gridTemplateRows: "auto",
            gridTemplateAreas: `"nomSuc nomSuc ."
            "nomVialidad int ext"
            "tVialidad loc cp"
            "edo mun col"`,
            width: "100%",
          }}
        >
          <Box sx={{ gridArea: "nomSuc" }}>
            {/* Nombre de Sucursal */}
            <MDBox>
              <FormControl
                variant="standard"
                sx={{ marginBottom: 2, width: "70%" }}
                autoComplete="off"
              >
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Nombre de Sucursal
                </MDTypography>
                <TextField
                  // fullWidth
                  name="nombre_sucursal"
                  value={formValues.nombre_sucursal}
                  onChange={handleInputChange}
                  error={formErrors.nombre_sucursal}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "nomVialidad" }}>
            {/* Nombre vialidad */}
            <MDBox>
              <FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Nombre Vialidad
                </MDTypography>
                <TextField
                  name="nombre_vialidad"
                  value={formValues.nombre_vialidad}
                  onChange={handleInputChange}
                  error={formErrors.nombre_vialidad}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "int" }}>
            {/* Numero Interior */}
            <MDBox>
              <FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Numero Interior
                </MDTypography>
                <TextField
                  name="num_interior"
                  value={formValues.num_interior}
                  onChange={handleInputChange}
                  error={formErrors.num_interior}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "ext" }}>
            {/* Numero Exterior */}
            <MDBox>
              <FormControl variant="standard" fullWidth>
                <MDTypography variant="h6" fontWeight="medium">
                  Numero Exterior
                </MDTypography>
                <TextField
                  name="num_exterior"
                  value={formValues.num_exterior}
                  onChange={handleInputChange}
                  error={formErrors.num_exterior}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "tVialidad" }}>
            {/* Tipo Vialidad */}
            <MDBox>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Tipo Vialidad
                </MDTypography>
                <Select
                  name="tipo_vialidad"
                  value={formValues.tipo_vialidad}
                  onChange={handleInputChange}
                  error={formErrors.tipo_vialidad}
                  onBlur={handleBlur}
                >
                  {
                    allListedRoadTypes.map((roadType) => <MenuItem key={roadType.id} value={roadType.id}>{roadType.tipo}</MenuItem>)
                  }
                </Select>
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "loc" }}>
            {/* Nombre de localidad */}
            <MDBox>
              <FormControl variant="standard" fullWidth>
                <MDTypography variant="h6" fontWeight="medium">
                  Nombre de localidad
                </MDTypography>
                <TextField
                  name="nombre_localidad"
                  value={formValues.nombre_localidad}
                  onChange={handleInputChange}
                  error={formErrors.nombre_localidad}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "cp" }}>
            {/* Nombre de localidad */}
            <MDBox>
              <FormControl variant="standard" fullWidth>
                <MDTypography variant="h6" fontWeight="medium">
                  Código postal
                </MDTypography>
                <TextField
                  name="codigo_postal"
                  value={formValues.codigo_postal}
                  onChange={handleInputChange}
                  error={formErrors.codigo_postal}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "col" }}>
            {/* Colonia */}
            <MDBox>
              <FormControl variant="standard" fullWidth>
                <MDTypography variant="h6" fontWeight="medium">
                  Colonia
                </MDTypography>
                <TextField
                  select
                  name="colonia"
                  value={formValues.colonia}
                  onChange={handleInputChange}
                  error={formErrors.colonia}
                  onBlur={handleBlur}
                  disabled={!formValues.estado || !formValues.municipio}
                >
                  {
                    allListedLocalities.map((locality) =>
                      <MenuItem value={locality.id} key={locality.id}>{locality.nombre}</MenuItem>
                    )
                  }
                </TextField>
              </FormControl>
            </MDBox>
          </Box>
          <Box sx={{ gridArea: "edo" }}>
            {/* Estado */}
            <MDBox>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Estado
                </MDTypography>
                <Select
                  sx={{ width: "fitContent" }}
                  name="estado"
                  value={formValues.estado}
                  onChange={handleInputChange}
                  error={formErrors.estado}
                  onBlur={handleBlur}
                >
                  {allListedStates?.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.nombre_edo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "mun" }}>
            {/* Municipio */}
            <MDBox>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Municipio
                </MDTypography>
                <Select
                  sx={{ width: "fitContent" }}
                  name="municipio"
                  value={formValues.municipio}
                  onChange={handleInputChange}
                  error={formErrors.municipio}
                  onBlur={handleBlur}
                  disabled={!formValues.estado}
                >
                  {allListedCities?.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.nombre_ciud}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
          </Box>
        </Box>

        {/* Horarios Sucursal */}
        {/* <Grid container display="flex" flexDirection="column" sx={{ width: "max-content" }}> */}

        <Grid
          item
          mt={4}
          mb={4}
          sx={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, auto)",
            gridTemplateAreas: `"dActivos dActivos dActivos"
        "hInicial hFinal ."
        ". .  agregar"`,
            columnGap: "2rem",
          }}
        >
          <Box sx={{ gridArea: "dActivos" }}>
            <MDTypography sx={{ marginBottom: 2 }} variant="h6" fontWeight="medium">
              Horario
            </MDTypography>
            <MDBox
              mt={2}
              fullWidth
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.sunday || savedDays.current.all) && disabledLabel}>D</FormLabel>
                <Checkbox
                  name="sunday"
                  checked={currentDay.all || (currentDay.sunday && !savedDays.current.sunday)}
                  onChange={handleChange}
                  disabled={savedDays.current.sunday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.monday || savedDays.current.all) && disabledLabel}>L</FormLabel>
                <Checkbox
                  name="monday"
                  checked={currentDay.all || (currentDay.monday && !savedDays.current.monday)}
                  onChange={handleChange}
                  disabled={savedDays.current.monday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.tuesday || savedDays.current.all) && disabledLabel}>M</FormLabel>
                <Checkbox
                  name="tuesday"
                  checked={currentDay.all || (currentDay.tuesday && !savedDays.current.tuesday)}
                  onChange={handleChange}
                  disabled={savedDays.current.tuesday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.wednesday || savedDays.current.all) && disabledLabel}>
                  MI
                </FormLabel>
                <Checkbox
                  name="wednesday"
                  checked={currentDay.all || (currentDay.wednesday && !savedDays.current.wednesday)}
                  onChange={handleChange}
                  disabled={savedDays.current.wednesday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.thursday || savedDays.current.all) && disabledLabel}>J</FormLabel>
                <Checkbox
                  name="thursday"
                  checked={currentDay.all || (currentDay.thursday && !savedDays.current.thursday)}
                  onChange={handleChange}
                  disabled={savedDays.current.thursday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.friday || savedDays.current.all) && disabledLabel}>V</FormLabel>
                <Checkbox
                  name="friday"
                  checked={currentDay.all || (currentDay.friday && !savedDays.current.friday)}
                  onChange={handleChange}
                  disabled={savedDays.current.friday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={(savedDays.current.saturday || savedDays.current.all) && disabledLabel}>S</FormLabel>
                <Checkbox
                  name="saturday"
                  checked={currentDay.all || (currentDay.saturday && !savedDays.current.saturday)}
                  onChange={handleChange}
                  disabled={savedDays.current.saturday || savedDays.current.all}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel
                  sx={
                    (savedDays.current.monday ||
                      savedDays.current.tuesday ||
                      savedDays.current.wednesday ||
                      savedDays.current.thursday ||
                      savedDays.current.friday ||
                      savedDays.current.saturday ||
                      savedDays.current.sunday ||
                      savedDays.current.all) &&
                    disabledLabel
                  }
                >
                  Todos
                </FormLabel>
                <Checkbox
                  name="all"
                  checked={currentDay.all}
                  disabled={
                    savedDays.current.monday ||
                    savedDays.current.tuesday ||
                    savedDays.current.wednesday ||
                    savedDays.current.thursday ||
                    savedDays.current.friday ||
                    savedDays.current.saturday ||
                    savedDays.current.sunday ||
                    savedDays.current.all
                  }
                  onChange={({ target: { checked: all } }) =>
                    setCurrentDay(() => (all ? { all } : { initialCheckboxValues }))
                  }
                />
              </Box>
            </MDBox>
          </Box>

          <Box sx={{ gridArea: "hInicial" }}>
            <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
              Hora inicial
            </MDTypography>

            <TextField
              fullWidth
              ampm={false}
              name="hora_inicial"
              type="time"
              value={currentDay.hora_inicial}
              onChange={handleScheduleChange}
              disabled={
                (savedDays.current.monday &&
                  savedDays.current.tuesday &&
                  savedDays.current.wednesday &&
                  savedDays.current.thursday &&
                  savedDays.current.friday &&
                  savedDays.current.saturday &&
                  savedDays.current.sunday) ||
                savedDays.current.all
              }
              // error={currentDay.hora_inicial}
              onBlur={handleBlur}
            />
          </Box>
          <Box sx={{ gridArea: "hFinal" }}>
            <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
              Hora final
            </MDTypography>
            <TextField
              fullWidth
              name="hora_final"
              type="time"
              value={currentDay.hora_final}
              onChange={handleScheduleChange}
              disabled={
                (savedDays.current.monday &&
                  savedDays.current.tuesday &&
                  savedDays.current.wednesday &&
                  savedDays.current.thursday &&
                  savedDays.current.friday &&
                  savedDays.current.saturday &&
                  savedDays.current.sunday) ||
                savedDays.current.all
              }
              // error={currentDay.hora_final}
              onBlur={handleBlur}
            />
          </Box>
          <Button
            sx={{
              gridArea: "agregar",
              color: "#FFF",
              height: "max-content",
              width: "max-content",
              justifySelf: "flex-end",
            }}
            disabled={
              (savedDays.current.monday &&
                savedDays.current.tuesday &&
                savedDays.current.wednesday &&
                savedDays.current.thursday &&
                savedDays.current.friday &&
                savedDays.current.saturday &&
                savedDays.current.sunday) ||
              savedDays.current.all
            }
            variant="contained"
            onClick={editActive? handleUpdateDay: handleAddDay}
          >
            Agregar
          </Button>

          {/* <Table data={area} column={column} /> */}
        </Grid>
        <Box style={{ marginBottom: "1rem" }}>

          <ScheduleTable data={historyState.flatMap((e) => e)} column={column.flatMap((e) => e)} />
          {/* <MemoizedScheduleTable data={historyState.flatMap((e) => e)} column={column.flatMap((e) => e)} /> */}
        </Box>
      </Grid>

      <Box sx={{ alignSelf: "flex-end", marginTop: "1rem" }}>
        <MDButton mx={2} color="info" onClick={handleSubmit}>
          Agregar Sucursales
        </MDButton>

        <MDButton sx={{ marginLeft: 1 }} color="info" onClick={handleClick}>
          Cancelar
        </MDButton>
      </Box>
    </Card>
  );
}

export function ActionButtons({ id, savedDays, currentDay, setCurrentDay, history, historyState, setHistoryState, setEditActive, idToUpdate, editActive}) {
  const handleEdit = () => {
    // console.log(setEditActive);
    setEditActive(true);
    console.log('EDIT CLICKED');
    console.log('EDITAR ACTIVO????',editActive);
  };

  const handleClick = () => {
    handleEdit();

    // console.log('historyState IN ACTION BUTONNNNNNNNNNNNNNNNNNNNNNNNNN', historyState);
    console.log('ID ->', id);
    // setIdToUpdate(id);
    // eslint-disable-next-line no-param-reassign
    idToUpdate = id;
    const value = history.filter(e => e.scheduleId === id)[0];
    const { dia } = value;

    const activeDays = [];

    if (dia.includes('Domingo')) activeDays.push('sunday');
    if (dia.includes('Lunes')) activeDays.push('monday');
    if (dia.includes('Martes')) activeDays.push('tuesday');
    if (dia.includes('Miercoles')) activeDays.push('wednesday');
    if (dia.includes('Jueves')) activeDays.push('thursday');
    if (dia.includes('Viernes')) activeDays.push('friday');
    if (dia.includes('Sábado')) activeDays.push('saturday');

    // console.log('BYVALUE', activeDays);

    // eslint-disable-next-line no-useless-computed-key
    const activateCheckbox = (name) => {
      setCurrentDay({ ...currentDay, [name]: true });
      // eslint-disable-next-line no-param-reassign
      savedDays[name] = false;
    }

    activeDays.forEach((e) => activateCheckbox(e));

    // setHistoryState({
    //   ...history, 0: {
    //     dia: "si",
    //     hora_inicial: "si",
    //     hora_final: "si"
    //   }
    // });

    // const newState = history?.map(e => {
    //   if (e.scheduleId === id) {
    //     return { dia: "si", hora_inicial: currentDay.hora_inicial, hora_final: currentDay.hora_final }
    //   }
    //   return e;
    // });

    // const prev = history[0];
    // const next = newState[0];

    // console.log({...prev, ...next});

    // setHistoryState( [{ ...prev, ...next }] );

    // console.log('QUEPEDOOO 0',[{ ...historyState }]);
    // console.log('PREVIOUSSSSSSSSSSS', history);
    // console.log('QUEPEDOOO',[{ ...prev, ...next }]);
    // // setHistoryState( [{ ...history, ...newState }] );
    // console.log('POR ESTO ES QUE TRUENAA',historyState);




    // setHistoryState({...history, updateValue});
    // setHistoryState({...historyState, updateValue});

    // eslint-disable-next-line consistent-return, array-callback-return

    // setHistoryState(prev => ({...prev, [id]: {
    //   dia: 'Si',
    //   hora_inicial: currentDay.hora_inicial,
    //   hora_final: currentDay.hora_final
    // }}));
    console.log(currentDay);

  };
  const handleDelete = () => { };

  return <div style={{ display: "flex", justifyContent: "space-evenly" }}>
    <FontAwesomeIcon icon={faPenToSquare} size='md' onClick={handleClick} style={actionButton} />
    <FontAwesomeIcon icon={faTrash} size='md' style={actionButton} onClick={handleDelete} />
  </div>
};