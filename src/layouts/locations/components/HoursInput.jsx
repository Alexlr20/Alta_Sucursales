import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import MDTypography from 'components/MDTypography'
import React from 'react'

export const HoursInput = ({hoursInput, setHoursInput, formErrors, setFormErrors}) => {
    const handleBlur = (e) => {
        const { name } = e.target;
        const newFormErrors = { ...formErrors };
        delete newFormErrors[name];

        setFormErrors(newFormErrors);
    };

    const handleHourChange = (e) => {
        const {name, value} = e.target;
        setHoursInput(prev => ({...prev, [name]: value}));
    }

    return (
        <>
            <Box sx={{ gridArea: "hInicial" }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>Hora inicial</MDTypography>

                <TextField
                    fullWidth
                    ampm={false}
                    name="hora_inicial"
                    type="time"
                    value={hoursInput.hora_inicial}
                    disabled={false}
                    onChange={handleHourChange}
                    // error={currentDay.hora_inicial}
                    onBlur={handleBlur}
                />
            </Box>
            <Box sx={{ gridArea: "hFinal" }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>Hora final</MDTypography>
                <TextField
                    fullWidth
                    name="hora_final"
                    type="time"
                    value={hoursInput.hora_final}
                    disabled={false}
                    // error={currentDay.hora_final}
                    onChange={handleHourChange}
                    onBlur={handleBlur}
                />
            </Box>
        </>
    )
}
