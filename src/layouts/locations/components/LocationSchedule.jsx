import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { SelectedDays } from './SelectedDays'
import { HoursInput } from './HoursInput'
import ScheduleTable from './ScheduleTable'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

const generalContainer = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, auto)",
    gridTemplateAreas: `"dActivos dActivos dActivos"
    "hInicial hFinal ."
    ". .  agregar"`,
    columnGap: "2rem",
};

const btnStyle = {
    gridArea: "agregar",
    color: "#FFF",
    height: "max-content",
    width: "max-content",
    justifySelf: "flex-end",
}

const initialHoursInputState = {
    hora_inicial: '',
    hora_final: ''
}

const actionButton = {
    alignSelf: "center",
    cursor: "pointer"
}

const handleClick = () => {};
const handleDelete = () => {};

const ActionButtons = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <FontAwesomeIcon icon={faPenToSquare} size='md' onClick={handleClick} style={actionButton} />
            <FontAwesomeIcon icon={faTrash} size='md' onClick={handleDelete} style={actionButton} />
        </div>
    )
}


export const LocationSchedule = ({ column, setScheduleHistory }) => {
    const [formErrors, setFormErrors] = useState("");

    const [selectedDays, setSelectedDays] = useState([]);
    const [hoursInput, setHoursInput] = useState(initialHoursInputState);
    const [daysHistory, setDaysHistory] = useState([]);

    useEffect(()=>{
        setScheduleHistory(daysHistory.map(el => {
            if (el.dia.includes('Todos')) {
                const layoutDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    
                return {
                    ...el,
                    dia: layoutDays.join(", ")
                }
            }
    
            if (el.dia.length > 1) {
                return {
                    ...el,
                    dia: el.dia.join(", "),
                }
            }
    
            return {...el, dia: el.dia[0]};
        }));
    }, [daysHistory]);

    const handleAddDay = () => {
        setDaysHistory(prev => [...prev, { dia: selectedDays, ...hoursInput }]);
        setSelectedDays([]);
        setHoursInput(initialHoursInputState)
    }

    const tableInfo = daysHistory.map((el) => {
        if (el.dia.includes('Todos')) {
            const layoutDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']

            return {
                ...el,
                dia: layoutDays.join(", "),
                acciones: <ActionButtons />
            }
        }

        if (el.dia.length > 1) {
            return {
                ...el,
                dia: el.dia.join(", "),
                acciones: <ActionButtons />
            }
        }

        return { ...el, acciones: <ActionButtons /> };
    })


    useEffect(() => {
        console.log('Handle add day -> ', daysHistory);
    }, [daysHistory]);


    return (
        <>
            <Grid item mt={4} mb={4} style={generalContainer}>
                <SelectedDays selectedDays={selectedDays} setSelectedDays={setSelectedDays} daysHistory={daysHistory} />

                <HoursInput hoursInput={hoursInput} setHoursInput={setHoursInput} formErrors={formErrors} setFormErrors={setFormErrors} />

                {/* // onClick={editActive ? handleUpdateDay : handleAddDay} */}
                <Button sx={btnStyle} disabled={false} variant="contained" onClick={handleAddDay}>Agregar</Button>

            </Grid>
            <Box style={{ marginBottom: "1rem" }}>
                <ScheduleTable data={tableInfo} column={column.flatMap((e) => e)} />
            </Box>
        </>

    )
}
