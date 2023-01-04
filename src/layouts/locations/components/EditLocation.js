import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Card,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import React, { useEffect, useRef, useState } from "react";
import ScheduleTable from "./ScheduleTable";

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

const disabledLabel = {
    color: "#dbdbdc",
};

const column = [
    { heading: "Dias", value: "dia" },
    { heading: "Hora Inicio", value: "hora_inicial" },
    { heading: "Hora Final", value: "hora_final" },
    { heading: "Acciones", value: "acciones" }
];


export default function EditLocation({ handleShowAdd, locationIdToUpdate }) {

    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/locations/read.php?id=${locationIdToUpdate}`)
            .then((resp) => {
                const { data } = resp;
                const {sucursal:s} = data;

                console.log('In edit location', locationIdToUpdate);
                console.log('DATA IN EDIT => ', s[0]);
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

        console.log(allListedStates);
    }, []);

    const history = [];
    const [historyState, setHistoryState] = useState([]);

    const [allListedStates, setAllListedStates] = useState([]);
    const [allListedCities, setAllListedCities] = useState([]);

    const [allListedLocalities, setAllListedLocalities] = useState([]);

    const scheduleCounter = useRef(0);

    const [editActive, setEditActive] = useState(false);

    const idToUpdate = useRef(0);
    const newStateSync = useRef([{}]);


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
                `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/read.php?byCityId=1&id=${formValues.municipio}`
            )
            .then((response) => {
                const { data } = response;
                const { colonia } = data;
                console.log('RESPUETACOLONIASI', colonia);
                setAllListedLocalities(colonia);
            })
            .catch((error) => console.log(error));
    }, [formValues.estado, formValues.municipio]);

    const [allListedRoadTypes, setAllListedRoadTypes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php')
            .then(resp => {
                const { data } = resp;
                const { tipo_vialidad } = data;
                setAllListedRoadTypes(tipo_vialidad);
                console.log(allListedRoadTypes);
            })
            .catch()

    }, []);

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
        console.log('VALORES DEL FORMS', formValues);
        setFormValues((v) => ({
            ...v,
            "num_interior": formValues.num_interior === '' ? null : formValues.num_interior,
            "num_exterior": Number(formValues.num_exterior),
            "codigo_postal": Number(formValues.codigo_postal)
        }));

        let cleanedUpHistory = historyState.flatMap((e) => e);
        cleanedUpHistory = {
            ...cleanedUpHistory.map(el => ({
                scheduleId: el.scheduleId,
                dia: el.dia,
                hora_inicial: el.hora_inicial,
                hora_final: el.hora_final
            }))
        };

        console.log('CLEANED UP HISTORY', cleanedUpHistory);

        const requestData = JSON.stringify({
            ...formValues,
            dias: cleanedUpHistory
        })

        console.log('REQUEST DATA WITHOUT JSON ->', requestData);

        console.log('REQUEST DATA', JSON.parse(requestData));
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

    const [currentDay, setCurrentDay] = useState(initialCheckboxValues);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setCurrentDay({ ...currentDay, [name]: checked });
    };

    const savedDays = useRef(initialCheckboxValues);
    const [daysHistory, setDaysHistory] = useState([{scheduleId: 0, dia: 'Lunes', hora_inicial: '12:00', hora_final: '13:25'}]);


    const handleUpdateDay = () => {
        console.log('Historial de estado -> ', historyState);
        console.log('Editar activo? ', editActive);
        console.log('IdToUpdate en UpdateDay ->', idToUpdate.current);

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
            acciones: "",
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
        currentSchedule.acciones = <ActionButtons id={currentSchedule.scheduleId} savedDays={savedDays.current} currentDay={currentDay} setCurrentDay={setCurrentDay} history={history} historyState={historyState} setHistoryState={setHistoryState} setEditActive={setEditActive} idToUpdate={idToUpdate} editActive={editActive} newStateSync={newStateSync} />;

        console.log('HISTORY STATE --->', historyState);

        const newState = historyState.map((e, i, arr) => {

            console.log('Index of element in history', i);
            console.log('Id to be updated', idToUpdate.current);
            console.log('Object in history', e);

            let currentIdFromObject;
            if (typeof e[0] !== 'undefined') {
                currentIdFromObject = e[0].scheduleId;
            } else {
                currentIdFromObject = e.scheduleId;
            }

            console.log('Object in history -> ScheduleID', e.scheduleId);
            console.log('CurrentIdFromObject', currentIdFromObject);
            console.log('ScheduleID equal to idToUpdate?', currentIdFromObject === idToUpdate.current);

            if (currentIdFromObject === idToUpdate.current) {
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

        [newStateSync.current] = newState;

        console.log('POR ESTO ES QUE TRUENA', [newState.flatMap(e => e)][0]);


        const allHistory = [...history.flatMap(e => e), ...historyState.flatMap(e => e), ...newState.flatMap(e => e)];
        console.log('TODO EL HISTORIAL HASTA EL MOMENTO', allHistory);

        const savedDaysArr = allHistory.map((e) => e.dia);
        console.log("SAVEDDAYS", savedDaysArr);
        if (savedDaysArr.findIndex((e) => e.includes("Domingo")) !== -1) daysHistory.sunday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Lunes")) !== -1) daysHistory.monday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Martes")) !== -1) daysHistory.tuesday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Miercoles")) !== -1) daysHistory.wednesday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Jueves")) !== -1) daysHistory.thursday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Viernes")) !== -1) daysHistory.friday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Sábado")) !== -1) daysHistory.saturday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Todos")) !== -1) daysHistory.all = true;

        savedDays.current = daysHistory;
        setCurrentDay(initialCheckboxValues);

        setHistoryState([newState.flatMap(e => e)][0]);


        console.log('Historial', history);
        console.log('Historial en estado', historyState);

        setEditActive(false);
    };

    const handleAddDay = () => {
        if (!Object.values(currentDay).includes(true)) {
            return;
        }

        if (currentDay.hora_final === "" || currentDay.hora_inicial === "") {
            return;
        }


        const currentSchedule = {
            scheduleId: scheduleCounter.current,
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

        // const allHistory = [...history.flatMap(e => e), ...historyState.flatMap(e => e), newStateSync.current];
        // console.log('TODO EL HISTORIAL HASTA EL MOMENTO', allHistory);

        // const savedDaysArr = allHistory.map((e) => e.dia);


        const savedDaysArr = history.map((e) => e.dia);

        if (savedDaysArr.findIndex((e) => e.includes("Domingo")) !== -1) daysHistory.sunday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Lunes")) !== -1) daysHistory.monday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Martes")) !== -1) daysHistory.tuesday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Miercoles")) !== -1) daysHistory.wednesday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Jueves")) !== -1) daysHistory.thursday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Viernes")) !== -1) daysHistory.friday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Sábado")) !== -1) daysHistory.saturday = true;
        if (savedDaysArr.findIndex((e) => e.includes("Todos")) !== -1) daysHistory.all = true;

        savedDays.current = daysHistory;
        setCurrentDay(initialCheckboxValues);

        // console.log(currentSchedule);

        scheduleCounter.current += 1;
        setHistoryState((prev) => [...prev, history]);
        currentSchedule.acciones = <ActionButtons id={currentSchedule.scheduleId} savedDays={savedDays.current} currentDay={currentDay} setCurrentDay={setCurrentDay} history={history} historyState={historyState} setHistoryState={setHistoryState} setEditActive={setEditActive} idToUpdate={idToUpdate} editActive={editActive} newStateSync={newStateSync} />;

        // console.log('Historial', history);
        // console.log('Historial en estado', historyState);

    };

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;

        setCurrentDay((v) => ({
            ...v,
            [name]: value,
        }));
    };



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
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
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
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
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
                                    type="number"
                                    InputProps={{ inputProps: { min: 0 } }}
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
                                            {city.nombre}
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
                        onClick={editActive ? handleUpdateDay : handleAddDay}
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

export function ActionButtons({ id, savedDays, currentDay, setCurrentDay, history, historyState, setEditActive, idToUpdate, editActive, newStateSync }) {
    const handleEdit = () => {
        setEditActive(true);
        console.log('Click en editar... ');
        console.log('Editar activado?', !editActive);
    };

    // eslint-disable-next-line no-shadow
    const handleClick = () => {
        handleEdit();

        // const variable = newStateSync.current;
        // console.log(Object.values(currentEditSchedule));

        // Aquí se va a usar el useref

        console.log('UseRef variable', newStateSync.current);

        console.log('ID ->', id);
        // eslint-disable-next-line no-param-reassign
        idToUpdate.current = id;
        console.log('NEW ID TO UPDATE', idToUpdate);

        let allHistory = [...historyState.flatMap(e => e), ...history.flatMap(e => e), newStateSync.current];
        allHistory = allHistory.flatMap(e => e).filter(e => {
            if (Object.keys(e).length !== 0 && e !== undefined) {
                return true;
            }
            return false;
        });
        console.log('ALL HISTORY', allHistory);



        // const [value] = allHistory.filter(e=>e.scheduleId === id);
        allHistory.forEach(e => console.log('E DENTRO DE HISTORY', e));

        // eslint-disable-next-line consistent-return, array-callback-return
        const dia = allHistory.map((e) => {
            console.log('E DE DIA', e);
            if (e.scheduleId === id) {
                console.log('E DE DIA ELEGIDO', e);
                // eslint-disable-next-line consistent-return
                return e.dia;
            }
        });
        // const {dia} = value;
        console.log('DIAA', dia);

        const activeDays = [];
        dia.forEach(e => {
            console.log(e);

            if (e?.includes('Domingo') && !activeDays.includes('sunday')) activeDays.push('sunday');
            if (e?.includes('Lunes') && !activeDays.includes('monday')) activeDays.push('monday');
            if (e?.includes('Martes') && !activeDays.includes('tuesday')) activeDays.push('tuesday');
            if (e?.includes('Miercoles') && !activeDays.includes('wednesday')) activeDays.push('wednesday');
            if (e?.includes('Jueves') && !activeDays.includes('thursday')) activeDays.push('thursday');
            if (e?.includes('Viernes') && !activeDays.includes('friday')) activeDays.push('friday');
            if (e?.includes('Sábado') && !activeDays.includes('saturday')) activeDays.push('saturday');
        });


        console.log('DIAS ACTIVOOOOS', activeDays);

        // eslint-disable-next-line no-useless-computed-key
        const activateCheckbox = (name) => {
            setCurrentDay({ ...currentDay, [name]: true });
            // eslint-disable-next-line no-param-reassign
            savedDays[name] = false;
        }

        activeDays.forEach((e) => activateCheckbox(e));
    };

    const handleDelete = () => {
        console.log(id);
        let allHistory = [...historyState.flatMap(e => e), ...history.flatMap(e => e), newStateSync.current];
        allHistory = allHistory.flatMap(e => e).filter(e => {
            if (Object.keys(e).length !== 0 && e !== undefined) {
                return true;
            }
            return false;
        });
        console.log('ID TO DELETE ->', id);
        console.log('ALLHISTORY IN DELETE ->', allHistory);

        const objWithIdIndex = allHistory.findIndex((obj) => obj.scheduleId === id);

        if (objWithIdIndex > -1) {
            allHistory.splice(objWithIdIndex, 1);
        }

        console.log('ALLHISTORY AFTER DELETE ->', allHistory);
    };

    return <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <FontAwesomeIcon icon={faPenToSquare} size='md' onClick={handleClick} style={actionButton} />
        <FontAwesomeIcon icon={faTrash} size='md' style={actionButton} onClick={handleDelete} />
    </div>
};