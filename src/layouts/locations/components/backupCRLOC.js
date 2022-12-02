/* eslint-disable react/prop-types */
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";

// // eslint-disable-next-line react/prop-types
// function Table({ data, column }) {
//   return (
//     <table className="org-table">
//       <thead>
//         <tr>
//           {column.map((item) => (
//             <TableHeadItem item={item} />
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item) => (
//           <TableRow item={item} column={column} />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function TableHeadItem({ item }) {
//   return <th>{item.heading}</th>;
// }

// // eslint-disable-next-line react/prop-types
// function TableRow({ item, column }) {
//   console.log('Item -> ',item)
//   console.log('Column -> ',column)
//   // return (
//   //   <tr>
//   //     {column.map((columnItem) => {
//   //       if (columnItem.value.includes(".")) {
//   //         const itemSplit = columnItem.value.split(".");
//   //         return <td>{item[itemSplit[0]][itemSplit[1]]}</td>;
//   //       }

//   //       return <td>{item[`${columnItem.value}`]}</td>;
//   //     })}
//   //   </tr>
//   // );
// }

const history = [];
let savedDays2 = {};

export default function LocationForm({ handleShowAdd }) {
  const initialFormValues = {
    nombre_sucursal: "",
    // direccion: "",

    nombre_vialidad: "",
    num_exterior: "",
    num_interior: "",
    tipo_vialidad: "",
    colonia: "",
    nombre_localidad: "",
    estado: "",
    municipio: "",

    he_lunes: "",
    he_martes: "",
    he_miercoles: "",
    he_jueves: "",
    he_viernes: "",
    he_sabado: "",
    he_domingo: "",
    hs_lunes: "",
    hs_martes: "",
    hs_miercoles: "",
    hs_jueves: "",
    hs_viernes: "",
    hs_sabado: "",
    hs_domingo: "",
  };

  const initialValues = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
    all: false,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState("");

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

    if (val.he_lunes && !val.hs_lunes) errors.lunes = true;
    if (val.he_martes && !val.hs_martes) errors.martes = true;
    if (val.he_miercoles && !val.hs_miercoles) errors.miercoles = true;
    if (val.he_jueves && !val.hs_jueves) errors.jueves = true;
    if (val.he_viernes && !val.hs_viernes) errors.viernes = true;
    if (val.he_sabado && !val.hs_sabado) errors.sabado = true;
    if (val.he_domingo && !val.hs_domingo) errors.domingo = true;
    if (!val.he_lunes && val.hs_lunes) errors.lunes = true;
    if (!val.he_martes && val.hs_martes) errors.martes = true;
    if (!val.he_miercoles && val.hs_miercoles) errors.miercoles = true;
    if (!val.he_jueves && val.hs_jueves) errors.jueves = true;
    if (!val.he_viernes && val.hs_viernes) errors.viernes = true;
    if (!val.he_sabado && val.hs_sabado) errors.sabado = true;
    if (!val.he_domingo && val.hs_domingo) errors.domingo = true;

    if (
      !val.he_lunes &&
      !val.he_martes &&
      !val.he_miercoles &&
      !val.he_jueves &&
      !val.he_viernes &&
      !val.he_sabado &&
      !val.he_domingo
    ) {
      errors.he = true;
    }

    if (
      !val.hs_lunes &&
      !val.hs_martes &&
      !val.hs_miercoles &&
      !val.hs_jueves &&
      !val.hs_viernes &&
      !val.hs_sabado &&
      !val.hs_domingo
    ) {
      errors.hs = true;
    }

    return errors;
  };

  const handleSubmit = () => {
    const newTest = {
      nombre_sucursal: formValues.nombre_sucursal,
      direccion: {
        nombre_vialidad: formValues.nombre_vialidad,
        numero_interior: formValues.num_interior,
        numero_exterior: formValues.num_exterior,
        tipo_vialidad: formValues.tipo_vialidad,
        colonia: formValues.colonia,
        nombre_localidad: formValues.nombre_localidad,
        estado: formValues.estado,
        municipio: formValues.municipio,
      },
      horarios_entrada: {
        he_lunes: formValues.he_lunes,
        he_martes: formValues.he_martes,
        he_miercoles: formValues.he_miercoles,
        he_jueves: formValues.he_jueves,
        he_viernes: formValues.he_viernes,
        he_sabado: formValues.he_sabado,
        he_domingo: formValues.he_domingo,
      },
      horarios_salida: {
        hs_lunes: formValues.hs_lunes,
        hs_martes: formValues.hs_martes,
        hs_miercoles: formValues.hs_miercoles,
        hs_jueves: formValues.hs_jueves,
        hs_viernes: formValues.hs_viernes,
        hs_sabado: formValues.hs_sabado,
        hs_domingo: formValues.hs_domingo,
      },
    };

    console.log(newTest);

    if (!Object.values(validate(formValues)).includes(true)) {
      // console.log("No hay errores en el formulario :D");

      const newLocation = {
        nombre_sucursal: formValues.nombre_sucursal,
        direccion: {
          nombre_vialidad: formValues.nombre_vialidad,
          numero_interior: formValues.num_interior,
          numero_exterior: formValues.num_exterior,
          tipo_vialidad: formValues.tipo_vialidad,
          colonia: formValues.colonia,
          nombre_localidad: formValues.nombre_localidad,
          estado: formValues.estado,
          municipio: formValues.municipio,
        },
        horarios_entrada: {
          he_lunes: formValues.he_lunes,
          he_martes: formValues.he_martes,
          he_miercoles: formValues.he_miercoles,
          he_jueves: formValues.he_jueves,
          he_viernes: formValues.he_viernes,
          he_sabado: formValues.he_sabado,
          he_domingo: formValues.he_domingo,
        },
        horarios_salida: {
          hs_lunes: formValues.hs_lunes,
          hs_martes: formValues.hs_martes,
          hs_miercoles: formValues.hs_miercoles,
          hs_jueves: formValues.hs_jueves,
          hs_viernes: formValues.hs_viernes,
          hs_sabado: formValues.hs_sabado,
          hs_domingo: formValues.hs_domingo,
        },
      };

      console.log(newLocation);

      // fetch("http://localhost:8000/locations", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newLocation),
      // }).then(() => {
      //   console.log("New location added :");
      // });

      // setFormValues(initialFormValues);
    }

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

    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
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
  };

  // const validateCheckboxes = (val) => {
  //   const errors = {};

  //   if (!Object.values(val).includes(true)) {
  //     errors.err = true;
  //   }

  //   return errors;
  // };

  const [values, setValues] = useState(initialCheckboxValues);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
    // handleInputChange(values);
  };

  const initialCurrentDay = {
    dia: [],
    hora_inicial: "",
    hora_final: "",
  };
  // eslint-disable-next-line no-unused-vars
  const [currentDay, setCurrentDay] = useState(initialCurrentDay);
  const currentSchedule = {
    dia: [],
    hora_inicial: "",
    hora_final: "",
  };

  // eslint-disable-next-line no-unused-vars
  const [savedDays, setSavedDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const handleAddDay = () => {
    // const dayForUse = objectMap(values, (e) => Object.values(e) === true);
    const dayForUse = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value === true)
    );

    console.log('DAYSFORUSE -> ', dayForUse);
    currentSchedule.dia = dayForUse;
    history.push(currentSchedule);

    // [currentSchedule.dia,] = Object.keys(dayForUse).flatMap(e => e);


    console.log('history', history);
    const daysHistory = history.map((e) => e.dia);
    const searchForActive = daysHistory.slice();
    const activeDays = searchForActive.map((e) => Object.keys(e)).flatMap((e) => e);

    const currentSavedDays = {};

    if (activeDays.indexOf("sunday") > -1) currentSavedDays.sunday = true;
    if (activeDays.indexOf("monday") > -1) currentSavedDays.monday = true;
    if (activeDays.indexOf("tuesday") > -1) currentSavedDays.tuesday = true;
    if (activeDays.indexOf("wednesday") > -1) currentSavedDays.wednesday = true;
    if (activeDays.indexOf("thursday") > -1) currentSavedDays.thursday = true;
    if (activeDays.indexOf("friday") > -1) currentSavedDays.friday = true;
    if (activeDays.indexOf("saturday") > -1) currentSavedDays.saturday = true;

    savedDays2 = currentSavedDays;
    setSavedDays(currentSavedDays);
    // console.log(savedDays);

    // El estado inicializa con {}, por lo tanto está desfazado, por lo mismo es que se usa mejor una variable en vez d eun estado, para que así sea en tiempo real y no tener que vovler a actualizar el estado para que se actualice
    console.log("Saved days (State) -> ", savedDays);
    console.log("Saved days (Static) -> ", savedDays2);
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


  // const column = [
  //   { heading: "Dia", value: "dia" },
  //   { heading: "Hora Inicial", value: "hora_inicial" },
  //   { heading: "Hora Final", value: "hora_final" },
  // ];

  // const scheduleData = Object.fromEntries(
  //   Object.entries(savedDays2).filter(([key]) => key)
  // );

  // const scheduleData = Object.keys(savedDays2);
  const scheduleData = Object.keys(savedDays2);
  // const scheduleData = savedDays2;

  console.log("scheduleData", scheduleData);

  return (
    <Card sx={{ padding: 2, display: "flex", flexDirection: "column", overflowY: "scroll" }}>
      <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowAdd} />
      <Grid
        container
        sx={{ height: "55vh", width: "min-content", paddingRight: "2rem" }}
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
            "tVialidad loc col"
            "edo mun ."`,
            width: "max-content",
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
                  <MenuItem key="calle" value="calle">
                    Calle
                  </MenuItem>
                  <MenuItem key="avenida" value="avenida">
                    Avenida
                  </MenuItem>
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

          <Box sx={{ gridArea: "col" }}>
            {/* Colonia */}
            <MDBox>
              <FormControl variant="standard" fullWidth>
                <MDTypography variant="h6" fontWeight="medium">
                  Colonia
                </MDTypography>
                <TextField
                  name="colonia"
                  value={formValues.colonia}
                  onChange={handleInputChange}
                  error={formErrors.colonia}
                  onBlur={handleBlur}
                />
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="nuevo leon">Monterrey</MenuItem>
                  <MenuItem value="sinaloa">San Pedro Garza García</MenuItem>
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
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="monterrey">Monterrey</MenuItem>
                  <MenuItem value="sanpedro">San Pedro Garza García</MenuItem>
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
                <FormLabel sx={savedDays.sunday && disabledLabel}>D</FormLabel>
                <Checkbox
                  name="sunday"
                  checked={values.all || (values.sunday && !savedDays.sunday)}
                  onChange={handleChange}
                  disabled={savedDays2.sunday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.monday && disabledLabel}>L</FormLabel>
                <Checkbox
                  name="monday"
                  checked={values.all || (values.monday && !savedDays.monday)}
                  onChange={handleChange}
                  disabled={savedDays2.monday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.tuesday && disabledLabel}>M</FormLabel>
                <Checkbox
                  name="tuesday"
                  checked={values.all || (values.tuesday && !savedDays.tuesday)}
                  onChange={handleChange}
                  disabled={savedDays2.tuesday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.wednesday && disabledLabel}>MI</FormLabel>
                <Checkbox
                  name="wednesday"
                  checked={values.all || (values.wednesday && !savedDays.wednesday)}
                  onChange={handleChange}
                  disabled={savedDays2.wednesday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.thursday && disabledLabel}>J</FormLabel>
                <Checkbox
                  name="thursday"
                  checked={values.all || (values.thursday && !savedDays.thursday)}
                  onChange={handleChange}
                  disabled={savedDays2.thursday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.friday && disabledLabel}>V</FormLabel>
                <Checkbox
                  name="friday"
                  checked={values.all || (values.friday && !savedDays.friday)}
                  onChange={handleChange}
                  disabled={savedDays2.friday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel sx={savedDays.saturday && disabledLabel}>S</FormLabel>
                <Checkbox
                  name="saturday"
                  checked={values.all || (values.saturday && !savedDays.saturday)}
                  onChange={handleChange}
                  disabled={savedDays2.saturday}
                />
              </Box>
              <Box className="flexColCtr">
                <FormLabel
                  sx={
                    (savedDays.monday ||
                      savedDays.tuesday ||
                      savedDays.wednesday ||
                      savedDays.thursday ||
                      savedDays.friday ||
                      savedDays.saturday ||
                      savedDays.sunday) &&
                    disabledLabel
                  }
                >
                  Todos
                </FormLabel>
                <Checkbox
                  checked={values.all}
                  onChange={({ target: { checked: all } }) =>
                    setValues(() => (all ? { all } : { initialValues }))
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
              name="hora_inicial"
              type="time"
              value={currentDay.hora_inicial}
              onChange={handleScheduleChange}
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
            variant="contained"
            onClick={handleAddDay}
          >
            Agregar
          </Button>
        </Grid>
        {/* <Table data={scheduleData} column={column} /> */}

        {/* Horario de Entrada */}
        {/* <Grid item>              
              <TextField
                type="time"
                name="he_martes"
                value={formValues.he_martes}
                onChange={handleInputChange}
                error={formErrors.he_martes}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="he_miercoles"
                value={formValues.he_miercoles}
                onChange={handleInputChange}
                error={formErrors.he_miercoles}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="he_jueves"
                value={formValues.he_jueves}
                onChange={handleInputChange}
                error={formErrors.he_jueves}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="he_viernes"
                value={formValues.he_viernes}
                onChange={handleInputChange}
                error={formErrors.he_viernes}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="he_sabado"
                value={formValues.he_sabado}
                onChange={handleInputChange}
                error={formErrors.he_sabado}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="he_domingo"
                value={formValues.he_domingo}
                onChange={handleInputChange}
                error={formErrors.he_domingo}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
            </MDBox>
          </MDBox>
        </Grid> */}

        {/* Horario de Salida */}
        {/* <Grid item>
          <MDBox mt={2} mb={4}>
            <FormLabel className="block">Horario de salida</FormLabel>
            <MDBox sx={{ display: "flex", justifyContent: "space-around" }}>
              <MDButton disabled>L</MDButton>
              <MDButton disabled>M</MDButton>
              <MDButton disabled>M</MDButton>
              <MDButton disabled>J</MDButton>
              <MDButton disabled>V</MDButton>
              <MDButton disabled>S</MDButton>
              <MDButton disabled>D</MDButton>
            </MDBox>
            <MDBox>
              <TextField
                type="time"
                name="hs_lunes"
                value={formValues.hs_lunes}
                onChange={handleInputChange}
                error={formErrors.hs_lunes}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_martes"
                value={formValues.hs_martes}
                onChange={handleInputChange}
                error={formErrors.hs_martes}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_miercoles"
                value={formValues.hs_miercoles}
                onChange={handleInputChange}
                error={formErrors.hs_miercoles}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_jueves"
                value={formValues.hs_jueves}
                onChange={handleInputChange}
                error={formErrors.hs_jueves}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_viernes"
                value={formValues.hs_viernes}
                onChange={handleInputChange}
                error={formErrors.hs_viernes}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_sabado"
                value={formValues.hs_sabado}
                onChange={handleInputChange}
                error={formErrors.hs_sabado}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
              <TextField
                type="time"
                name="hs_domingo"
                value={formValues.hs_domingo}
                onChange={handleInputChange}
                error={formErrors.hs_domingo}
                onBlur={handleBlur}
                sx={{ width: "14.2857142857%" }}
              />
            </MDBox>
          </MDBox>
        </Grid> */}
        {/* </Grid> */}
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
