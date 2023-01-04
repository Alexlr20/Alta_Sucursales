import { Checkbox, FormLabel } from '@mui/material';
import { Box } from '@mui/system';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import React, { useEffect } from 'react'

const disabledLabel = {
    color: "#dbdbdc",
};

const fieldsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem"
}

export const SelectedDays = ({ selectedDays, setSelectedDays, daysHistory }) => {
    const layoutDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo', 'Todos']
    //Si hay algún 'Todos', entonces sustituir por todos los dias

    useEffect(() => {
        console.log('Ola ->', selectedDays);
    }, [selectedDays]);

    const handleChange = (ev) => {
        const { name, checked } = ev.target;

        setSelectedDays(prev => {
            if (checked) {
                setSelectedDays(prev => [...prev, name]);
            } else {
                return prev.filter(e => e !== name)
            }
        });
    }

    return (
        <>
            <Box sx={{ gridArea: "dActivos" }}>
                <MDTypography sx={{ marginBottom: 2 }} variant="h6" fontWeight="medium">Horario</MDTypography>
                <MDBox mt={2} fullWidth sx={fieldsContainer}>

                    {
                        layoutDays.map(e => {

                            //1.- Si ya se encuentra en el historial, desactivar ese dia
                            //2.- Si se encuentra 'Todos' en el historial, desactivar 'Todos' y todos los demás dias
                            //3.- Si se encuentra algún otro dia en el historial, desactivar 'Todos'
                            const isDisabled =
                                daysHistory.find(({ dia }) => dia.includes(e))||
                                (daysHistory.some(({ dia }) => dia.includes('Todos'))) ||
                                (e === 'Todos' && daysHistory.some(({ dia }) => dia !== 'Todos'));

                            return (
                                <Box key={e} className='flexColCtr'>
                                    <FormLabel style={isDisabled ? disabledLabel : {}}>
                                        {
                                            e === 'Todos'
                                                ? e
                                                : e === 'Miercoles'
                                                    ? e.slice(0, 2)
                                                    : e.charAt(0)
                                        }
                                    </FormLabel>
                                    <Checkbox
                                        name={e}
                                        checked={selectedDays.includes(e)}
                                        onChange={handleChange}
                                        disabled={isDisabled}
                                    />
                                </Box>
                            )
                        })
                    }
                </MDBox>
            </Box>

        </>

    )
}