import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";

import {
  Card,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { FormGroup } from "@material-ui/core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const initialFormValues = {
  nombre: "",
  ap_paterno: "",
  ap_materno: "",
  telefono: "",
  area: "",
  sucursal: "",
  rfc: "",
  curp: "",
  // nombre_comercial: "",
  nombre_vialidad: "",
  num_exterior: "",
  num_interior: "",
  tipo_vialidad: "",
  colonia: "",
  nombre_localidad: "",
  estado: "",
  municipio: "",
  correo: "",
  contrasena: "",
  conf_contrasena: "",
  usuario: false,
};

function ValidateEmail(mail) {
  // eslint-disable-next-line no-useless-escape
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  alert("Email invalido");
  return false;
}

function ValidatePassword(password) {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter,
  // one number and one special character:

  const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (password.search(pass) === 0) {
    return true;
  }

  alert(
    "Favor de introducir mínimo 8 caracteres, 1 letra mayúscula, 1 letra minúscula, 1 número y 1 caracter especial"
  );
  return false;
}

// eslint-disable-next-line react/prop-types, no-unused-vars
function UpdatePersonal({ idToUpdate, handleShowEdit, handleRefresh, employeeIsUser }) {
  const [formValues, setFormValues] = useState(initialFormValues);

  console.log('ID TO UPDATE IN UPDATE PERSONAL -> ', idToUpdate);
  console.log('EMPLOYEE IS USER IN UPDATE PERSONAL -> ', employeeIsUser);

  const [isUser, setIsUser] = useState(false);


  useEffect(() => {
    if (employeeIsUser) {
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php?id=${idToUpdate}&isUser=1`)
        .then((response) => {
          const { data } = response;
          const { personal: p } = data;
          console.log('Personal IF USER -> ', p[0]);

          setFormValues({
            nombre: p[0].nombre,
            ap_paterno: p[0].ap_paterno,
            ap_materno: p[0].ap_materno,
            telefono: p[0].telefono,
            area: p[0].id_area,
            sucursal: p[0].id_sucursal,
            rfc: p[0].rfc,
            curp: p[0].curp,
            nombre_vialidad: p[0].nombre_vialidad,
            num_exterior: p[0].numero_ext,
            num_interior: p[0].numero_int,
            tipo_vialidad: p[0].tipo_vialidad,
            colonia: p[0].colonia,
            nombre_localidad: p[0].nombre_localidad,
            estado: p[0].id_edo,
            municipio: p[0].id_ciudad,
            correo: p[0].correo,
            contrasena: p[0].contrasena,
            conf_contrasena: p[0].contrasena,
            usuario: true,
          });

          setIsUser(true);

        })
        .catch((err) => console.log(err));
    } else {
      axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/read.php?id=${idToUpdate}`)
        .then((response) => {
          const { data } = response;
          const { personal: p } = data;
          console.log('Personal IF USER -> ', p[0]);

          setFormValues({
            nombre: p[0].nombre,
            ap_paterno: p[0].ap_paterno,
            ap_materno: p[0].ap_materno,
            telefono: p[0].telefono,
            area: p[0].id_area,
            sucursal: p[0].id_sucursal,
            rfc: p[0].rfc,
            curp: p[0].curp,
            nombre_vialidad: p[0].nombre_vialidad,
            num_exterior: p[0].numero_ext,
            num_interior: p[0].numero_int,
            tipo_vialidad: p[0].tipo_vialidad,
            colonia: p[0].colonia,
            nombre_localidad: p[0].nombre_localidad,
            estado: p[0].id_edo,
            municipio: p[0].id_ciudad,
            correo: '',
            contrasena: '',
            conf_contrasena: '',
            usuario: false,
          });
        })
        .catch((err) => console.log(err));
    }

  }, []);

  const [areaValues, setAreaValues] = useState(null);
  const [locationValues, setLocationValues] = useState(null);

  const [allListedStates, setAllListedStates] = useState([]);
  const [allListedCities, setAllListedCities] = useState([]);
  const [allListedRoadTypes, setAllListedRoadTypes] = useState([]);
  const [allListedLocations, setAllListedLocations] = useState([]);
  const [allListedAreas, setAllListedAreas] = useState([]);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php")
      .then((resp) => {
        const { data } = resp;
        const { estado } = data;
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
      .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php")
      .then((resp) => {
        const { data } = resp;
        const { tipo_vialidad } = data;
        setAllListedRoadTypes(tipo_vialidad);
        console.log(allListedRoadTypes);
      })
      .catch();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php`)
      .then((resp) => {
        const { data } = resp;
        const { sucursal } = data;
        setAllListedLocations(sucursal);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${formValues.sucursal}`)
      .then((resp) => {
        const { data } = resp;
        const { organigrama } = data;
        setAllListedAreas(organigrama);
      })
      .catch((error) => console.error(error));
  }, [formValues.sucursal]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("http://localhost:8000/orgdata", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((d) => {
        // setIsPending(false);
        setAreaValues(d);
        // setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // eslint-disable-next-line no-console
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          // setIsPending(false);
          // setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, []);

  const allAreas = areaValues?.map((p) => p.nombre_area);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch("http://localhost:8000/locations", { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((d) => {
        // setIsPending(false);
        setLocationValues(d);
        // setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          // eslint-disable-next-line no-console
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          // setIsPending(false);
          // setError(err.message);
        }
      });

    // console.log(`OLAAAAA ${data}`);

    return () => abortCont.abort();
  }, []);


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

  const validate = (val) => {
    const errors = {};
    if (!val.nombre) errors.nombre = true;
    if (!val.ap_paterno) errors.ap_paterno = true;
    if (!val.ap_materno) errors.ap_materno = true;

    if (isUser) {
      if (!val.correo) errors.correo = true;
      if (!ValidateEmail(val.correo)) errors.correo = true;
      if (!val.contrasena) errors.contrasena = true;
      if (!val.conf_contrasena) errors.conf_contrasena = true;

      if (!ValidatePassword(val.contrasena)) errors.contrasena = true;

      if (ValidatePassword(val.contrasena)) {
        if (val.contrasena !== val.conf_contrasena) {
          errors.conf_contrasena = true;
          alert("Las contraseñas no son iguales");
        }
      }
    }

    if (!val.telefono) errors.telefono = true;
    if (!val.area) errors.area = true;
    if (!val.rfc) errors.rfc = true;
    if (!val.curp) errors.curp = true;
    if (!val.sucursal) errors.sucursal = true;

    // if (!val.nombre_comercial) errors.nombre_comercial = true;
    if (!val.nombre_vialidad) errors.nombre_vialidad = true;
    if (!val.num_exterior) errors.num_exterior = true;
    if (!val.tipo_vialidad) errors.tipo_vialidad = true;
    if (!val.colonia) errors.colonia = true;
    if (!val.nombre_localidad) errors.nombre_localidad = true;
    if (!val.estado) errors.estado = true;
    if (!val.municipio) errors.municipio = true;

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (!Object.values(formErrors).includes(true)) {
      const newPerson = formValues.usuario ? {
        nombre: formValues.nombre,
        ap_paterno: formValues.ap_paterno,
        ap_materno: formValues.ap_materno,
        telefono: formValues.telefono,
        area: formValues.area,
        rfc: formValues.rfc,
        curp: formValues.curp,
        sucursal: formValues.sucursal,
        // nombreComercial: formValues.nombre_comercial,zz
        nombre_vialidad: formValues.nombre_vialidad,
        numero_interior: formValues.num_interior === '' ? null : formValues.num_exterior,
        numero_exterior: formValues.num_exterior,
        tipo_vialidad: formValues.tipo_vialidad,
        colonia: formValues.colonia,
        nombre_localidad: formValues.nombre_localidad,
        estado: formValues.estado,
        municipio: formValues.municipio,
        usuario: 1,
        correo: formValues.correo,
        contrasena: formValues.contrasena,
        id: idToUpdate
      } : {
        nombre: formValues.nombre,
        ap_paterno: formValues.ap_paterno,
        ap_materno: formValues.ap_materno,
        telefono: formValues.telefono,
        area: formValues.area,
        rfc: formValues.rfc,
        curp: formValues.curp,
        sucursal: formValues.sucursal,
        // nombreComercial: formValues.nombre_comercial,
        nombre_vialidad: formValues.nombre_vialidad,
        numero_interior: formValues.num_interior,
        numero_exterior: formValues.num_exterior,
        tipo_vialidad: formValues.tipo_vialidad,
        colonia: formValues.colonia,
        nombre_localidad: formValues.nombre_localidad,
        estado: formValues.estado,
        municipio: formValues.municipio,

        usuario: formValues.usuario ? 1 : null, 
        correo: formValues.correo ? formValues : null,
        contrasena: formValues.contrasena ? formValues : null,

        id: idToUpdate
      };

      console.log(newPerson);

      if(!employeeIsUser && formValues.usuario){
        axios
        .patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/update.php?id=${idToUpdate}&employeeToUser=1`, {
          newPerson,
        })
        .then((response) => console.log("ENVIADO AHHHHHHHHHH!", response))
        .catch((error) => console.log(error));
      } else if(!employeeIsUser){
        axios
          .patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/update.php?id=${idToUpdate}&isUser=1`, {
            newPerson,
          })
          .then((response) => console.log("ENVIADO AHHHHHHHHHH!", response))
          .catch((error) => console.log(error));
      } else {
        axios.patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/personal/update.php?id=${idToUpdate}`, {
          newPerson
        })
          .then((response) => console.log('ENVIADO AHHHHHHHHHH!', response))
          .catch(error => console.log(error))
      }


      // fetch("http://localhost:8000/personal", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newPerson),
      // }).then(() => {
      //   console.log("New mandate added :D");
      // });

      // handleRefresh();
      // handleShowCreate();
      // setFormValues(initialFormValues);
    }
  };

  const handleUser = () => {
    setIsUser((current) => !current);
    setFormValues((v) => ({
      ...v,
      usuario: !isUser,
    }));
  };

  return (
    <Card sx={{ padding: 4, maxHeight: "80vh" }}>
      {/* <Box sx={{display: "flex", alignSelf: "flex-end", position: "fixed"}}>
        <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowCreate} />
      </Box> */}

      <Box sx={{ alignSelf: "flex-end", justifyContent: "center" }}>
        <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowEdit} />
      </Box>

      <Box sx={{ overflowY: "scroll", paddingRight: "1rem" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Identificacion */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MDTypography variant="h4" mb={2}>
              Identificación
            </MDTypography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, 1fr)",
                gridTemplateAreas: `"nombre nombre apPaterno apMaterno"
        "rfc rfc curp curp"
        "suc suc area area"
        "tel . . ."`,
                gap: "1rem",
              }}
            >
              {/* Nombre */}
              <Box sx={{ gridArea: "nombre" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Nombre
                </MDTypography>
                <TextField
                  fullWidth
                  name="nombre"
                  value={formValues.nombre}
                  onChange={handleInputChange}
                  error={formErrors.nombre}
                  onBlur={handleBlur}
                />
              </Box>

              {/* Apellido Paterno */}
              <Box sx={{ gridArea: "apPaterno" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Apellido Paterno
                </MDTypography>
                <TextField
                  name="ap_paterno"
                  value={formValues.ap_paterno}
                  onChange={handleInputChange}
                  error={formErrors.ap_paterno}
                  onBlur={handleBlur}
                />
              </Box>

              {/* Apellido Materno */}
              <Box sx={{ gridArea: "apMaterno" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Apellido Materno
                </MDTypography>
                <TextField
                  name="ap_materno"
                  value={formValues.ap_materno}
                  onChange={handleInputChange}
                  error={formErrors.ap_materno}
                  onBlur={handleBlur}
                />
              </Box>

              {/* RFC */}
              <Box sx={{ gridArea: "rfc" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  RFC
                </MDTypography>
                <TextField
                  name="rfc"
                  value={formValues.rfc}
                  onChange={handleInputChange}
                  error={formErrors.rfc}
                  onBlur={handleBlur}
                />
              </Box>

              {/* CURP */}
              <Box sx={{ gridArea: "curp" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  CURP
                </MDTypography>
                <TextField
                  name="curp"
                  value={formValues.curp}
                  onChange={handleInputChange}
                  error={formErrors.curp}
                  onBlur={handleBlur}
                />
              </Box>

              {/* Area */}
              <Box sx={{ gridArea: "area" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Area
                </MDTypography>
                <Select
                  fullWidth
                  name="area"
                  value={formValues.area}
                  onChange={handleInputChange}
                  error={formErrors.area}
                  onBlur={handleBlur}
                  disabled={!formValues.sucursal}
                >
                  {/* allAreas?.map(area => <MenuItem key={area} value={area}>{area}</MenuItem>)   */}
                  {allListedAreas?.map(e => <MenuItem key={e.id} value={e.id}>{e.nombre_area}</MenuItem>)}
                </Select>
              </Box>

              {/* Sucursal */}
              <Box sx={{ gridArea: "suc" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Sucursal
                </MDTypography>
                <Select
                  fullWidth
                  name="sucursal"
                  value={formValues.sucursal}
                  onChange={handleInputChange}
                  error={formErrors.sucursal}
                  onBlur={handleBlur}
                >
                  {
                    allListedLocations.map(e => (
                      <MenuItem key={e.id} value={e.id}>{e.nombre}</MenuItem>
                    ))
                  }
                </Select>
              </Box>

              {/* Telefono */}
              <Box sx={{ gridArea: "tel" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Telefono
                </MDTypography>
                <TextField
                  name="telefono"
                  value={formValues.telefono}
                  onChange={handleInputChange}
                  error={formErrors.telefono}
                  onBlur={handleBlur}
                />
              </Box>
            </Box>
          </Box>

          {/* Ubicación */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <MDTypography variant="h4" mb={2}>
              Ubicación
            </MDTypography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gridAreas: `"nomVialidad nInt nExt" "tVialidad nomLoc col" "edo mun ."`,
                gap: "1rem",
              }}
            >
              {/* Nombre Vialidad */}
              <Box sx={{ gridArae: "nomVialidad" }}>
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
              </Box>

              {/* Numero Interior */}
              <Box sx={{ gridArae: "nInt" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Numero Interior
                </MDTypography>
                <TextField
                  name="num_interior"
                  value={formValues.num_interior}
                  onChange={handleInputChange}
                // error={formErrors.num_interior}
                // onBlur={handleBlur}
                />
              </Box>

              {/* Numero exterior */}
              <Box sx={{ gridArae: "nExt" }}>
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
              </Box>

              {/* Tipo vialidad */}
              <Box sx={{ gridArae: "tVialidad" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Tipo Vialidad
                </MDTypography>
                <Select
                  fullWidth
                  name="tipo_vialidad"
                  value={formValues.tipo_vialidad}
                  onChange={handleInputChange}
                  error={formErrors.tipo_vialidad}
                  onBlur={handleBlur}
                >
                  {allListedRoadTypes.map((roadType) => (
                    <MenuItem key={roadType.id} value={roadType.id}>
                      {roadType.tipo}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Nombre localidad */}
              <Box sx={{ gridArae: "nomLoc" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Nombre Localidad
                </MDTypography>
                <TextField
                  name="nombre_localidad"
                  value={formValues.nombre_localidad}
                  onChange={handleInputChange}
                  error={formErrors.nombre_localidad}
                  onBlur={handleBlur}
                />
              </Box>

              {/* Colonia */}
              <Box sx={{ gridArae: "col" }}>
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
              </Box>

              {/* Estado */}
              <Box sx={{ gridArae: "edo" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Estado
                </MDTypography>
                <Select
                  fullWidth
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
              </Box>

              {/* Municipio */}
              <Box sx={{ gridArae: "mun" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Municipio
                </MDTypography>
                <Select
                  fullWidth
                  name="municipio"
                  value={formValues.municipio}
                  onChange={handleInputChange}
                  error={formErrors.municipio}
                  onBlur={handleBlur}
                >
                  {allListedCities?.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.nombre_ciud}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <Grid container mt={2}>
            <Grid container direction="column">
              <Grid item p={1}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={isUser} onChange={handleUser} />}
                    label="Usuario"
                  />
                </FormGroup>
              </Grid>

              {isUser && (
                <Grid container spacing={2} mt={1} direction="row">
                  {/* Correo */}
                  <Grid item xs={2.8}>
                    <MDBox>
                      <FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                          Correo
                        </MDTypography>
                        <TextField
                          name="correo"
                          value={formValues.correo}
                          onChange={handleInputChange}
                          error={formErrors.correo}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>

                  {/* Contrasena */}
                  <Grid item>
                    <MDBox>
                      <FormControl variant="standard">
                        <MDTypography variant="h6" fontWeight="medium">
                          Contraseña
                        </MDTypography>
                        <TextField
                          name="contrasena"
                          value={formValues.contrasena}
                          onChange={handleInputChange}
                          error={formErrors.contrasena}
                          onBlur={handleBlur}
                        />
                      </FormControl>
                    </MDBox>
                  </Grid>

                  {/* Confirmar Constrasena */}
                  <Grid item>
                    <FormControl variant="standard">
                      <MDTypography variant="h6" fontWeight="medium">
                        Confirmar contraseña
                      </MDTypography>
                      <TextField
                        name="conf_contrasena"
                        value={formValues.conf_contrasena}
                        onChange={handleInputChange}
                        error={formErrors.conf_contrasena}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      <MDBox
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <MDButton color="info" onClick={handleSubmit}>
          Guardar
        </MDButton>
        <MDButton sx={{ marginLeft: 3 }} onClick={handleShowEdit} color="info">
          Cancelar
        </MDButton>
      </MDBox>
    </Card>
  );
}

export default UpdatePersonal;
